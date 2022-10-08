import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';

const productInfoReducer = (state, action) => {
    switch(action.type) {
      case 'FETCH_REQUEST':
        return {...state, loading: false};
      case 'FETCH_SUCCESS':
        return {...state, product: action.payload, loading: false};
      case 'FETCH_FAIL':
        return {...state, loading:false, error: action.payload};
      default:
        return state;
    }
}

const ProductInfoScreen = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {slug} = params;

    const [{product, loading, error}, dispatch] = useReducer(productInfoReducer, {
        product: [],
        loading: true,
        error: '',
    });
    
      useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data});
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        } 
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;

    const addToCartHandler =  async () => {
        const existItem = cart.cartItems.find((item) => item._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1 ;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if(data.quantityInStock < quantity) {
            window.alert('Sorry, Product out of stock');
            return;
        }
        ctxDispatch({type: 'ADD_TO_CART', payload: {...product, quantity }});
        navigate('/Cart');
    }

    return (
        loading ? <div>Loading...</div> 
        : error ? (<div>{error}</div>) 
        :
        <div style={{margin: 0, padding: '1rem'}}>
        <div className="card" >
            <div className="row m-3 g-2">
                <div className="col-md-4" style={{textAlign: 'center', overflow: 'hidden', margin: 'auto'}}>
                    <img className="img-thumbnail img-fluid" src={product.src} alt={product.title} style={{height: '75vh', width: '65vh'}} />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-between card-body" style={{padding: '2rem'}}>
                    <div className="row mb-2">
                            <h4 className="">{product.title}</h4>
                    </div>
                    <div className="row mb-2">
                        <div className="col-6">
                            <h5 className="">$ {product.price}.00</h5>
                        </div>

                    </div>
                    <div className="row mb-2">
                            <h5 className="">{product.color} | Large</h5>
                    </div>
                    <div className="row mb-2">
                            <h3 className=""><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i> <span style={{fontSize: '1rem', paddingLeft: '1rem'}}>{product.numOfReviews} reviews</span></h3>
                    </div>
                    <div className="row mb-2">
                            <h6 className="">{product.description}</h6>
                    </div>
                    <div className="row mb-2">
                        <div className="col-8">
                            {product.quantityInStock === 0 ? <i className="bi-slash-circle danger" style={{color: 'red'}} ><span style={{fontWeight: '400', color: 'grey', fontSize: '1rem'}}>  {' '} Item out of stock</span></i> : <i className="bi bi bi-check2-circle" style={{color: '#00c900'}}><span style={{fontWeight: '400', color: 'grey', fontSize: '1rem'}}>  {' '} In Stock</span></i>}
                            
                        </div>
                        <div className="col-4">
                            <h5>${product.price}.00</h5>
                        </div>
                    </div>
                    <div className="row mb-2" style={{textAlign: 'center'}}>
                        <div className="col">
                        <button className="btn-outline rounded shadow" type="button" style={{width: '80%'}} onClick={addToCartHandler}> Add to Cart <i className="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ProductInfoScreen;