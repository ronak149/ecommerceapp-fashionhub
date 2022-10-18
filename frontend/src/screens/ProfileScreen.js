import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import FooterScreen from './FooterScreen';

const ProfileScreen = () => {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        navigate('/SignIn');
    }

    return (
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
                                    <li className='list-group-item'><Link className="btn-outline-sidenav rounded sidenav-active" to="/profile" type="button"><i className="fs-6 bi bi-person"></i> &nbsp;Profile</Link></li>
                                    <li className='list-group-item'><Link className="btn-outline-sidenav rounded" to="/orderHistory" type="button"><i className="fs-6 bi bi-handbag"></i> &nbsp; Order History</Link></li>
                                    <li className='list-group-item'><Link className="btn-outline-sidenav rounded" to="/edit-profile" type="button"><i className="fs-6 bi bi-gear"></i> &nbsp; Update</Link></li>
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
                            <img src={process.env.PUBLIC_URL + "person-circle.svg"} alt="profile" style={{ height: '100%', maxHeight: '25vh' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="col-md-12 mb-2">
                                <p className="card-text fs-6"><span className="fw-semibold">Name: &nbsp;</span>{userInfo.name}</p>
                            </div>
                            <div className="col-md-12 mb-2">
                                <p className="card-text fs-6"><span className="fw-semibold">Email: &nbsp;</span>{userInfo.email}</p>
                            </div>
                            {userInfo.createdAt &&
                                (<div className="col-md-12 mb-2">
                                    <p className="card-text fs-6"><span className="fw-semibold">Created on: &nbsp;</span>{userInfo.createdAt.slice(0, 10)}</p>
                                </div>)
                            }
                            <div className="col-md-12 mb-2">
                                <p className="card-text fs-6"><span className="fw-semibold">ID: &nbsp;</span>#{userInfo._id}</p>
                            </div>
                            <br />
                            <div className="col-md-12 mb-1 ">
                                <h5 className="card-text fs-6"><Link className="text-indigo text-decoration-none" to="/edit-profile"><i class="bi bi-pencil-square"></i> &nbsp;  Update Profile</Link></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterScreen />
        </section>
    );
}

export default ProfileScreen;