import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

const HeaderScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT'});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
    }

    return (
        <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow ">
                <div className="container-fluid" >
                    <Link className="navbar-brand logo" to="/">FaShIoN HuB</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                            <Link className="nav-link" to="Sale/">Sale</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2 shadow" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary shadow" type="submit"><i className="bi bi-search"></i></button>
                            { userInfo ? 
                            (<div className="dropdown">
                                <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userInfo.name} <i class="bi bi-person-circle"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/orderHistory">Order History</Link></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#signout" onClick={signoutHandler}>Sign Out</Link></li>
                                </ul>
                            </div>) 
                            : (<Link className="btn btn-outline-primary shadow" type="button" to="/SignIn"><i className="bi bi-person"></i></Link>)}                            
                            <Link className="btn btn-outline-primary shadow position-relative" type="button" to="/cart"><i className="bi bi-bag"></i><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.cartItems.length > 0 && cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span></Link>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderScreen;