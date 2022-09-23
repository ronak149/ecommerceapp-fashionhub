import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const mensProductsReducer = (state, action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: false};
    case 'FETCH_SUCCESS':
      return {...state, mensProducts: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading:false, error: action.payload};
    default:
      return state;
  }
}

const MensProductsScreen = () => {

  const [{mensProducts, loading, error}, dispatch] = useReducer(mensProductsReducer, {
    mensProducts: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.men });
      }
      catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }
    fetchData();
  }, []);

    return(
        <section id="product-container" className="d-flex flex-row justify-content-around flex-wrap align-content-around">
          {
            mensProducts.map((product) => (
              <div className="card cardWidth shadow " key={product.id}>
                <div className="card-image-container">
                  <Link to={`product/${product.slug}`}>
                    <img src={product.src} alt={product.title} className="card-img-top card-image"/>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">{product.gender}'s <span style={{float: "right", margin: "0 10px 0 0", color: "red"}}>{product.promotion.discount ? 'On Sale: ' + product.promotion.discount + '% OFF' : ''}</span></p>
                  <h5 className="card-title"><Link to={`product/${product.slug}`}>{product.title}</Link><span style={{float: "right", margin: "0 10px 0 0"}}>${product.price}.00</span></h5>
                  <p className="card-text">{product.color}</p>
                  <button type="button" className="btn btn-outline-secondary" style={{width: "100%"}}>Add to Cart</button>
                </div>
              </div>
            ))
          }
          </section>
    );
}

export default MensProductsScreen;