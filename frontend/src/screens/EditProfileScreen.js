import React, { useContext, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FooterScreen from './FooterScreen';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
}

const EditProfileScreen = () => {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [fullName, setFullName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/users/update-profile',
                {
                    fullName,
                    email,
                    password
                },
                {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                }
            );
            dispatch({ type: 'UPDATE_SUCCESS' });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/profile');
            toast.success('Profile updated !');
        }
        catch (err) {
            dispatch({ type: 'FETCH_FAIL' });
            toast.error(err.message);
        }
    };

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
                                        <li className='list-group-item'><Link className="btn-outline-sidenav rounded" to="/orderHistory" type="button"><i className="fs-6 bi bi-handbag"></i> &nbsp; Order History</Link></li>
                                        <li className='list-group-item'><Link className="btn-outline-sidenav rounded sidenav-active" to="/edit-profile" type="button"><i className="fs-6 bi bi-gear"></i> &nbsp; Update</Link></li>
                                        <li className='list-group-item'><Link className="btn-outline-sidenav rounded" onClick={signoutHandler} to="/SIgnIn" type="button"><i className="fs-6 bi bi-box-arrow-left"></i> &nbsp; Sign Out</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 p-3 ">
                        <h4 className='fw-bold mt-2 '>Profile</h4>
                        <br />
                        <div className="row g-4 mb-3">
                            <div className="col-md-4 text-center">
                                <img src={process.env.PUBLIC_URL + "person-circle.svg"} alt="profile" style={{ width: '100%', maxHeight: '25vh' }} />
                            </div>
                            <div className="col-md-8">
                                <form className="row g-2 needs-validation" onSubmit={submitHandler}>
                                    <div className="col-md-10">
                                        <label htmlFor="full-name-signup" className="form-label" >Name</label>
                                        <input type="text" className="form-control" id="full-name-signup" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                        <br />
                                    </div>
                                    <div className="col-md-10">
                                        <label htmlFor="email-signup" className="form-label" >Email</label>
                                        <input type="text" className="form-control" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        <br />
                                    </div>
                                    <div className="col-md-10">
                                        <label htmlFor="password-signup" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="col-md-10">
                                        <label htmlFor="retype-password-signup" className="form-label">Retype Password</label>
                                        <input type="password" className="form-control" id="retype-password-signup" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} />
                                        <br />
                                    </div>

                                    <div className="col-md-10 text-center">
                                        <button className="btn-fill rounded" type="submit">Update Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterScreen />
        </>
    );
}

export default EditProfileScreen;