const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const cors = require('cors'); 
const app = express();
const usersFilePath = './users.json';
const nodemailer=require('nodemailer')
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3002', 
  methods: 'GET, POST, PUT, DELETE', 
  credentials: true 
}));

app.use(express.json()); 

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAuthenticated: false,
      cart: [],  
    };

    users.push(newUser);

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (email === "admin@gmail.com") {
      const isPasswordValid = password === "123";  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({ message: 'Login successful', user: { email, role: 'admin' } });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.isAuthenticated = true;
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.post('/logout', async (req, res) => {
  const { email } = req.body;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.isAuthenticated = false;

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.get('/isAuthenticated', async (req, res) => {
  const { email } = req.query;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({ isAuthenticated: user.isAuthenticated });
  } catch (err) {
    res.status(500).json({ message: 'Error processing request' });
  }
});


app.get('/cart', async (req, res) => {
  const { email } = req.query;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.isAuthenticated) {
      return res.status(403).json({ message: 'Access denied, please log in' });
    }

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.post('/get-cart', async (req, res) => {
  const { email } = req.body; 

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cart = user.cart || [];
    res.status(200).json({ cart });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


app.post('/add-to-cart', async (req, res) => {
  const { email, productId } = req.body; 

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.cart) {
      user.cart = [];
    }

    const productInCart = user.cart.find(item => item.id === productId);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      user.cart.push({ id: productId, quantity: 1 });
    }

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    console.error('Error adding product to cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


app.post('/remove-from-cart', async (req, res) => {
  const { email, productId } = req.body; 

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.cart || !user.cart.some(item => item.id === productId)) {
      return res.status(400).json({ message: 'Product not found in cart' });
    }

    const productInCart = user.cart.find(item => item.id === productId);

    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
    } else {
      user.cart = user.cart.filter(item => item.id !== productId);
    }

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'Product quantity updated or removed from cart' });
  } catch (err) {
    console.error('Error removing product from cart:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});


app.post('/clear-cart', async (req, res) => {
  const { email } = req.body; 

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = [];

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

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
    text: `
      Dziękujemy za złożenie zamówienia! Oto szczegóły:

      Adres: ${address.city}, ${address.street} ${address.nr}
      Imię i Nazwisko: ${contactInfo.name} ${contactInfo.surname}
      E-mail: ${contactInfo.email}
      Metoda płatności: ${paymentMethod}
      Kwota całkowita: $${totalAmount}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Błąd wysyłania e-maila');
    }
    res.status(200).send('Potwierdzenie wysłane');
  });
});

const plik = path.join(__dirname, '..', 'frontend', 'src', 'Components', 'Assets', 'all_product.js');

console.log('Plik do zapisu:', plik);

app.post('/save-products', (req, res) => {
  const products = req.body;  
  fs.writeFile(plik, `const all_product = ${JSON.stringify(products, null, 2)};\nexport default all_product;`, (err) => {
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

const port = 5055;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
