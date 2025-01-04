import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { UserContext } from '../../Context/UserContext';


const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, setCartItems } = useContext(ShopContext);
    const { user } = useContext(UserContext);
    const [userCart, setUserCart] = useState(cartItems); 
    const [showOrder, setShowOrder] = useState(false);
    const [promoCode, setPromoCode] = useState(""); 
    const [discountedTotal, setDiscountedTotal] = useState(null); 

    useEffect(() => {
        const fetchUserCart = async () => {
            if (!user) return; 
    
            const email = user.email; 
    
            try {
                const response = await fetch('http://localhost:5055/get-cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }), 
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    const fetchedCart = result.cart.reduce((acc, item) => {
                        acc[item.id] = item.quantity;
                        return acc;
                    }, {});
                    setUserCart(fetchedCart);
                    setCartItems(fetchedCart);  
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
                alert('Error fetching cart');
            }
        };
    
        fetchUserCart();
    }, [user, setCartItems]); 

    const handleProceedToCheckout = () => {
        setShowOrder(true);
    };

    const handleRemoveFromCart = async (productId) => { 
        if (!user) {
            alert('You must be logged in to remove products from the cart');
            return;
        }

        const email = user.email; 

        try {
            const response = await fetch('http://localhost:5055/remove-from-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, productId }), 
            });

            const result = await response.json();

            if (response.ok) {
                removeFromCart(productId); 
                alert(result.message); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
            alert('Error removing product from cart');
        }
    };

    const filteredCartItems = useMemo(() => {
        return all_product.filter((product) => cartItems[product.id] > 0);
    }, [all_product, cartItems]);

    const totalCartAmount = useMemo(() => {
        return getTotalCartAmount();
    }, [cartItems, getTotalCartAmount]);

    const handlePromoCodeSubmit = () => {
        if (promoCode === "yak") {
            const discountedAmount = totalCartAmount * 0.5;
            setDiscountedTotal(discountedAmount);
            alert("Promo code applied! You get a 50% discount.");
        } else {
            alert("Invalid promo code");
        }
    };

    
    const clearCart = async () => {
      if (!user) {
          alert('You must be logged in to clear your cart');
          return;
      }
      
      const email = user.email; 
      try {
          const response = await fetch('http://localhost:5055/clear-cart', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }), 
          });

          const result = await response.json();

          if (response.ok) {
              setCartItems({});  
              alert(result.message); 
          } else {
              alert(result.message); 
          }
      } catch (error) {
          console.error('Error clearing cart:', error);
          alert('Error clearing cart');
      }
  };


    const finalTotal = discountedTotal !== null ? discountedTotal : totalCartAmount;

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {filteredCartItems.map((e) => {
                return (
                    <div key={e.id}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>${e.new_price * cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { handleRemoveFromCart(e.id); }} alt="" />
                        </div>
                        <hr />
                    </div>
                );
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${totalCartAmount}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${finalTotal}</h3> 
                        </div>
                    </div>
                    <div>
                        <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                        {/* {showOrder && <Order totalAmount={finalTotal} clearCart={clearCart} />
                      }  */}
                    </div>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promocode, enter it here</p>
                    <div className="cartitems-promobox">
                        <input
                            type="text"
                            placeholder='promo code'
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)} 
                        />
                        <button onClick={handlePromoCodeSubmit}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;


