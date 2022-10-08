import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

const ShippingScreen = () => {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress } } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [email, setEmail] = useState(shippingAddress.email || '');
    const [add1, setAdd1] = useState(shippingAddress.add1 || '');
    const [add2, setAdd2] = useState(shippingAddress.add2 || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [province, setProvince] = useState(shippingAddress.province || '');
    const [postal, setPostal] = useState(shippingAddress.postal || '');
    const [phNumber, setPhNumber] = useState(shippingAddress.phNumber || '');

    const onShippingSubmitHandler = (e) => {
        e.preventDefault();

        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                email,
                add1,
                add2,
                city,
                province,
                postal,
                phNumber
            }
        });

        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                email,
                add1,
                add2,
                city,
                province,
                postal,
                phNumber
            })
        );
        
        navigate('/order-summary');
    }

    useEffect(() => {
        if(!userInfo) {
            navigate('/SignIn?redirect=/shipping');
        }
    }, [userInfo, navigate]);

    return (
        <div className="p-3 container-md my-2">
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <form className="row g-3" onSubmit={onShippingSubmitHandler}>
            
                <div className="col-md-12 mt-3 ">
                <h4 className="fw-bolder">Shipping Address</h4>
                </div>
                
                <div className="col-md-6">
                    <label for="inputName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="inputName" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                </div>
                <div className="col-md-6">
                    <label for="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="col-md-3">
                    <label for="inputAddress1" className="form-label">Address 1</label>
                    <input type="text" className="form-control" id="inputAddress1" placeholder="# Apartment Number" value={add1} onChange={(e) => setAdd1(e.target.value)} />
                </div>
                <div className="col-md-9">
                    <label for="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Street Number and Address" value={add2} onChange={(e) => setAdd2(e.target.value)} required/>
                </div>
                <div className="col-md-6">
                    <label for="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" value={city} onChange={(e) => setCity(e.target.value)} required/>
                </div>
                <div className="col-md-4">
                    <label for="inputState" className="form-label">Province</label>
                    <select id="inputState" className="form-select" value={province} onChange={(e) => setProvince(e.target.value)} required>
                        <option selected>Choose...</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YT">Yukon</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label for="inputPostal" className="form-label">Postal</label>
                    <input type="text" className="form-control" id="inputPostal" value={postal} onChange={(e) => setPostal(e.target.value)} required/>
                </div>
                <div className="col-md-6">
                    <label for="inputPhNumber" className="form-label">Phone Number #:</label>
                    <input type="number" className="form-control" id="inputPhNumber" value={phNumber} onChange={(e) => setPhNumber(e.target.value)} required/>
                </div>
                <div className="col-12 mb-3">
                    <button type="submit" className="btn-fill rounded">Continue <i class="bi bi-arrow-right"></i></button>
                </div>
                </form>
        </div>
    );
}
export default ShippingScreen;