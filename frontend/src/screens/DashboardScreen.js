import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import Chart from 'react-google-charts';
import LoadingProductCard from '../components/LoadingProductCard';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, dataSummary: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const DashboardScreen = () => {

    const navigate = useNavigate();

    const [{ dataSummary, loading, error }, dispatch] = useReducer(reducer, {
        dataSummary: {
            users: [],
            orders: [],
            dailyOrders: [],
        },
        loading: false,
        error: ''
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get('/api/orders/summary', {
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
    }, [userInfo]);

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        navigate('/SignIn');
    }

    return (

        <section>
            {
                loading ? (<LoadingProductCard />) : error ? <div>{error}</div> :
                    (
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
                                                <li className='list-group-item'><Link className="btn-outline-sidenav rounded sidenav-active" to="/admin/dashboard" type="button"><i className="fs-6 bi bi-clipboard-data"></i> &nbsp;Dashboard</Link></li>
                                                <li className='list-group-item'><Link className="btn-outline-sidenav rounded" to="/admin/productlist" type="button"><i className="fs-6 bi bi-handbag"></i> &nbsp; Products</Link></li>
                                                <li className='list-group-item'><Link className="btn-outline-sidenav rounded" to="/admin/orderlist" type="button"><i className="fs-6 bi bi-box-seam"></i> &nbsp; Orders</Link></li>
                                                <li className='list-group-item'><Link className="btn-outline-sidenav rounded" to="/admin/userlist" type="button"><i className="fs-6 bi bi-people"></i> &nbsp; Customers</Link></li>
                                                <li className='list-group-item'><Link className="btn-outline-sidenav rounded" onClick={signoutHandler} to="" type="button"><i className="fs-6 bi bi-box-arrow-left"></i> &nbsp; Sign Out</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10 p-3 ">
                                <h4 className='fw-bold mt-2 '>Dashboard</h4>
                                <div className="row g-4 mb-3">
                                    <div className="col-lg-4">
                                        <div className="card p-1 shadow" style={{ backgroundColor: '#0d6efd15' }}>
                                            <div className="card-body row">
                                                <div className="col-5">
                                                    <p className="card-title fs-3 fw-semibold "><i className="bi bi-people"></i></p>
                                                    <p className="card-title">{dataSummary.users && dataSummary.users[0] ? dataSummary.users[0].numUsers : 0}</p>
                                                    <p className="card-text">Customers</p>
                                                </div>
                                                <div className="col-7 p-0">
                                                    {dataSummary.dailyOrders.length === 0 ? (<h4>No sales today</h4>) :
                                                        (<Chart width="100%" chartType="LineChart" loader={<div>Loading Chart...</div>} data={[['Date', 'Customers'], ...dataSummary.dailyOrders.map((x) => ['', dataSummary.users[0].numUsers])]} options={{backgroundColor: 'transparent', vAxis: {ticks: []}}}></Chart>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card p-1 shadow" style={{ backgroundColor: '#311b9215' }}>
                                            <div className="card-body row">
                                                <div className="col-5">
                                                    <p className="card-title fs-3 fw-semibold "><i className="bi bi-box-seam"></i></p>
                                                    <p className="card-title">{dataSummary.orders && dataSummary.orders[0] ? dataSummary.orders[0].numOrders : 0}</p>
                                                    <p className="card-text">Orders</p>
                                                </div>
                                                <div className="col-7 p-0">
                                                    {dataSummary.dailyOrders.length === 0 ? (<h4>No sales today</h4>) :
                                                        (<Chart width="100%"  chartType="LineChart"  loader={<div>Loading Chart...</div>} data={[['Date', 'Orders'], ...dataSummary.dailyOrders.map((x) => ['', x.orders])]} options={{backgroundColor: 'transparent', vAxis: {ticks: []}}}></Chart>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card p-1 shadow" style={{ backgroundColor: '#fd7e1415' }}>
                                            <div className="card-body row">
                                                <div className="col-5">
                                                    <p className="card-title fs-3 fw-semibold "><i className="bi bi-coin"></i></p>
                                                    <p className="card-title">{dataSummary.orders && dataSummary.orders[0] ? '$ ' + dataSummary.orders[0].totalSales.toFixed(2) : '$' + 0}</p>
                                                    <p className="card-text">Sales</p>
                                                </div>
                                                <div className="col-7 p-0">
                                                    {dataSummary.dailyOrders.length === 0 ? (<h4>No sales today</h4>) :
                                                        (<Chart width="100%" chartType="LineChart" loader={<div>Loading Chart...</div>} data={[['Date', 'Sales'], ...dataSummary.dailyOrders.map((x) => ['', x.sales])]} options={{backgroundColor: 'transparent', vAxis: {ticks: []}}}></Chart>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <p className="fs-5 fw-semibold">Sales</p>
                                    {dataSummary.dailyOrders.length === 0 ? (<h4>No sales today</h4>) :
                                        (<Chart width="100%" height="35vh" chartType="AreaChart" loader={<div>Loading Chart...</div>} data={[['Date', 'Sales'], ...dataSummary.dailyOrders.map((x) => [x._id, x.sales])]} ></Chart>)
                                    }
                                </div>                                
                            </div>
                        </div>
                    )
            }
        </section>
    );
}

export default DashboardScreen;