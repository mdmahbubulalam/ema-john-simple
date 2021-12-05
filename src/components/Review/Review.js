import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    const removeProduct = productKey => {
        const newCart = cart.filter (pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    let thankYou;

    if(orderPlace){
        thankYou = <img src={happyImage} alt="" />
    }


    useEffect(() => {
        // cart data from database
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map((key) => {
            const product = fakeData.find((pd) => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct} />)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="cart-button" onClick = {handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;