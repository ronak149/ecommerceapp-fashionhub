import React, { useContext } from "react";
// import Ratings from './Ratings.js'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from "../Store";
import { toast } from "react-toastify";

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
        toast.success('Item added to the cart');
    }

    return (
        <div className="card p-0 cardWidth" key={product.slug}>
            <div className="card-image-container">
                <Link to={`products/${product.slug}`}>
                    <img src={`products/${product.src}`} alt={product.title} className="card-img-top card-image img-thumbnail rounded"/>
                </Link>
            </div>
            <div className="card-body">
                <div className="row g-2">
                    <div className="col-4 mb-2">
                        <p className="card-text">{product.gender}'s </p>
                    </div>
                    <div className="col-8 mb-2">
                        <p className="card-text"style={{float: "right", color: "red"}}>{product.onSale ? 'On Sale: ' + product.discount + '% OFF' : ''}</p>
                    </div>
                    <div className="col-8">
                        <h5 className="card-title"><Link to={`products/${product.slug}`}>{product.title}</Link></h5>
                    </div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">${product.price}.00</h5>
                    </div>
                    <div className="col-12 mb-3">
                        <p className="card-text">{product.color}</p>
                    </div>
                </div>
                {product.quantityInStock === 0 ? <button className="card-btn rounded fw-semibold" style={{color: '#311b92'}} disabled >Out of stock</button> : <button type="button" className="card-btn rounded fw-semibold"  onClick={() => addToCartHandler(product)} style={{width: "100%"}}>Add to Cart</button> }
            </div>
        </div>
    );
}

export default Product;
