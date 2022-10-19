import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import ShippingSteps from '../components/ShippingSteps';
import FooterScreen from './FooterScreen';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const OrderHistoryScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        orders: []
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get('/api/orders/mine',
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` }
                    }
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }

        fetchData();

    }, [userInfo]);

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        navigate('/SignIn');
    }

    return (
        <>
            <section>
                <div className="row m-2 mt-0 g-2 shadow">
                    <span className='m-0 p-0 text-start'><button className="btn text-indigo d-lg-none fw-semibold fs-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"> Profile: &nbsp; <i className="bi fs-4 bi-person-circle"></i></button></span>
                    <div className="col-md-2 offcanvas-lg offcanvas-start m-0 border-end" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body d-block p-1">
                            <div className="d-flex align-items-start">
                                <div className="nav flex-column nav-pills m-2">
                                    <ul className="list-group list-group-flush px-2">
                                        <li className='list-group-item'><Link className="btn-outline-sidenav rounded" to="/profile" type="button"><i className="fs-6 bi bi-person"></i> &nbsp;Profile</Link></li>
                                        <li className='list-group-item'><Link className="btn-outline-sidenav rounded sidenav-active" to="/orderHistory" type="button"><i className="fs-6 bi bi-handbag"></i> &nbsp; Order History</Link></li>
                                        <li className='list-group-item'><Link className="btn-outline-sidenav rounded" to="/edit-profile" type="button"><i className="fs-6 bi bi-gear"></i> &nbsp; Settings</Link></li>
                                        <li className='list-group-item'><Link className="btn-outline-sidenav rounded" onClick={signoutHandler} to="/SIgnIn" type="button"><i className="fs-6 bi bi-box-arrow-left"></i> &nbsp; Sign Out</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 p-3 ">
                        <h4 className='fw-bold mt-2 '>Order History</h4>
                        <p className="text-secondary">Check the status of the recent orders, manage returns and view invoices.</p>
                        
                        <hr />
                        
                        <ul className="list-group list-group-flush">
                            {console.log(orders.filter((order) => order.orderItems.map((item) =>item.title.includes('White'))))}
                            {orders.sort((a, b) => {
                                let da = new Date(a.createdAt),
                                    db = new Date(b.createdAt);
                                return db - da
                            }).map((order) => (
                                <li className="list-group-item m-1" key={order._id}>
                                    <div className="card mb-2">
                                        <div className="card-body">
                                            <div className="row border-bottom">
                                                <div className="col-6">
                                                    <p className="fw-semibold">Order: &nbsp;<span className="text-indigo"> #{order._id}</span></p>
                                                    <p className="fw-semibold">Date: &nbsp;<span className="text-indigo"> {(order.createdAt).slice(0, 10)}</span></p>
                                                    <p className="fw-semibold">Total: &nbsp;<span className="text-indigo"> $ &nbsp; {(order.totalPrice).toFixed(2)}</span></p>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row align-items-center">
                                                        <div className="col-12 text-end">
                                                            <button className="rounded btn-outline" onClick={() => { navigate(`/order/${order._id}`) }}><i class="bi bi-receipt"></i> &nbsp; View Order</button>
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
                                                                    <img src={`/products/${product.src}`} alt={product.title} className="img-fluid rounded img-thumbnail" style={{ maxHeight: '25vh' }} />
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
                                                                            <ShippingSteps value={order.isShipped ? (order.isDelivered ? 100 : 50) : 17} createdAt={order.createdAt} isShipped={order.isShipped} isDelivered={order.isDelivered} shippedOn={order.shippedOn} deliveredOn={order.deliveredOn} />
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
                </div>
                <FooterScreen />
            </section>
        </>
    )
}

export default OrderHistoryScreen;