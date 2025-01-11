import React from 'react';
import './RelatedProducts.css';
import all_product from '../Assets/all_product';
import product_availability from '../Assets/availibility';
import Item from '../Item/Item';

const RelatedProducts = (props) => {
    const { product } = props;
    const cat_product = all_product
        .map((item) => {
            const availability = product_availability.find((avail) => avail.id === item.id);
            return {
                ...item,
                isAvailable: availability ? availability.isAvailable : false,
            };
        })
        .filter((item) => item.isAvailable);
    const currentProduct = cat_product.find(item => item.id === product.id);
    if (!currentProduct) {
        return <div>Produkt nie znaleziony</div>;
    }

    const relatedProducts = all_product.filter(item => {
        return item.id !== currentProduct.id && 
               item.category === currentProduct.category && 
               item.name.toLowerCase().includes(currentProduct.name.toLowerCase().split(' ')[0]); // Porównanie na podstawie pierwszego słowa w nazwie
    }).slice(0, 4); 

    return (
        <div className='relatedproducts'>
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((item) => {
                        return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })
                ) : (
                    <p>Brak powiązanych produktów</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;
