import React, { useState, useEffect, useContext, useMemo } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { UserContext } from '../../Context/UserContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import Order from '../Order/Order';
import './CartItems.css';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, setCartItems } = useContext(ShopContext);
    const { user } = useContext(UserContext);
    const email = user?.email;
    const [message, setMessage] = useState({ text: '', type: '' });
    const [userCart, setUserCart] = useState(cartItems);
    const [showOrder, setShowOrder] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [discountedTotal, setDiscountedTotal] = useState(false);
    const [availablePromoCodes, setAvailablePromoCodes] = useState([]);
    const [error, setError] = useState("");
    const [finalTotal, setFinalTotal] = useState(0); 
    const [usedPromoCode, setUsedPromoCode] = useState(false); 
    const [promoCodeError, setPromoCodeError] = useState("");
    
    useEffect(() => {
        const fetchPromoCodes = async () => {
            try {
                const response = await fetch(`http://localhost:5055/get-sale-codes?email=${encodeURIComponent(email)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    const saleCodes = Array.isArray(data.saleCodes) ? data.saleCodes : [];
                    setAvailablePromoCodes(saleCodes);
                } else {
                    setError("Failed to fetch promo codes");
                    
                }
            } catch (error) {
                console.error("Error fetching promo codes:", error);
            }
        };

        if (user?.email) {
            fetchPromoCodes();
        }
    }, [user?.email]);

    const handlePromoCodeSubmit = async () => {
        if (promoCode === "") {
            setMessage({text: "Please enter a promo code.", type: "message"});
            return;
        }

        if (availablePromoCodes.includes(promoCode)) {
            if (usedPromoCode) {
                setPromoCodeError("You can only use one promo code per order.");
                return;
            }

            if (!user || !user.email) {
                setMessage({text: "You must be logged in to apply a promo code.", type: "message"});
                return;
            }

            const email = user.email;

            try {
                const response = await fetch('http://localhost:5055/remove-sale-code', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, saleCode: promoCode })
                });

                const result = await response.json();

                if (response.ok) {
                    const discountedAmount = true
                    setDiscountedTotal(true)
                    setMessage({ text: 'Promo code applied! You get a 50% discount.', type: 'message' });
                    setAvailablePromoCodes(availablePromoCodes.filter(code => code !== promoCode));
                    setUsedPromoCode(true);  
                    setPromoCodeError(""); 
                } else {
                    setMessage({ text: result.message || "Error applying promo code", type: 'message' });
                }
            } catch (error) {
                console.error("Error applying promo code:", error);
            }
        } else {
            setPromoCodeError("Invalid promo code. The price will remain the same.");
        }
    };

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
                    const fetchedCart = result.cart?.reduce((acc, item) => {
                        acc[item.product_id] = item.quantity;
                        return acc;
                    }, {}) || [];
                    setUserCart(fetchedCart);
                    setCartItems(fetchedCart);
                } 
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchUserCart();
    }, [user, cartItems]);

    const handleRemoveFromCart = async (productId) => {
        if (!user) {
            setMessage({ text: 'You must be logged in to remove products from the cart', type: 'message' });
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
                setMessage({ text: result.message, type: 'message' });
            } else {
                setMessage({ text: result.message, type: 'error' });
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
            setMessage({ text: 'Error removing product from cart', type: 'message' });
        }
    };

    const handleProceedToCheckout = () => {
        setShowOrder((prevState) => !prevState);
    };

    const filteredCartItems = useMemo(() => {
        return all_product.filter((product) => cartItems[product.id] > 0);
    }, [all_product, cartItems]);

    const totalCartAmount = useMemo(() => getTotalCartAmount(), [cartItems, getTotalCartAmount]);

    useEffect(() => {
        const updatedTotal = discountedTotal  ? totalCartAmount*0.5 : totalCartAmount;
        setFinalTotal(updatedTotal);
    }, [discountedTotal, totalCartAmount]);

    const clearCart = async () => {
        if (!user) {
            setMessage({ text: 'You must be logged in to clear your cart', type: 'message' });
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
                setMessage({ text: result.message, type: 'message' }); 
            } else {
                setMessage({ text: result.message, type: 'error' }); 
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            setMessage({ text: 'Error clearing cart', type: 'error' });
        }
    };

//     const handleQuantityChange = (productId, newQuantity) => {
//         console.log("tutaj", newQuantity)
//         if (!productId || typeof newQuantity !== 'number' || newQuantity < 1) {
//             console.log("blad")
//             return;
//         }
        
//         if (newQuantity < 1) {

//             setMessage({ text: "Quantity must be at least 1.", type: 'message' });
//             return;
//         }
//         // const updatedCart={...userCart, [produktId]: newQuantity}
//         // setUserCary(updatedCart)
//         const updatedCartItems = { ...cartItems, [productId]: newQuantity };
    
//         // setCartItems(updatedCartItems);
//         // setCartItems(prevCartItems => ({ ...prevCartItems, [productId]: newQuantity }));
//         const previousCartItems = { ...cartItems }; // Zachowaj poprzedni stan koszyka

// setCartItems(prevCartItems => ({ ...prevCartItems, [productId]: newQuantity }));
// if (updateUserCart) {
//     updateUserCart(productId, newQuantity);
// }
//         console.log("u", updatedCartItems)
//         if (user) {
//             const email = user.email;
//             fetch('http://localhost:5055/update-cart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, productId, quantity: newQuantity }),
//             })
//             .then(response => response.json())
//             // .then(data => {
//             //     if (data.success) {
//             //         console.log("Cart updated successfully");
//             //     } else {
//             //         console.log("Error updating cart", data.message);
//             //     }
//             // })
//             .then(data => {
//                 console.log("Response data:", data); // Debugowanie odpowiedzi
//                 if (data.message === "Cart updated successfully") {
//                     console.log("Cart updated successfully");
//                 } else {
//                     console.error("Error updating cart:", data.message || "Unknown error");
//                     setMessage({ text: data.message || "Error syncing with server.", type: 'error' });
//                 }
//             })            
//             .catch(error => console.error("Error updating cart:", error));
//         }
//     };

const handleQuantityChange = (productId, newQuantity) => {
    if (typeof newQuantity !== 'number' || newQuantity < 1) {
        setMessage({ text: "Ilość musi być co najmniej 1.", type: 'error' });
        return;
    }

    // Natychmiastowa aktualizacja stanu lokalnego
    const updatedCartItems = { ...cartItems, [productId]: newQuantity };
    setCartItems(updatedCartItems);

    // Jeśli użytkownik jest zalogowany, wysyłamy zmiany na serwer
    if (user && user.email) {
        const email = user.email;
        fetch('http://localhost:5055/update-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, productId, quantity: newQuantity }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Cart updated successfully") {
                    setMessage({ text: "Koszyk zaktualizowano pomyślnie.", type: 'success' });
                } else {
                    // Przywrócenie poprzedniego stanu w razie błędu
                    setCartItems((prev) => ({ ...prev, [productId]: cartItems[productId] }));
                    setMessage({ text: data.message || "Błąd podczas aktualizacji koszyka.", type: 'error' });
                }
            })
            .catch(error => {
                console.error("Błąd podczas aktualizacji koszyka:", error);
                setCartItems((prev) => ({ ...prev, [productId]: cartItems[productId] }));
                setMessage({ text: "Nie udało się zaktualizować koszyka. Spróbuj ponownie.", type: 'error' });
            });
    }
};

    

    return (
        <div className="cartitems">
            
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
                            <img src={e.image} alt="" className="carticon-product-icon" />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
    
                            <input
                                type="number"
                                min="1"
                                value={cartItems[e.id] || 1} 
                                onChange={(event) => handleQuantityChange(e.id, parseInt(event.target.value))}
                            />

                            <p>${e.new_price * (cartItems[e.id] || 1)}</p>
                            <img
                                className="cartitems-remove-icon"
                                src={remove_icon}
                                onClick={() => handleRemoveFromCart(e.id)}
                                alt="Remove"
                            />
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
                            {console.log(finalTotal)}
                            <h3>${finalTotal}</h3>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                        {console.log("User cart", userCart)}
                        {showOrder && <Order totalAmount={finalTotal} clearCart={clearCart} cartItems={userCart} />}

                    </div>
                </div>
    
                <div className="cartitems-promocode">
                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input
                            type="text"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={usedPromoCode}
                        />
                        <button onClick={handlePromoCodeSubmit} disabled={usedPromoCode}>
                            Apply
                        </button>
                    </div>
                    <div className="cartitems-promo-list">
                        {promoCodeError && <p style={{ color: 'red' }}>{promoCodeError}</p>}
                        <p>Available Promo Codes:</p>
                        <ul>
                            {availablePromoCodes?.length > 0 ? (
                                availablePromoCodes.map((code, index) => (
                                    <li key={index}>{code}</li>
                                ))
                            ) : (
                                <p>No promo codes available</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
    };

export default CartItems;
