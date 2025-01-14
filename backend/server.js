const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const cors = require('cors'); 
const app = express();
const usersFilePath = './users.json';
const nodemailer=require('nodemailer')
const path = require('path');
const bodyParser = require('body-parser');
const { Op } = require('sequelize');

app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:1111'], 
  methods: 'GET, POST, PUT, DELETE', 
  credentials: true 
}));

app.use(express.json()); 

const User = require('./models/User');
const Cart = require('./models/Cart');
const Sale = require('./models/Sale');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email }
    });
    console.log(user)
 

    if (!user) {
      console.log("tut")
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("tuta")
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const cart = await Cart.findOne({
      where: { user_id: user.id }
    });

    res.status(200).json({
      message: 'Login successful',
      user,
      cart 
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      is_authenticated: false,
      role: 'user',
    });


    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
        is_authenticated: newUser.is_authenticated,
      },
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);

//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       isAuthenticated: false,
//       cart: [], 
//       sale: [],
//       role:'user' 
//     };

//     users.push(newUser);

//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (err) {
//     console.error('Error during registration:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     if (email === "admin@gmail.com") {
//       const isPasswordValid = password === "123";  
//       if (!isPasswordValid) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
//       return res.status(200).json({ message: 'Login successful', user: { email, role: 'admin' } });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     user.isAuthenticated = true;
//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

// app.post('/logout', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     user.isAuthenticated = false;

//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(200).json({ message: 'Logout successful' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.post('/logout', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.is_authenticated = false;

    await user.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// app.get('/isAuthenticated', async (req, res) => {
//   const { email } = req.query;

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     res.status(200).json({ isAuthenticated: user.isAuthenticated });
//   } catch (err) {
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });


app.get('/isAuthenticated', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({ isAuthenticated: user.is_authenticated });
  } catch (err) {
    console.error('Error during isAuthenticated check:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// app.get('/cart', async (req, res) => {
//   const { email } = req.query;

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     if (!user.isAuthenticated) {
//       return res.status(403).json({ message: 'Access denied, please log in' });
//     }

//     res.status(200).json({ cart: user.cart });
//   } catch (err) {
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.get('/cart', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({
      where: { email },
      include: {
        model: Cart, 
        attributes: ['id', 'product_id', 'quantity', 'added_at'] 
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.is_authenticated) {
      return res.status(403).json({ message: 'Access denied, please log in' });
    }

    res.status(200).json({ cart: user.Carts });
  } catch (err) {
    console.error('Error during fetching cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// app.post('/get-cart', async (req, res) => {
//   const { email } = req.body; 

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const cart = user.cart || [];
//     res.status(200).json({ cart });
//   } catch (err) {
//     console.error('Error fetching cart:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.post('/get-cart', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItems = await Cart.findAll({
      where: { user_id: user.id },
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(200).json({ message: 'Cart is empty' });
    }

    const cartData = cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    res.status(200).json({ cart: cartData });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});



// app.post('/add-to-cart', async (req, res) => {
//   const { email, productId } = req.body; 

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!user.cart) {
//       user.cart = [];
//     }

//     const productInCart = user.cart.find(item => item.id === productId);

//     if (productInCart) {
//       productInCart.quantity += 1;
//     } else {
//       user.cart.push({ id: productId, quantity: 1 });
//     }

//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(200).json({ message: 'Product added to cart' });
//   } catch (err) {
//     console.error('Error adding product to cart:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.post('/add-to-cart', async (req, res) => {
  const { email, productId } = req.body;

  try {
    if (!email || !productId) {
      return res.status(400).json({ message: 'Email and productId are required' });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItem = await Cart.findOne({
      where: { user_id: user.id, product_id: productId }, 
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save(); 
    } else {
      await Cart.create({
        user_id: user.id,      
        product_id: productId, 
        quantity: 1,           
      });
    }

    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    console.error('Error adding product to cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


// app.post('/update-cart', async (req, res) => {
//   const { email, productId, quantity } = req.body;
//   try {
//       const data = await fs.readFile(usersFilePath, 'utf8');
//       const users = JSON.parse(data);
//       const user = users.find(user => user.email === email);

//       if (!user) {
//         console.log("bals")
//           return res.status(404).json({ message: 'User not found' });
          
//       }
//       if (!user.cart) {
//           user.cart = [];
//       }
//       console.log(productId)
//       const productInCart = user.cart.find(item => item.id === productId);

//       if (productInCart) {

//         console.log(productInCart)
//           productInCart.quantity = quantity;
//       } else {
//           user.cart.push({ id: productId, quantity: quantity });
//       }

//       await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
//       console.log("ok")
//       res.status(200).json({ message: 'Cart updated successfully' });
//   } catch (err) {
//       console.error('Error updating cart:', err);
//       res.status(500).json({ message: 'Error processing request' });
//   }
// });


app.post('/update-cart', async (req, res) => {
  const { email, productId, quantity } = req.body;

  try {
    const user = await User.findOne({
      where: { email }, 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItem = await Cart.findOne({
      where: { user_id: user.id, product_id: productId }, 
    });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save(); 
      console.log("edeted")
      res.status(200).json({ message: 'Cart updated successfully' });
    } else {
      await Cart.create({
        user_id: user.id,
        product_id: productId,
        quantity: quantity,
      });
      res.status(200).json({ message: 'Product added to cart' });
    }
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


// app.post('/remove-from-cart', async (req, res) => {
//   const { email, productId } = req.body; 

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!user.cart || !user.cart.some(item => item.id === productId)) {
//       return res.status(400).json({ message: 'Product not found in cart' });
//     }

//     user.cart = user.cart.filter(item => item.id !== productId);

//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(200).json({ message: 'Product removed from cart' });
//   } catch (err) {
//     console.error('Error removing product from cart:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.post('/remove-from-cart', async (req, res) => {
  const { email, productId } = req.body;
console.log(email)
console.log(productId)
  try {
    const user = await User.findOne({
      where: { email }, 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItem = await Cart.findOne({
      where: { user_id: user.id, product_id: productId }, 
    });
    console.log(cartItem)

    if (!cartItem) {
      return res.status(400).json({ message: 'Product not found in cart' });
    }

    await cartItem.destroy();

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (err) {
    console.error('Error removing product from cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// app.post('/clear-cart', async (req, res) => {
//   const { email } = req.body; 

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.cart = [];

//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(200).json({ message: 'Cart has been cleared' });
//   } catch (err) {
//     console.error('Error clearing cart:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.post('/clear-cart', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: { email }, 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Cart.destroy({
      where: { user_id: user.id }, 
    });

    res.status(200).json({ message: 'Cart has been cleared' });
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onlineshopyak@gmail.com', 
    pass: 'lrop lcqd wqer xaqm', 
  },
});

app.post('/send-confirmation', (req, res) => {
  const { contactInfo, address, paymentMethod, totalAmount } = req.body;

  const mailOptions = {
    from: 'onlineshopyak@gmail.com',
    to: contactInfo.email, 
    subject: 'Potwierdzenie zamówienia',
    text: `Dziękujemy za złożenie zamówienia! Oto szczegóły:

      Adres: ${address.city}, ${address.street} ${address.nr}
      Imię i Nazwisko: ${contactInfo.name} ${contactInfo.surname}
      E-mail: ${contactInfo.email}
      Metoda płatności: ${paymentMethod}
      Kwota całkowita: $${totalAmount}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Błąd wysyłania e-maila' });
    }
    res.status(200).json({ message: 'Potwierdzenie wysłane' });
  });
});


const plik = path.join(__dirname, '..', 'frontend', 'src', 'Components', 'Assets', 'availibility.js');

console.log('Plik do zapisu:', plik);

app.post('/save-products', (req, res) => {
  const products = req.body;  
  fs.writeFile(plik, `const product_availability = ${JSON.stringify(products, null, 2)};\nexport default product_availability;`, (err) => {
    if (err) {
      return res.status(500).send('Błąd zapisu do pliku');
    }
    res.status(200).send('Produkty zapisane pomyślnie');
  });
});

const salesDataPath = './sales_data.json'; 

app.get('/sales-report', async (req, res) => {
  const { startDate, endDate } = req.query; 
  
  try {
    const data = await fs.readFile(salesDataPath, 'utf-8');
    const sales = JSON.parse(data);

    const filteredSales = sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
    res.json(filteredSales);
  } catch (err) {
    console.error('Error reading sales data:', err);
    res.status(500).json({ message: 'Error fetching sales report' });
  }
});



app.post('/submit-order', async (req, res) => {
  const { address, contactInfo, paymentMethod, totalAmount, cartItems } = req.body;
  console.log('Received order:', req.body);

  try {
    try {
      await fs.access(salesDataPath);
    } catch (err) {
      console.error('Sales data file does not exist:', err);
      return res.status(500).json({ message: 'Sales data file does not exist' });
    }

    const currentSalesData = JSON.parse(await fs.readFile(salesDataPath, 'utf8'));

    cartItems.forEach((item) => {
      const existingProduct = currentSalesData.find((product) => product.name === item.name);
      if (existingProduct) {
        existingProduct.totalQuantity += item.quantity;
        existingProduct.totalRevenue += item.quantity * item.price;
      } else {
        currentSalesData.push({
          name: item.name,
          totalQuantity: item.quantity,
          totalRevenue: item.quantity * item.price,
          date: new Date().toISOString(),
        });
      }
    });

    await fs.writeFile(salesDataPath, JSON.stringify(currentSalesData, null, 2));
    res.status(200).json({ message: 'Zamówienie zapisane' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Błąd zapisu zamówienia' });
  }
});

// app.delete('/delete-user', async (req, res) => {
//   const { email } = req.body; 

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);

//     const userIndex = users.findIndex(user => user.email === email);

//     if (userIndex === -1) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     users.splice(userIndex, 1);

//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error('Error during user deletion:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.delete('/delete-user', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error during user deletion:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


// app.post('/users/:email/orders/:orderId/discount', (req, res) => {
//   const { email, orderId } = req.params;
//   const { discount } = req.body; 
  
//   const result = addDiscountToOrder(email, parseInt(orderId), discount);
  
//   if (result.error) {
//     return res.status(400).json(result);
//   }
  
//   return res.json(result);
// });

// function addSaleToUser(email, saleValue) {
//   const user = users.filter(user => user.role !== 'admin').find(user => user.email === email); 

//   if (user) {
//     user.sale = saleValue; 
//     return { message: 'Rabat dodany', user };
//   } else {
//     return { error: 'Nie znaleziono użytkownika' };
//   }
// }

// app.post('/users/:email/orders/:orderId/discount', async (req, res) => {
//   const { email, orderId } = req.params;
//   const { discount } = req.body;

//   try {
//     // Znajdź użytkownika na podstawie adresu e-mail
//     const user = await User.findOne({
//       where: {
//         email,
//         role: { [Op.ne]: 'admin' }, // Upewnij się, że użytkownik nie jest adminem
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
//     }

//     // Znajdź zamówienie użytkownika
//     const order = await Order.findOne({
//       where: {
//         id: orderId,
//         user_id: user.id, // Powiązanie z użytkownikiem
//       },
//     });

//     if (!order) {
//       return res.status(404).json({ error: 'Nie znaleziono zamówienia' });
//     }

//     // Aktualizuj rabat dla zamówienia
//     order.discount = discount; // Ustaw nowy rabat
//     await order.save(); // Zapisz zmiany w bazie danych

//     res.status(200).json({ message: 'Rabat dodany do zamówienia', order });
//   } catch (err) {
//     console.error('Błąd podczas dodawania rabatu:', err);
//     res.status(500).json({ error: 'Wystąpił błąd podczas przetwarzania żądania' });
//   }
// });

// app.post('/api/users/:email/sale', (req, res) => {
//   const { email } = req.params;
//   const { sale } = req.body; 
  
//   const result = addSaleToUser(email, sale);
  
//   if (result.error) {
//     return res.status(400).json(result);
//   }
  
//   return res.json(result);
// });

const crypto = require('crypto'); 

const generateSaleCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); 
};

// app.post('/add-sale-code', async (req, res) => {
//   const { email } = req.body; 
//   console.log(email)

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);

//     const user = users.filter(user => user.role !== 'admin').find(user => user.email === email);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (!user.sale) {
//       user.sale = [];
//     }

//     const saleCode = generateSaleCode();

//     if (user.sale.includes(saleCode)) {
//       return res.status(400).json({ message: 'Sale code already exists for this user' });
//     }

//     user.sale.push(saleCode);

//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(200).json({ message: 'Sale code added successfully', saleCode });
//   } catch (err) {
//     console.error('Error during sale code addition:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.post('/add-sale-code', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: { email, role: { [Op.ne]: 'admin' } },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const saleCode = generateSaleCode();

    const existingSale = await Sale.findOne({
      where: { user_id: user.id, sale_code: saleCode },
    });

    if (existingSale) {
      return res.status(400).json({ message: 'Sale code already exists for this user' });
    }

    const newSale = await Sale.create({
      user_id: user.id,
      sale_code: saleCode,
    });

    res.status(200).json({ message: 'Sale code added successfully', saleCode: newSale.sale_code });
  } catch (err) {
    console.error('Error during sale code addition:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// app.delete('/remove-sale-code', async (req, res) => {
//   const { email, saleCode } = req.body; 
// console.log("ja")
//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);

//     const user = users.filter(user => user.role==="user").find(user => user.email === email);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const codeIndex = user.sale.indexOf(saleCode);

//     if (codeIndex === -1) {
//       return res.status(404).json({ message: 'Sale code not found for this user' });
//     }

//     user.sale.splice(codeIndex, 1);

//     await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(200).json({ message: 'Sale code removed successfully', saleCode });
//   } catch (err) {
//     console.error('Error during sale code removal:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });

app.delete('/remove-sale-code', async (req, res) => {
  const { email, saleCode } = req.body;
  
  try {
    const user = await User.findOne({
      where: { email, role: 'user' } 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const sale = await Sale.findOne({
      where: { user_id: user.id, sale_code: saleCode }
    });

    if (!sale) {
      return res.status(404).json({ message: 'Sale code not found for this user' });
    }

    await sale.destroy();

    res.status(200).json({ message: 'Sale code removed successfully', saleCode });
  } catch (err) {
    console.error('Error during sale code removal:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


// app.get('/get-sale-codes', async (req, res) => {
//   const { email } = req.query;  
//   console.log(email)

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data);

//     const user = users.find(user => user.email === email);

//     if (!user) {
//       console.log("not")
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ saleCodes: user.sale });
//   } catch (err) {
//     console.error('Error during fetching sale codes:', err);
//     res.status(500).json({ message: 'Error processing request' });
//   }
// });


app.get('/get-sale-codes', async (req, res) => {
  const { email } = req.query;  
  console.log(email);

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({
      where: { email, role: { [Op.ne]: 'admin' } }, 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const sales = await Sale.findAll({
      where: { user_id: user.id },
    });

    if (sales.length > 0) {
      const saleCodes = sales.map(sale => sale.sale_code);
      res.status(200).json({ saleCodes });
    } else {
      res.status(200).json({ message: 'No sale codes found for this user' });
    }
  } catch (err) {
    console.error('Error during fetching sale codes:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


// app.get('/get-users', async (req, res) => {
//   try {
//     const data = await fs.readFile(usersFilePath, 'utf8');
//     const users = JSON.parse(data).filter(user => user.role !== 'admin');  

//     res.status(200).json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ message: 'Error fetching users' });  
//   }
// });

app.get('/get-users', async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Op.ne]: 'admin', 
        },
      },
      attributes: ['id', 'first_name', 'last_name', 'email', 'role'],
    });

    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});



const port = 5055;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
