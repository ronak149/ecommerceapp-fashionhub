import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, users: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true, successDelete: false }
        case 'DELETE_SUCCESS':
            return { ...state, loadingDelete: false, successDelete: true };
        case 'DELETE_FAIL':
            return { ...state, loadingDelete: false, successDelete: false };
        case 'DELETE_RESET':
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
}

const UserListScreen = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const [{ users, loading, error, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
        users: [],
        loading: false,
        error: '',
        successDelete: false,
        loadingDelete: false
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get('/api/users', {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }
        fetchData();
    }, [userInfo, successDelete]);

    const deleteUserHandler = async (user) => {
        if (window.confirm('WARNING: User will be deleted !')) {
            try {
                dispatch({ type: 'DELETE_REQUEST' });
                await axios.delete(`/api/users/${user._id}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                toast.success('User deleted successfully');
                dispatch({ type: 'DELETE_SUCCESS' })
            }
            catch (err) {
                toast.error(err.message);
                dispatch({ type: 'DELETE_FAIL' });
            }
        }
    }

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        navigate('/SignIn');
    }

    return (
        <section>
            <div className="row m-2 mt-0  g-2 shadow">
                <span className='m-0 p-0 text-start'><button class="btn text-indigo d-lg-none fw-semibold fs-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"> Profile: &nbsp; <i class="bi fs-4 bi-person-circle"></i></button></span>
                <div class="col-md-2 offcanvas-lg offcanvas-start m-0 border-end" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-block p-1">
                        <div class="d-flex align-items-start">
                            <div class="nav flex-column nav-pills m-2">
                                <ul className="list-group list-group-flush px-2">
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/admin/dashboard" type="button"><i class="fs-6 bi bi-clipboard-data"></i> &nbsp;Dashboard</Link></li>
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/admin/productlist" type="button"><i class="fs-6 bi bi-handbag"></i> &nbsp; Products</Link></li>
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/admin/orderlist" type="button"><i class="fs-6 bi bi-box-seam"></i> &nbsp; Orders</Link></li>
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded sidenav-active" to="/admin/userlist" type="button"><i class="fs-6 bi bi-people"></i> &nbsp; Customers</Link></li>
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded" onClick={signoutHandler} to="" type="button"><i class="fs-6 bi bi-box-arrow-left"></i> &nbsp; Sign Out</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-10 p-3">
                    <h4 className='fw-bold mt-2'>Users: </h4>
                    <form className="row mb-3 text-center" role="search">
                        <div className="col-2"></div>
                        <div className="col-8"><input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                        <div className="col-2"></div>
                    </form>
                    {
                        loading ? (
                            <h5 className="text-secondary">Loading</h5>
                        ) : error ? (
                            <h5 className="text-secondary">{error}</h5>
                        ) : (
                            <>
                                <table className="table rounded border table-hover table-light text-center shadow">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Admin</th>
                                            <th>Created On</th>
                                            <th >Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, i) => (
                                            <>
                                                <tr key={user._id}>
                                                    <th className="align-middle" scope="row">{i+1}</th>
                                                    <td className="align-middle">{user.name}</td>
                                                    <td className="align-middle">{user.email}</td>
                                                    <td className="align-middle">{user.isAdmin ? (<p className="card-text fw-semibold"  style={{color: '#00c900'}}><i class="bi bi-check-circle-fill"></i> &nbsp; YES</p>) : (<p className="card-text fw-semibold text-danger" ><i class="bi bi-check-circle-fill"></i> &nbsp; NO</p>)}</td>
                                                    <td className="align-middle">{user.createdAt.slice(0, 10)}</td>
                                                    {/* <td className="align-middle">
                                                        <button className="btn rounded p-0 m-0" onClick={() => navigate(`/user/${user._id}`)}><i class="bi bi-pencil-square"></i></button>
                                                    </td> */}
                                                    <td className="align-middle">
                                                        <button className="btn rounded p-0 m-0" onClick={() => deleteUserHandler(user)}><i class="bi bi-trash3"></i> </button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )

                    }
                </div>
            </div>
        </section>
    )
}

export default UserListScreen;