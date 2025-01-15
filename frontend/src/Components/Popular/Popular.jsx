import {React, useContext} from 'react';
import "./Popular.css"
import { ProductContext } from '../../Context/ProductContext';  
// import all_product from '../Assets/all_product'
import product_availability from '../Assets/availibility';
import Item from '../Item/Item'

const Popular = () => {
    const {all_product}=useContext(ProductContext)
    console.log(all_product)
    const cat_product = all_product
        .map((item) => {
            console.log(item)
            // const availability = product_availability.find((avail) => avail.id === item.id);
            return {
                ...item,
                isavailable: item ? item.isavailable : false,
                popular: item ? item.popular : false,

            };
        })
        .filter((item) => item.isavailable && item.popular);
        console.log(cat_product)
    return (
        <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {cat_product.map((item, i) =>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
        </div>
    );
};

export default Popular;
