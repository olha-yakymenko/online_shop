
// import React, {useContext} from 'react';
// import {ShopContext} from '../Context/ShopContext';
// import { useParams } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import Breadcrum from '../Components/Breacrums/Breadcrum';
// import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
// import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
// import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

// const queryClient = new QueryClient();

// const Product = () => {
//     const { all_product } = useContext(ShopContext);
//     const { productId } = useParams();
//     const product = all_product.find((e) => e.id === Number(productId));

//     return (
//         <QueryClientProvider client={queryClient}>
//             <div>
//                 <Breadcrum product={product}/>
//                 <ProductDisplay product={product}/>
//                 <DescriptionBox product={product}/>
//                 <RelatedProducts product={product}/>
//             </div>
//         </QueryClientProvider>
//     );
// };

// export default Product;




import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Breadcrum from '../Components/Breacrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const queryClient = new QueryClient();

const Product = () => {
    const shopContext = useContext(ShopContext);

    if (!shopContext) {
        throw new Error('ShopContext must be used within a ShopProvider');
    }

    const { all_product } = shopContext;
    const { productId } = useParams();

    const product = all_product?.find((e) => e.id === Number(productId));

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Breadcrum product={product} />
                <ProductDisplay product={product} />
                <DescriptionBox product={product} />
                <RelatedProducts product={product} />
            </div>
        </QueryClientProvider>
    );
};

export default Product;
