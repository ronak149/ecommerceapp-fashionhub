import { useEffect, useReducer } from 'react';
import Product from '../components/Product';
import axios from 'axios';

const womensProductsReducer = (state, action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: false};
    case 'FETCH_SUCCESS':
      return {...state, womensProducts: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading:false, error: action.payload};
    default:
      return state;
  }
}

const WomensProductsScreen = () => {

  const [{womensProducts, loading, error}, dispatch] = useReducer(womensProductsReducer, {
    womensProducts: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.filter((product) => product.gender.toLowerCase() === 'women') });
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
            (womensProducts.map((product) => (
              <Product 
                product={product}
                key={ product.slug }
              />
            )))
          }
          </section>
    );
}

export default WomensProductsScreen;