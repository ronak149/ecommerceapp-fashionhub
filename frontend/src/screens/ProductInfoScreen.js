import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

    return (
        loading ? <div>Loading...</div> 
        : error ? (<div>{error}</div>) 
        :
        <div style={{margin: 0, padding: '1rem'}}>
        <div class="card" >
            <div class="row  row-cols-4">
                <div class="col-4" style={{textAlign: 'center', overflow: 'hidden', margin: 'auto'}}>
                    <img class="" src={product.src} alt="Card image" style={{height: '75vh', width: '65vh'}} />
                </div>
                <div class="col-8 d-flex flex-column justify-content-between card-body" style={{padding: '2rem'}}>
                    <div class="row">
                            <h4 class="">{product.title}</h4>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <h5 class="">$ {product.price}.00</h5>
                        </div>
                        <div class="col-4">
                            <h5 style={{color: 'red'}}>{(product.promotion.onSale === true ) ? 'Extra ' + product.promotion.discount + '% OFF': ''}</h5>
                        </div>
                    </div>
                    <div class="row">
                            <h5 class="">{product.color} | Large</h5>
                    </div>
                    <div class="row">
                            <h3 class=""><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i> <span style={{fontSize: '1rem', paddingLeft: '1rem'}}>{product.numOfReviews} reviews</span></h3>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <label for="quantity">Qty: </label>
                                                <select className="form-select form-select-sm" name="quantity" id="quantity">
                                                    <option value="volvo">1</option>
                                                    <option value="saab">2</option>
                                                    <option value="opel">3</option>
                                                    <option value="audi">4</option>
                                                </select>
                        </div>
                    </div>
                    <div class="row">
                            <h6 class="">{product.description}</h6>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <i class="bi bi bi-check2-circle" style={{color: '#00c900'}}><span style={{fontWeight: '400', color: 'grey', fontSize: '1rem'}}>In Stock</span></i>
                        </div>
                        <div class="col-4">
                            <h5>${product.price}.00</h5>
                        </div>
                    </div>
                    <div class="row" style={{textAlign: 'center'}}>
                        <div className="col">
                        <button className="btn btn-outline-secondary shadow" type="button" style={{width: '80%'}}>Add to Cart <i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ProductInfoScreen;