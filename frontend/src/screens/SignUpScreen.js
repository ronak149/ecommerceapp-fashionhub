import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './SignInScreen.css';
import axios from 'axios';
import { Store } from '../Store.js';
import { toast } from 'react-toastify';

const SignUpScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== retypePassword){
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await axios.post('/api/users/signup', {
                fullName,
                email,
                password,
            });
            ctxDispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    useEffect( () => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div id="sign-in-form-container" className="container-fluid card sign-in-form-container p-4">
            <form className="row g-2 needs-validation" onSubmit={submitHandler}>
                <div className="col-md-1"></div>
                <div className="col-md-10 mt-3 mb-2">
                <h4 className="fw-bolder">Sign Up</h4>
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <label htmlFor="full-name-signup" className="form-label" >Full Name</label>
                    <input type="text" className="form-control" id="full-name-signup" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <label htmlFor="email-signup" className="form-label" >Email</label>
                    <input type="text" className="form-control" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <label htmlFor="password-signup" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <label htmlFor="retype-password-signup" className="form-label">Retype Password</label>
                    <input type="password" className="form-control" id="retype-password-signup" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} required />
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="agree-checkbox" required />
                    <label className="form-check-label agree-checkbox-label" htmlFor="agree-checkbox">
                       I Agree to terms and conditions
                    </label>
                    </div>
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10 text-center ">
                    <button className="btn-fill rounded" type="submit">Sign Up</button>
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10 text-center ">
                   <p> Have an account? {' '} <Link to={`/signin?redirect=${redirect}`}> {' '} Sign In</Link></p>
                </div>
                <div className="col-md-1"></div>
            </form>
        </div>
        
    );
}


export default SignUpScreen;