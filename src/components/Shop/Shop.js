import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const firstTen = fakeData.slice(0,10);
    const [products,setProducts]= useState(firstTen);
    const [cart,setCart]=useState([]);
    const handleAddProduct = (product)=>{
        console.log('clicked',product);
        const newCart = [...cart,product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="products-container">
                {
                    products.map(product=><Product product={product} handleAddProduct={handleAddProduct}></Product>)
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
           
           
        </div>
    );
};

export default Shop;