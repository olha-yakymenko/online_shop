

import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { UserContext } from '../../Context/UserContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const { user } = useContext(UserContext);
  
  const [userRating, setUserRating] = useState(0);  
  const [likes, setLikes] = useState(product.likes);  
  const [averageRating, setAverageRating] = useState(0);  
  useEffect(() => {
    let allRatings = [...likes];
    
    if (userRating > 0) {
      allRatings.push(userRating);  
    }

    if (allRatings.length > 0) {
      const avgRating = (allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length).toFixed(1);
      setAverageRating(avgRating);  
      setAverageRating(0);
    }
  }, [likes, userRating]);  

  const handleRatingChange = (rating) => {
    if (!user) {
      alert('You must be logged in to rate products');
      return;
    }

    setUserRating(rating);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('You must be logged in to add products to the cart');
      return;
    }

    const email = user.email;
    const productId = product.id;

    try {
      const response = await fetch('http://localhost:5005/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, productId }),
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
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-image">
        <img className='productdisplay-main-img' src={product.image} alt="" />
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        
        <div className="productdisplay-right-star">
          {[1, 2, 3, 4, 5].map(star => (
            <img 
              key={star} 
              src={star <= averageRating ? star_icon : star_dull_icon} 
              alt="star" 
            />
          ))}
          <p>Average rating: {averageRating} ({likes.length} reviews)</p>
        </div>

        <div className="productdisplay-rate">
          <h3>Your Rating</h3>
          {[1, 2, 3, 4, 5].map(star => (
            <img 
              key={star} 
              src={star <= userRating ? star_icon : star_dull_icon} 
              alt="star" 
              onClick={() => handleRatingChange(star)} 
            />
          ))}
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae doloribus sunt nihil earum ex veniam nostrum obcaecati, labore illum laudantium!
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => { addToCart(product.id); handleAddToCart(); }}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category:</span>Women, T-Shirt, Crop-Top</p>
        <p className='productdisplay-right-category'><span>Tags:</span>Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
