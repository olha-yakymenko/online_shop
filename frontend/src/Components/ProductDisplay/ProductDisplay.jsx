import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { UserContext } from '../../Context/UserContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const { user } = useContext(UserContext);

    const [userRating, setUserRating] = useState(0);
    const [likes, setLikes] = useState(product?.likes || []);

    const averageRating = useMemo(() => {
        if (likes.length > 0) {
            const avgRating = (likes.reduce((acc, curr) => acc + curr, 0) / likes.length).toFixed(1);
            return avgRating;
        }
        return 0;
    }, [likes]);

    const handleRatingChange = (rating) => {
        if (!user) {
            alert('You must be logged in to rate products');
            return;
        }

        setUserRating(rating);
        setLikes((prevLikes) => [...prevLikes.slice(0, -1), rating]);
    };

    const handleAddToCart = useCallback(async () => {
        if (!user) {
            alert('You must be logged in to add products to the cart');
            return;
        }

        try {
            const response = await fetch('http://localhost:5055/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, productId: product.id }),
            });

            const result = await response.json();

            if (response.ok) {
                addToCart(product);
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Error adding product to cart');
        }
    }, [user, product, addToCart]);

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {Array(4).fill(null).map((_, index) => (
                        <img key={index} src={product.image} alt={`img-${index}`} />
                    ))}
                </div>
            </div>
            <div className="productdisplay-image">
                <img className="productdisplay-main-img" src={product.image} alt="main product" />
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>

                <div className="productdisplay-right-star">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <img
                            key={star}
                            src={star <= averageRating ? star_icon : star_dull_icon}
                            alt="star"
                        />
                    ))}
                    <p>Average rating: {averageRating}</p>
                </div>

                <div className="productdisplay-rate">
                    <h3>Your Rating</h3>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <img
                            key={star}
                            src={star <= userRating ? star_icon : star_dull_icon}
                            alt="star"
                            onClick={() => handleRatingChange(star)}
                        />
                    ))}
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae doloribus sunt nihil earum ex veniam nostrum obcaecati, labore illum laudantium!
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div key={size}>{size}</div>
                        ))}
                    </div>
                </div>
                <button onClick={handleAddToCart}>ADD TO CART</button>
                <p className="productdisplay-right-category">
                    <span>Category:</span> {product.category}
                </p>
                <p className="productdisplay-right-category">
                    <span>Type:</span> {product.type}
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;
