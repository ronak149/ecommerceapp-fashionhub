import { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";
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
            <div className="row text-white fs-6 p-2 text-center" style={{backgroundColor: '#311b92'}}><small>Get free delivery on orders over $100</small></div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <Link className="navbar-brand logo m-0 p-0" to="/"><img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="Blue Tagged Logo" width="50" height="50" /></Link>
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
                                    <Link className="nav-link" to="Sale/">Sale</Link>
                                </li>
                            </ul>
                            <SearchBox />
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <form className="d-flex align-items-center">
                                { userInfo ? 
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
                                : (<Link className="nav-link text-secondary text-decoration-none" to="/SignIn">Sign In &nbsp;<i className="bi bi-person"></i></Link>)} &nbsp; &nbsp; &nbsp; 
                                  
                                <Link className="nav-link text-secondary text-decoration-none" to="/cart">{'| '} &nbsp; &nbsp; &nbsp; &nbsp;<i className="bi bi-bag fs-6"></i> {cart.cartItems.length > 0 && cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            {cart.cartItems.length > 0 && (
                <div className="m-2 p-2 position-absolute position-fixed bottom-0 end-0 bg-transparent" style={{zIndex: '10'}}>
                    <Link className="rounded btn-outline p-3" to="/cart"> <i className="bi bi-bag fs-4"></i> {cart.cartItems.length > 0 && cart.cartItems.reduce((a, c) => a + c.quantity, 0)} </Link>
                </div>
            )}
            <hr className="mt-0 pt-0" />
        </header>
    );
}

export default HeaderScreen;