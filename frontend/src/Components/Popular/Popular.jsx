import React from 'react';
import "./Popular.css"
import all_product from '../Assets/all_product'
import product_availability from '../Assets/availibility';
import Item from '../Item/Item'
const Popular = () => {
    const cat_product = all_product
        .map((item) => {
            const availability = product_availability.find((avail) => avail.id === item.id);
            return {
                ...item,
                isAvailable: availability ? availability.isAvailable : false,
            };
        })
        .filter((item) => item.isAvailable);

    return (
        <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {cat_product.map((item, i) =>{
                if (item.id%5===0){
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                }
            })}
        </div>
        </div>
    );
};

export default Popular;
