import React, { useContext } from "react";
// import Ratings from './Ratings.js'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from "../Store";

const Product = (props) => {
    const {product} = props;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const cartItems = state.cart.cartItems;

    const addToCartHandler = async (product) => {
        const existItem = cartItems.find((item) => item._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1 ;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if(data.quantityInStock < quantity) {
            window.alert('Sorry, Product out of stock');
            return;
        }
        ctxDispatch({type: 'ADD_TO_CART', payload: {...product, quantity }});
    }

    return (
        <div className="card cardWidth shadow " key={product.slug}>
            <div className="card-image-container">
                <Link to={`products/${product.slug}`}>
                    <img src={`products/${product.src}`} alt={product.title} className="card-img-top card-image"/>
                </Link>
            </div>
            <div className="card-body">
                <p className="card-text">{product.gender}'s <span style={{float: "right", margin: "0 10px 0 0", color: "red"}}>{product.onSale ? 'On Sale: ' + product.discount + '% OFF' : ''}</span></p>
                <h5 className="card-title"><Link to={`products/${product.slug}`}>{product.title}</Link><span style={{float: "right", margin: "0 10px 0 0"}}>${product.price}.00</span></h5>
                <p className="card-text">{product.color}</p>
                {/* <Ratings ratings={product.ratings} numOfReviews={product.numOfReviews} /> */}
                {product.quantityInStock === 0 ? <button className="btn btn-outline-primary" disabled >Out of stock</button> : <button type="button" className="btn btn-outline-primary" onClick={() => addToCartHandler(product)} style={{width: "100%"}}>Add to Cart</button> }
            </div>
        </div>
    );
}

export default Product;
