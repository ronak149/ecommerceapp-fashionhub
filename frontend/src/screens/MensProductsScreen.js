import { useEffect, useReducer } from 'react';
import Product from '../components/Product.js';
import axios from 'axios';

const mensProductsReducer = (state, action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
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
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.filter((product) => product.gender.toLowerCase() === 'men')});
      }
      catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }
    fetchData();
  }, []);

    return(
        <section id="product-container" className="d-flex flex-row justify-content-around flex-wrap align-content-around">
            {  loading ? (<div>Loading...</div>) : error ? (<div>{error}</div>) :
              (mensProducts.map((product) => (
                <Product 
                  product={product}
                  key={product.slug}
                />
              )))
            }
        </section>
    );
}

export default MensProductsScreen;