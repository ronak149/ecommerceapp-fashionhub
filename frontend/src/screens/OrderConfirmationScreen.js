import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store.js';
import LoadingBox from '../components/LoadingBox.js';

import axios from 'axios';
import ShippingSteps from "../components/ShippingSteps.js";
import { toast } from "react-toastify";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, order: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'DELIVER_REQUEST':
            return { ...state, loadingDeliver: true, successDeliver: false }
        case 'DELIVER_SUCCESS':
            return { ...state, loadingDeliver: false, successDeliver: true };
        case 'DELIVER_FAIL':
            return { ...state, loadingDeliver: false, successDeliver: false };
        case 'DELIVER_RESET':
            return { ...state, loadingDeliver: false, successDeliver: false };
        case 'SHIPPED_REQUEST':
            return { ...state, loadingShipped: true, successShipped: false }
        case 'SHIPPED_SUCCESS':
            return { ...state, loadingShipped: false, successShipped: true };
        case 'SHIPPED_FAIL':
            return { ...state, loadingShipped: false, successShipped: false };
        case 'SHIPPED_RESET':
            return { ...state, loadingShipped: false, successShipped: false };
        default:
            return state;
    }
}

const OrderConfirmationScreen = () => {

    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;

    const [{ loading, error, order, loadingDeliver, successDeliver, loadingShipped, successShipped }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        loadingDeliver: false,
        successDeliver: false,
        loadingShipped: false,
        successShipped: false
    })

    useEffect(() => {

        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }

        if (!userInfo) {
            return navigate('/login')
        }

        if (!order._id || successDeliver || successShipped || (order._id && order._id !== orderId)) {
            fetchOrder();
            if(successDeliver) {
                dispatch({ type: 'DELIVER_RESET' });
            }
            if(successShipped) {
                dispatch({ type: 'SHIPPED_RESET' });
            }
        }
    }, [order, orderId, userInfo, navigate, successDeliver, successShipped]);

    const orderDeliveryHandler = async () => {
        try {
            dispatch({ type: 'DELIVER_REQUEST' });
            const { data } = await axios.put(`/api/orders/${order._id}/deliver`,
            {

            }, 
            {
                headers: { authorization: `Bearer ${userInfo.token}` },
            }
            );
            dispatch({ type: 'DELIVER_SUCCESS' });
            toast.success('Order marked as delivered!');
        }
        catch(err) {
            toast.error(err.message);
            dispatch({ type: 'DELIVER_FAIL'});
        }
    }

    const orderShippingHandler = async () => {
        try {
            dispatch({ type: 'SHIPPED_REQUEST' });
            const { data } = await axios.put(`/api/orders/${order._id}/shipped`,
            {

            }, 
            {
                headers: { authorization: `Bearer ${userInfo.token}` },
            }
            );
            dispatch({ type: 'SHIPPED_SUCCESS' });
            toast.success('Order marked as Shipped!');
        }
        catch(err) {
            dispatch({ type: 'SHIPPED_FAIL'});
            toast.error(err.message);
        }
    }

    return loading ? (<LoadingBox />)
        : error ? (<p className="text-danger"> {error} </p>)
            : (
                <section className="m-1">
                    <div className="p-1 container-md my-2">

                        <div className="col-md-12 mt-2">
                            <h6 className="fw-semibold text-indigo">Thank you!</h6>
                            <h4 className="fw-semibold text-indigo">Order placed !</h4>
                            <p className="text-secondary">Your order has been placed and will be shipped to you soon.</p>
                        </div>

                        <div className="col-md-12 mt-2">
                            <p className="fw-semibold">Order Number: <span className="text-indigo"> #{orderId}</span></p>
                        </div>


                        <div className="card">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {order.orderItems.map((item) => (
                                        <li className="list-group-item mb-2" key={item._id}>
                                            <div className="row g-2">
                                                <div className="col-md-5">
                                                    <img src={`/products/${item.src}`} alt={item.title} className="img-fluid rounded img-thumbnail" style={{ maxHeight: '75vh' }} />
                                                </div>
                                                <div className="col-md-7 ">
                                                    <div className="row g-2">
                                                        <hr />
                                                        <div className="col-12 mb-2">
                                                            <h5 className="card-text fs-6 fw-semibold">{item.title}</h5>
                                                        </div>
                                                        <div className="col-12 mb-2">
                                                            <p className="card-text">{item.gender}'s | {item.color}</p>
                                                        </div>
                                                        <div className="col-12 mb-2">
                                                            <p className="card-text fs-6 fw-semibold">$ {(item.price).toFixed(2)}</p>
                                                        </div>
                                                        <div className="col-12 mb-2">
                                                            <p className="card-text">{item.description}</p>
                                                        </div>
                                                        <hr />
                                                        <div className="col-12 mb-2">

                                                            <div className="row">
                                                                <div className="col-md-7">
                                                                    <br />
                                                                    <div className="col-12 mb-2"><h5 className="card-text fs-6 fw-semibold"><i class="bi bi-house-fill"></i>&nbsp; {' '} Shipping Address:</h5></div>
                                                                    <br />
                                                                    <div className="col-12 mb-2">
                                                                        <p className="card-text"><i class="bi bi-person-circle"></i> &nbsp;{order.shippingAddress.fullName}</p>
                                                                    </div>
                                                                    <div className="col-12 mb-2">
                                                                        <p className="card-text"><i class="bi bi-house-fill"></i> &nbsp; {order.shippingAddress.add1 ? ' ' + order.shippingAddress.add1 + " - " : " "} {order.shippingAddress.add2}, {' '} {order.shippingAddress.city}, {order.shippingAddress.province}, {order.shippingAddress.postal} </p>
                                                                    </div>
                                                                    <div className="col-12 mb-2">
                                                                        <p className="card-text"><i class="bi bi-envelope-fill"></i> &nbsp; {order.shippingAddress.email}</p>
                                                                    </div>
                                                                    <div className="col-12 mb-2">
                                                                        <p className="card-text"><i class="bi bi-telephone-fill"></i> &nbsp; {order.shippingAddress.phNumber}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <br />
                                                                    <div className="col-12 mb-2"><h5 className="card-text fs-6 fw-semibold"><i class="bi bi-credit-card-fill"></i>&nbsp; {' '} Payment Method:</h5></div>
                                                                    <br />
                                                                    <div className="row">
                                                                        <div className="col-6 mb-2">
                                                                            <p className="card-text"><i class="bi bi-paypal"></i>&nbsp; {' '} {order.paymentMethod}</p>
                                                                        </div>
                                                                        <div className="col-6 mb-2">
                                                                            {order.isPaid ? (<p className="card-text fw-semibold" style={{ color: '#00c900' }}><i class="bi bi-check-circle-fill"></i>&nbsp; {' '} Paid</p>) : (<p className="card-text text-danger"><i class="bi bi-x-circle-fill"></i>&nbsp; {' '} Not Paid</p>)}
                                                                        </div>
                                                                        <div className="col-12 mb-2">
                                                                            <p className="card-text"><span className="fw-semibold"><i class="bi bi-hash"></i> &nbsp; ID: &nbsp; </span>{order.paymentResult.id}</p>
                                                                        </div>
                                                                        <div className="col-12 mb-2">
                                                                            <p className="card-text"><span className="fw-semibold"><i class="bi bi-calendar-event-fill"></i> &nbsp; Date: &nbsp; {' '}</span>{(order.paymentResult.update_time).slice(0, 10)}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="col-12 ">
                                    <hr />
                                    <ShippingSteps value={order.isShipped ? (order.isDelivered ? 100 : 50) : 17} createdAt={order.createdAt} shippedOn={order.shippedOn} deliveredOn={order.deliveredOn} isDelivered={order.isDelivered} isShipped={order.isShipped} />
                                    {
                                        userInfo.isAdmin && order.isPaid && (
                                            <div className="row mt-2 m-1 p-2 g-2 text-center">
                                                <div className="col-sm-4"><button className="btn-fill rounded p-0 m-1" disabled> <i class=" fs-5 bi bi-check2-square"></i> &nbsp; Processed</button></div>
                                                <div className="col-sm-4"><button className="btn-fill rounded p-0 m-1" onClick={orderShippingHandler} disabled={order.isShipped}> <i class=" fs-5 bi bi-truck"></i> &nbsp;{ order.isShipped ? 'Shipped' : 'Mark as Shipped'}</button></div>
                                                <div className="col-sm-4"><button className="btn-fill rounded p-0 m-1" onClick={orderDeliveryHandler} disabled={order.isDelivered}><i class=" fs-5 bi bi-box2-heart"></i> &nbsp; { order.isDelivered ? 'Delivered' : 'Mark as Delivered'}</button></div>
                                            </div>
                                        )                                        
                                    }

                                </div>
                                <div className="col-12 m-2">
                                    <hr />
                                    <h5 className="card-text fs-6 fw-bolder">Order Summary:</h5>
                                    <ul class="list-group list-group-flush m-2">
                                        <li class="list-group-item">
                                            <div className="row">
                                                <p className="card-text col-8 m-0  fw-semibold">Subtotal:</p>
                                                <p className="card-text col-4 m-0  fw-semibold">$ &nbsp; {(order.itemsPrice).toFixed(2)}</p>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div className="row">
                                                <p className="card-text col-8 m-0  fw-semibold">Tax:</p>
                                                <p className="card-text col-4 m-0  fw-semibold">$ &nbsp; {(order.taxPrice).toFixed(2)}</p>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div className="row">
                                                <p className="card-text col-8 m-0  fw-semibold">Shipping:</p>
                                                <p className="card-text col-4 m-0  fw-semibold">$ &nbsp; {(order.shippingPrice).toFixed(2)}</p>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div className="row ">
                                                <p className="card-text col-8 m-0  fw-bolder fs-6">Order Total:</p>
                                                <p className="card-text col-4 m-0 fs-6 fw-bolder">$ &nbsp; {(order.totalPrice).toFixed(2)}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            );
}

export default OrderConfirmationScreen;