import React, { useContext, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
    switch(action.type) {
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

    const { state, dispatch: ctxdispatch } = useContext(Store);
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
            dispatch({type: 'UPDATE_SUCCESS'});
            ctxdispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/profile');   
            toast.success('Profile updated !');
        }
        catch(err) {
            dispatch({ type: 'FETCH_FAIL'});
            toast.error(err.message);
        }
    };

    return (
        <div id="sign-in-form-container" className=" sign-in-form-container card p-4">
            <form className="row g-2 needs-validation" onSubmit={submitHandler}>
                <div className="col-md-1"></div>
                <div className="col-md-10 mt-3 mb-2">
                <h4 className="fw-bolder">Profile</h4>
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <label htmlFor="full-name-signup" className="form-label" >Name</label>
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
                    <input type="password" className="form-control" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)}  />
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <label htmlFor="retype-password-signup" className="form-label">Retype Password</label>
                    <input type="password" className="form-control" id="retype-password-signup" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)}  />
                </div>
                <div className="col-md-1"></div>

                <div className="col-md-1"></div>
                <div className="col-md-10 text-center ">
                    <button className="btn-fill rounded" type="submit">Update</button>
                </div>
                <div className="col-md-1"></div>

            </form>
        </div>
    );
}

export default EditProfileScreen;