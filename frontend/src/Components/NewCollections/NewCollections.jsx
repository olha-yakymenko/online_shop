import React from 'react';
import './NewCollections.css'
import all_product from '../Assets/all_product';
import product_availability from '../Assets/availibility';
import Item from '../Item/Item'
const NewCollections = () => {
    const cat_product = all_product
        .map((item) => {
            const availability = product_availability.find((avail) => avail.id === item.id);
            return {
                ...item,
                isAvailable: availability ? availability.isAvailable : false,
                new: availability ? availability.new : false,

            };
        })
        .filter((item) => item.isAvailable && item.new);
    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {cat_product.map((item, i) =>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    );
};

export default NewCollections;
