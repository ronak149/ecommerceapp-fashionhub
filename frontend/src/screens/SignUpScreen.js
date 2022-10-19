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

    const regexLength = /.{8,}/;
    const regexUppercase = /(?=.*[A-Z])/;
    const regexLowercase = /(?=.*[a-z])/;
    const regexNumber = /(?=.*[0-9])/;
    const regexSpecialChar = /(?=.*[!@#$&*])/;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (email) {
            let re = /\S+@[a-zA-Z]+\.com+/;
            if (re.test(email)) {

            }
            else {
                toast.error('Please enter a valid email')
                return;
            }
        }
        if (password !== retypePassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await axios.post('/api/users/signup', {
                fullName,
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        }
        catch (err) {
            toast.error('User already exists !');
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div id="sign-in-form-container" className=" position-absolute top-0 start-0 container-fluid " style={{ minHeight: '100%', backgroundColor: 'white' }} >
            <div className="row align-items-center p-4" style={{ height: '100%', backgroundColor: '#311b9215' }}>
                <form className="col text-center needs-validation " noValidate onSubmit={submitHandler}>
                    <div className="row justify-content-center">
                        <br />
                        <div className="col-md-4 p-3 py-0 border rounded shadow" style={{ backgroundColor: 'white' }}>
                            <br />
                            <p className="text-end p-0 m-0"><Link type="button" className="btn-close fs-6" to="/" aria-label="Close"></Link></p>
                            <p className="text-center p-0 m-0"><Link className="" to="/"><img src={process.env.PUBLIC_URL + "/logo-full.PNG"} alt="Blue Tagged Logo" width="125" height="125" /></Link></p>
                            <br />
                            <div className="p-3 py-0">
                                <input type="text" className="form-control" id="full-name-signup" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" required />
                                <br />
                            </div>
                            <div className="p-3 py-0">
                                <input type="text" className="form-control" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} pattern="^\S+@[a-zA-Z]+\.com+$" placeholder="Email address" required />
                                <br />
                            </div>
                            <div className="p-3 py-0">
                                <input type="password" className="form-control" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$" placeholder="Password" required />
                                {password.length > 0 &&
                                    (<div className="m-2 mx-4 text-start">
                                        <small className={regexLength.test(password) ? 'text-success' : 'text-danger'}><p className="form-label p-0 m-0">{regexLength.test(password) ? <i class="bi bi-check-circle-fill"></i> : <i class="bi bi-x-circle-fill"></i>} &nbsp; 8 characters long</p></small>
                                        <small className={regexUppercase.test(password) ? 'text-success' : 'text-danger'}><p className="form-label p-0 m-0">{regexUppercase.test(password) ? <i class="bi bi-check-circle-fill"></i> : <i class="bi bi-x-circle-fill"></i>} &nbsp; 1 Uppercase </p></small>
                                        <small className={regexLowercase.test(password) ? 'text-success' : 'text-danger'}><p className="form-label p-0 m-0">{regexLowercase.test(password) ? <i class="bi bi-check-circle-fill"></i> : <i class="bi bi-x-circle-fill"></i>} &nbsp; 1 Lowercase </p></small>
                                        <small className={regexNumber.test(password) ? 'text-success' : 'text-danger'}><p className="form-label p-0 m-0">{regexNumber.test(password) ? <i class="bi bi-check-circle-fill"></i> : <i class="bi bi-x-circle-fill"></i>} &nbsp; 1 Number and </p></small>
                                        <small className={regexSpecialChar.test(password) ? 'text-success' : 'text-danger'}><p className="form-label p-0 m-0">{regexSpecialChar.test(password) ? <i class="bi bi-check-circle-fill"></i> : <i class="bi bi-x-circle-fill"></i>} &nbsp; 1 Special Character</p></small>
                                    </div>)
                                }
                                <br />
                            </div>
                            <div className="p-3 py-0">
                                <input type="password" className="form-control" id="retype-password-signup" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} placeholder="Re-type Password" required />
                                {retypePassword.length > 0 &&
                                    (<div className="m-2 mx-4 text-start">
                                        <small className={password === retypePassword ? 'text-success' : 'text-danger'}><p className="form-label p-0 m-0">{password === retypePassword ? <i class="bi bi-check-circle-fill"></i> : <i class="bi bi-x-circle-fill"></i>} &nbsp; Passwords must match</p></small>
                                    </div>)
                                }
                                <br />
                            </div>
                            <div className="p-3 py-0 text-start">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="agree-checkbox" required />
                                    <label className="form-check-label agree-checkbox-label" htmlFor="agree-checkbox">
                                        I Agree to terms and conditions
                                    </label>                                    
                                </div>
                            </div>
                            <br />
                            <div className="text-center mb-3">
                                <button className="btn-fill rounded" type="submit">Sign Up</button>
                            </div>
                            <div className="mb-2 text-center">
                                <p> Have an account? {' '} <Link to={`/signin?redirect=${redirect}`}> {' '} Sign In</Link></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default SignUpScreen;