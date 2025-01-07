import React, { useState, useEffect, useContext, useMemo } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { UserContext } from '../../Context/UserContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import Order from '../Order/Order';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, setCartItems } = useContext(ShopContext);
    const { user } = useContext(UserContext);
    const email = user?.email;
    const [userCart, setUserCart] = useState(cartItems);
    const [showOrder, setShowOrder] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [discountedTotal, setDiscountedTotal] = useState(null);
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
                    setAvailablePromoCodes(data.saleCodes);
                    if (data.saleCodes.length > 0) {
                        const totalAmount = getTotalCartAmount();
                        const discountedAmount = totalAmount * 0.5;
                        setDiscountedTotal(discountedAmount);
                    }
                } else {
                    setError("Failed to fetch promo codes");
                    alert("Failed to fetch promo codes");
                }
            } catch (error) {
                console.error("Error fetching promo codes:", error);
                alert("Error fetching promo codes");
            }
        };

        if (user?.email) {
            fetchPromoCodes();
        }
    }, [user?.email]);

    const handlePromoCodeSubmit = async () => {
        if (promoCode === "") {
            alert("Please enter a promo code.");
            return;
        }

        if (availablePromoCodes.includes(promoCode)) {
            if (usedPromoCode) {
                setPromoCodeError("You can only use one promo code per order.");
                return;
            }

            if (!user || !user.email) {
                alert("You must be logged in to apply a promo code.");
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
                    const discountedAmount = getTotalCartAmount() * 0.5;
                    setDiscountedTotal(discountedAmount);
                    alert("Promo code applied! You get a 50% discount.");
                    setAvailablePromoCodes(availablePromoCodes.filter(code => code !== promoCode));
                    setUsedPromoCode(true);  
                    setPromoCodeError(""); 
                } else {
                    alert(result.message || "Error applying promo code.");
                }
            } catch (error) {
                console.error("Error applying promo code:", error);
                alert("Error applying promo code");
            }
        } else {
            setPromoCodeError("Invalid promo code. The price will remain the same.");
            setDiscountedTotal(null); 
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

    const handleProceedToCheckout = () => {
        setShowOrder(true);
    };

    const filteredCartItems = useMemo(() => {
        return all_product.filter((product) => cartItems[product.id] > 0);
    }, [all_product, cartItems]);

    const totalCartAmount = useMemo(() => {
        return getTotalCartAmount();
    }, [cartItems, getTotalCartAmount]);

    useEffect(() => {
        const updatedTotal = discountedTotal !== null ? discountedTotal : totalCartAmount;
        setFinalTotal(updatedTotal);
    }, [discountedTotal, totalCartAmount]);

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
                            <button className="cartitems-quantity">{cartItems[e.id]}</button>
                            <p>${e.new_price * cartItems[e.id]}</p>
                            <img className="cartitems-remove-icon" src={remove_icon} onClick={() => handleRemoveFromCart(e.id)} alt="" />
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
                            {console.log("Final Total:", finalTotal)}
                        </div>
                    </div>
                    <div>
                        <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                        {showOrder && <Order totalAmount={finalTotal} />}
                    </div>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input
                            type="text"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={usedPromoCode} 
                        />
                        <button onClick={handlePromoCodeSubmit} disabled={usedPromoCode}>Apply</button>
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

