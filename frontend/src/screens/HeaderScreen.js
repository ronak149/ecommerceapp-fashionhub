import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { Store } from "../Store";

const HeaderScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const navigate = useNavigate();

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        navigate('/SignIn')
    }

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
            setShow(false); 
        } else { // if scroll up show the navbar
            setShow(true);  
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY); 
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlNavbar);

        // cleanup function
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
        }
    }, [lastScrollY]);

    return (
        <header className="App-header border-bottom p-0">
            <div className="row text-white p-2 text-center" style={{backgroundColor: '#311b92'}}><small>Get free delivery on orders over $100</small></div>
            <nav className={`navbar navbar-expand-lg navbar-light bg-white active ${show && 'hidden'}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand logo m-0 p-0" to="/"><img src={process.env.PUBLIC_URL + "/logo-image.PNG"} alt="Blue Tagged Logo" width="50" height="50" /></Link>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{width: '80vw'}}>
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="Mens/">Men's</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="Womens/">Women's</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/AboutUs">About us</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="Sale/">Sale</Link>
                                </li> */}
                            </ul>
                            <SearchBox />
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <form className="d-flex align-items-center">
                                { userInfo ? userInfo.isAdmin ? 
                                (
                                    <div className="dropdown">
                                        <Link className="nav-link text-secondary dropdown-toggle text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                                            {userInfo.name} <i className="bi bi-person-circle"></i>
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item text-secondary" to="/admin/dashboard">Dashboard</Link></li>
                                            <li><Link className="dropdown-item text-secondary" to="/admin/productlist">Products</Link></li>
                                            <li><Link className="dropdown-item text-secondary" to="/admin/orderlist">Orders</Link></li>
                                            <li><Link className="dropdown-item text-secondary" to="/admin/userlist">Users</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link className="dropdown-item text-secondary" to="/" onClick={signoutHandler}>Sign Out</Link></li>
                                        </ul>
                                    </div>
                                ) :
                                (<div className="dropdown">
                                    <Link className="nav-link text-secondary dropdown-toggle text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userInfo.name} <i className="bi bi-person-circle"></i>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item text-secondary" to="/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item text-secondary" to="/orderHistory">Order History</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item text-secondary" to="/" onClick={signoutHandler}>Sign Out</Link></li>
                                    </ul>
                                </div>) 
                                : (<span><Link className="nav-link d-inline-block text-secondary text-decoration-none" to="/SignIn">Sign in &nbsp; &nbsp; |</Link><Link className="nav-link d-inline-block text-secondary text-decoration-none" to="/SignIn">Create account</Link></span>)} 
                                &nbsp; &nbsp;                             
                                <Link className="nav-link text-secondary text-decoration-none" to="/cart"> &nbsp; &nbsp; &nbsp; <i className="fs-5 bi bi-handbag"></i> &nbsp; {cart.cartItems.length > 0 && cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            {/* {cart.cartItems.length > 0 && (
                <div className="m-2 p-2 position-absolute position-fixed bottom-0 end-0 bg-transparent" style={{zIndex: '10'}}>
                    <Link className="rounded btn-outline p-3" to="/cart"><i className="bi bi-handbag fs-4"></i>{' '} {cart.cartItems.length > 0 && cart.cartItems.reduce((a, c) => a + c.quantity, 0)} </Link>
                </div>
            )} */}
        </header>
    );
}

export default HeaderScreen;