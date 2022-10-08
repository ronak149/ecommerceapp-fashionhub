import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import ShippingSteps from '../components/ShippingSteps';

const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return  {...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return {...state, loading:false, error: action.payload };
        default:
            return state;
    }
}

const OrderHistoryScreen = () => { 
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const [{loading, error, orders}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        orders: []
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get( '/api/orders/mine',
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` }
                    }
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch(err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }

        fetchData();

    }, [userInfo]);

    console.log(orders);

    return (
         loading ? ( <LoadingBox /> ) 
        : error ? (<p className="text-danger"> { error } </p> ) :
        (
            <section className="m-1">
                <div className="p-1 container-md my-2">                
                    <div className="col-md-12 mt-2">
                        <h4 className="fw-bolder">Order history</h4>
                        <p className="text-secondary">Check the status of the recent orders, manage returns and view invoices.</p>
                    </div>
                    <hr />
                    <ul className="list-group list-group-flush">
                        {orders.sort((a,b) => { 
                            let da = new Date(a.createdAt),
                             db = new Date(b.createdAt);
                            return db-da}).map((order) => (
                            <li className="list-group-item m-1" key={order._id}>
                                <div className="card mb-2">
                                <div className="card-body">
                                    <div className="row border-bottom">
                                        <div className="col-6">
                                            <p className="fw-semibold">Order: &nbsp;<span className="text-indigo"> #{order._id}</span></p>
                                            <p className="fw-semibold">Date: &nbsp;<span className="text-indigo"> {(order.createdAt).slice(0,10)}</span></p>
                                            <p className="fw-semibold">Total: &nbsp;<span className="text-indigo"> $ &nbsp; {(order.totalPrice).toFixed(2)}</span></p>
                                        </div>
                                        <div className="col-6">
                                            <div className="row align-items-center">
                                                <div className="col-12 text-end">
                                                    <button className="rounded btn-outline" onClick={() => {navigate(`/order/${order._id}`)}}><i class="bi bi-receipt"></i> &nbsp; View Order</button>
                                                </div>
                                                <div className="col-12 text-end">
                                                    <p className="card-title"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row m-1">
                                        <ul className="list-group list-group-flush">
                                            {order.orderItems.map((product) => (
                                                <li className="list-group-item m-1" key={product._id}>
                                                    <div className="row">
                                                        <div className="col-4 text-center">
                                                            <img src={`/products/${product.src}`} alt={product.title} className="img-fluid rounded img-thumbnail" style={{maxHeight: '25vh'}}/>
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="row">
                                                                        <div className="col-8">
                                                                            <p className="card-title fs-6 fw-semibold">{product.title}</p>
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <p className="card-title fs-6 fw-semibold">$ &nbsp;{(product.price).toFixed(2)}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <p className="card-text fs-6">{product.description}</p>
                                                                    </div>      
                                                                    <div className="row mb-2">
                                                                        <Link className="text-indigo" to={`/${product.gender}s/products/${product.slug}`}> View Product</Link>
                                                                    </div>  
                                                                </div> 
                                                                <div className="col-12">
                                                                    <ShippingSteps value={order.isShipped ? (order.isDelivered ? 100 : 50) : 17} createdAt={order.createdAt} shippedOn={order.shippedOn} deliveredOn={order.deliveredOn}/>
                                                                </div> 
                                                            </div>                                                  
                                                        </div>
                                                    </div>                                                    
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                </div>
                            </li>
                        ))}
                    </ul> 
                </div>
            </section>
        )
    )
}

export default OrderHistoryScreen;