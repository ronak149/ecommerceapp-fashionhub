import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
    switch(action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS': 
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false };
        default:
            return state;
    }
}

const OrderSummaryScreen = () => {

    const navigate = useNavigate();

    const [{loading, successPay, loadingPay}, dispatch] = useReducer(reducer, {
        loading: false,
        successPay: false,
        loadingPay: false
    })

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const { shippingAddress } = cart;

    const paymentMethodName= 'PayPal';

    cart.itemsPrice = cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0);
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
    cart.taxPrice = (0.13 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    let orderId = '';

    const createOrder = (data, actions) => {
        const placeOrderHandler = async () => {
            try {
                dispatch({type: 'CREATE_REQUEST'});
                const { data } = await axios.post('/api/orders',
                    {
                        orderItems: cart.cartItems,
                        shippingAddress: cart.shippingAddress,
                        paymentMethod: cart.paymentMethod,
                        itemsPrice: cart.itemsPrice,
                        taxPrice: cart.taxPrice,
                        shippingPrice: cart.shippingPrice,
                        totalPrice: cart.totalPrice,
                    },
                    {
                        headers: {
                            authorization: `Bearer ${userInfo.token}`,
                        }
                    }
                );
                
                orderId = data.order._id;
            }
            catch (err) {
                dispatch({type: 'CREATE_FAIL'});
                toast.error('Order not placed');
            }
        }

        placeOrderHandler();

        return actions.order 
        .create({
            purchase_units: [
                {
                    amount: { value: cart.totalPrice},
                },
            ],
        })
        .then((orderId) => {
            return orderId;
        });
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' });
                const { data } = await axios.put(
                    `/api/orders/${orderId}/pay`,
                    details,
                    {
                        headers: { authorization: `Bearer ${userInfo.token}`},
                    }
                );
                dispatch({ type: 'PAY_SUCCESS', payload: data});
                ctxDispatch({ type: 'CART_CLEAR' });
                dispatch({ type: 'CREATE_SUCCESS'});
                localStorage.removeItem('cartItems');
                navigate(`/order/${orderId}`);
                toast.success('Payment successful !');
            }
            catch (err) {
                dispatch({ type: 'PAY_FAIL' });
                toast.error(err.message);
            }
        })
    }

    const onError = (err) => {
        toast.error(err.message);
    }

    useEffect(() => {
        if(!shippingAddress.add2) {
            navigate('/shipping');
        }
        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        
        if (successPay) {
            dispatch({ type: 'PAY_RESET' });
        }

        const loadPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/keys/paypal', {
                headers: { authorization: `Bearer ${userInfo.token}`},
            });
            paypalDispatch({
                type: 'resetOptions',
                value: {
                    'client-id': clientId,
                    currency: 'CAD',
                }
            })
            paypalDispatch({
                type: 'setLoadingStatus', value: 'pending' 
            });
        }
        loadPayPalScript();
    }, [shippingAddress, navigate, paymentMethodName, ctxDispatch, userInfo, paypalDispatch, successPay]);

    return (
        <div className="p-1 container-md my-2">
            <CheckoutSteps step1 step2 step3 />
            
            <div className="col-md-12 mt-3 ">
                <h4 className="fw-bolder">Preview Order: </h4>
            </div>

            <div className="row g-2">

            <div className="col-lg-7">
                    <div className="card">
                        <div className="card-body">
                        <div className="row g-2">
                        <h5 className="card-text fs-5"><strong>Shipping Address:</strong></h5>
                                                    <div className="col-7 mb-2">
                                                    <p className="card-text"><span className='fw-semibold'>Name: </span> {cart.shippingAddress.fullName}</p>
                                                    </div>
                                                    <div className="col-5 px-3 text-end">
                                                    <h5 className="card-text fs-6"> <Link style={{color: '#311b92'}} to="/shipping"> <i class="bi bi-pencil-square"></i> Edit</Link></h5>
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                    <p className="card-text"><span className='fw-semibold'>Address: </span> {cart.shippingAddress.add1 ? ' ' + cart.shippingAddress.add1 + " - " : " " } {cart.shippingAddress.add2},
                            {' '} {cart.shippingAddress.city}, {cart.shippingAddress.province}, {cart.shippingAddress.postal}</p>
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                    <p className="card-text"><span className='fw-semibold'>Email: </span>{cart.shippingAddress.email}</p>
                                                    </div>
                                                    <div className="col-12">
                                                    <p className="card-text"><span className='fw-semibold'>Ph #: </span>{cart.shippingAddress.phNumber}</p>
                                                    </div>
                                                </div>
                            
                            
                           
                            
                            
                           
                            <hr />

                            <h5 className="card-text fs-5"><strong>Items:</strong></h5> 
                            <ul className="list-group list-group-flush">
                                {cart.cartItems.map((item) => (
                                    <li className="list-group-item mb-2" key={item._id}>
                                        <div className="row ">
                                            <div className="col-5">
                                                <img src={`/products/${item.src}`} alt={item.title} className="img-fluid rounded img-thumbnail"  style={{maxHeight: '35vh'}}/>
                                            </div>
                                            <div className="col-7">
                                                <div className="row g-2">
                                                    <div className="col-7 mb-2">
                                                        <h5 className="card-text fs-6 fw-semibold">{item.title}</h5>
                                                    </div>
                                                    <div className="col-5 text-end">
                                                        <h5 className="card-text fs-6"><Link style={{color: '#311b92'}} to="/Cart"><i class="bi bi-pencil-square"></i> Edit</Link></h5>                                                                                                                       
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <p className="card-text">{item.gender}'s | {item.color}</p>
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <p className="card-text">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="col-12">
                                                        <p className="card-text fs-6 fw-semibold">$ {(item.price).toFixed(2)}</p>
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

                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-text fs-5 fw-bolder">Order Summary:</h5> 
                            <ul class="list-group list-group-flush m-1">
                                <li class="list-group-item">
                                    <div className="row">
                                        <p className="card-text col-8 m-0  fw-semibold">Subtotal:</p>
                                        <p className="card-text col-4 m-0  fw-semibold">{(cart.itemsPrice).toFixed(2)}</p>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="row">
                                        <p className="card-text col-8 m-0  fw-semibold">Tax:</p>
                                        <p className="card-text col-4 m-0  fw-semibold">{(cart.taxPrice).toFixed(2)}</p>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="row">
                                        <p className="card-text col-8 m-0  fw-semibold">Shipping:</p>
                                        <p className="card-text col-4 m-0  fw-semibold">{(cart.shippingPrice).toFixed(2)}</p>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="row ">
                                        <p className="card-text col-8 m-0  fw-bolder fs-6">Order Total:</p>
                                        <p className="card-text col-4 m-0 fs-6 fw-bolder">{(cart.totalPrice).toFixed(2)}</p>
                                    </div>
                                </li>
                                <li class="list-group-item mt-2">
                                    <div className="row">
                                        <p className="card-text col-12 m-0  fw-semibold text-success">Free shipping on orders over $ 100.00</p>
                                    </div>
                                </li>
                            </ul>   
                            <hr />
                            <h5 className="card-text fs-5"><strong>Payment: </strong></h5> 
                            <div class="row g-2">
                                <div className="col-12 text-center"></div>
                                {/* <div className="col-12 text-center">
                                    <button className="btn-fill rounded" type="button" style={{width: '75%'}} onClick={ () => placeOrderHandler()}>Checkout <i className="bi bi-arrow-right"></i></button>
                                </div> */}
                                <div className="col-12 text-center">
                                    { isPending ? (<LoadingBox />) 
                                    :(
                                        <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                        >
                                        </PayPalButtons>
                                    )}
                                </div>
                                { (loading || loadingPay) && <LoadingBox /> }
                            </div>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummaryScreen;