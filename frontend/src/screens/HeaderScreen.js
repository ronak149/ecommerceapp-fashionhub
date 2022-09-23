import { Link } from "react-router-dom";

const HeaderScreen = () => {
    return (
        <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow ">
                <div className="container-fluid" >
                    <Link className="navbar-brand logo" to="/">Fashion Hub</Link>
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
                            <button className="btn btn-secondary shadow" type="submit"><i className="bi bi-search"></i></button>
                            <button className="btn btn-outline-secondary shadow" type="button"><i className="bi bi-person"></i></button>
                            <Link className="btn btn-outline-secondary shadow" type="button" to="Cart/"><i className="bi bi-bag"></i></Link>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderScreen;