import React from "react";
// import Ratings from './Ratings.js'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {product} = props;
    return (
        <div className="card cardWidth shadow " key={product.id}>
            <div className="card-image-container">
                <Link to={`products/${product.slug}`}>
                    <img src={`products/${product.src}`} alt={product.title} className="card-img-top card-image"/>
                </Link>
            </div>
            <div className="card-body">
                <p className="card-text">{product.gender}'s <span style={{float: "right", margin: "0 10px 0 0", color: "red"}}>{product.promotion.discount ? 'On Sale: ' + product.promotion.discount + '% OFF' : ''}</span></p>
                <h5 className="card-title"><Link to={`products/${product.slug}`}>{product.title}</Link><span style={{float: "right", margin: "0 10px 0 0"}}>${product.price}.00</span></h5>
                <p className="card-text">{product.color}</p>
                {/* <Ratings ratings={product.ratings} numOfReviews={product.numOfReviews} /> */}
                <button type="button" className="btn btn-outline-secondary" style={{width: "100%"}}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Product;
