import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './SignInScreen.css';
import axios from 'axios';
import { Store } from '../Store.js';
import { toast } from 'react-toastify';

const SignInScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signin', {
                email,
                password,
            });
            ctxDispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        }
        catch (err) {
            toast.error('Invalid email or password');
        }
    }

    useEffect( () => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
       
        <div id="sign-in-form-container" className=" position-absolute top-0 start-0 container-fluid " style={{height: '100%', backgroundColor: 'white'}} >
             <div  className="row align-items-center p-4" style={{height: '100%', backgroundColor: '#311b9215'}}>
            <form className="col text-center needs-validation " noValidate onSubmit={submitHandler}>
                <div className="row justify-content-center">
                <br/>
                <div className="col-md-4 p-3 py-0 border rounded" style={{backgroundColor: 'white'}}>
                    <br />
                    <p className="text-end p-0 m-0"><Link type="button" className="btn-close fs-6" to="/"  aria-label="Close"></Link></p>
                    <p className="text-center p-0 m-0"><Link className="" to="/"><img src={process.env.PUBLIC_URL + "/logo-full.PNG"} alt="Blue Tagged Logo" width="125" height="125" /></Link></p>
                    <br/>
                    <div  className="p-3 py-0">
                        <input type="text" className="form-control" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
                        <br />
                    </div>
                    <div className="p-3 py-0">
                        <input type="password" className="form-control" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        <br />
                    </div>
                    <div className="text-center mb-3">
                        <button className="btn-fill rounded" type="submit">Sign In</button>
                    </div>
                    <div className="mb-2 text-center">
                        <p> Need an account? {' '} <Link to={`/signup?redirect=${redirect}`}> {' '} Sign Up</Link></p>
                    </div>
                    <div className="row">
                        <div className="col"><hr /></div><div className="col text-center m-auto">or login with</div><div className="col"><hr /></div>
                    </div>
                    <br/>
                    <div className="row justify-content-around">
                        <div className="col text-center"> <Link to="/SignIn" className="btn-outline rounded p-0 py-2 px-3">&nbsp;&nbsp; <i class="bi bi-facebook"></i> &nbsp;&nbsp;</Link></div>
                        <div className="col text-center"> <Link to="/SignIn" className="btn-outline rounded p-0 py-2 px-3">&nbsp;&nbsp; <i class="bi bi-google"></i> &nbsp;&nbsp;</Link></div>
                        <div className="col text-center"> <Link to="/SignIn" className="btn-outline rounded p-0 py-2 px-3">&nbsp;&nbsp; <i class="bi bi-github"></i> &nbsp;&nbsp;</Link></div>
                    </div>
                    <br />
                </div>   
                </div>            
            </form>
            </div>
        </div>
    );
}

export default SignInScreen;