import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

const OrderSummaryScreen = () => {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const { shippingAddress, paymentMethod } = cart;

    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');

    cart.itemsPrice = cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0);
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
    cart.taxPrice = (0.13 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    useEffect(() => {
        if(!shippingAddress.add2) {
            navigate('/shipping');
        }
        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
    }, [shippingAddress, navigate, paymentMethodName]);

    const onChangePaymentMethodHandler = (e) => {
        setPaymentMethodName(() => e.target.value);
    }

    const placeOrderHandler = async () => {
        
    }

    return (
        <div className="p-3 container-md my-2">
            <CheckoutSteps step1 step2 step3 />
            
            <div className="col-md-12 mt-3 ">
                <h4 className="fw-bolder">Preview Order: </h4>
            </div>

            <div className="row g-3">

                <div className="col-lg-7">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-text fs-5"><strong>Items:</strong></h5> 
                            <ul className="list-group list-group-flush m-1">
                                {cart.cartItems.map((item) => (
                                    <li className="list-group-item mb-2" key={item._id}>
                                        <div className="row ">
                                            <div className="col-5">
                                                <img src={`/products/${item.src}`} alt={item.title} className="img-fluid rounded img-thumbnail" />
                                            </div>
                                            <div className="col-7">
                                                <div className="row g-2">
                                                    <div className="col-7 mb-2">
                                                        <h5 className="card-text fs-6 fw-bolder">{item.title}</h5>
                                                    </div>
                                                    <div className="col-5 text-end">
                                                        <h5 className="card-text fs-6"><Link className="" to="/Cart"><i class="bi bi-pencil-square"></i> Edit</Link></h5>                                                                                                                       
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <p className="card-text">{item.gender}'s</p>
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <p className="card-text">Color: {item.color}</p>
                                                    </div>
                                                    <div className="col-7 mb-2">
                                                        <p className="card-text">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="col-5 text-end">
                                                        <p className="card-text fs-6 fw-bolder">$ {(item.price).toFixed(2)}</p>
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
                            </ul>   
                            <hr />
                            <h5 className="card-text fs-5"><strong>Payment Method: </strong></h5> 
                            <div class="row g-2">
                            <div className="col-12 text-center"></div>
                            <div className="col-2 text-center"></div>
                                <div className="col-4 text-center">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="paymentMethodRadio" id="paypalRadio" value="PayPal" onChange={(e) => onChangePaymentMethodHandler(e)} />
                                        <label class="form-check-label" for="inlineRadio1">PayPal</label>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="paymentMethodRadio" id="visaRadio" value="Visa" onChange={(e) => onChangePaymentMethodHandler(e)} />
                                        <label class="form-check-label" for="visaRadio">Visa</label>
                                    </div>
                                </div>
                                <div className="col-12 text-center"></div>
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary shadow" type="button" style={{width: '75%'}} onClick={{placeOrderHandler}}>Checkout <i className="bi bi-arrow-right"></i></button>
                                </div>
                            </div>                         
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-text fs-5"><strong>Shipping Address:</strong></h5> 
                            <p className="card-text"><strong>Name: </strong> {cart.shippingAddress.fullName}</p>
                            <p className="card-text"><strong>Address: </strong> {cart.shippingAddress.add1 ? ' ' + cart.shippingAddress.add1 + " - " : " " } {cart.shippingAddress.add2},
                            {' '} {cart.shippingAddress.city}, {cart.shippingAddress.province}, {cart.shippingAddress.postal}</p>
                            <p className="card-text"><strong>Email: </strong>{cart.shippingAddress.email}</p>
                            <p className="card-text"><strong>Ph #: </strong>{cart.shippingAddress.phNumber}</p>
                            <Link to="/shipping"> <i class="bi bi-pencil-square"></i> Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummaryScreen;