import { data } from './data.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';

function App() {
  return (
    <Router>
    <div className="App">
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
                  <a className="nav-link" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Men's</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Women's</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Sale</a>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2 shadow" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-secondary shadow" type="submit"><i className="bi bi-search"></i></button>
                <button className="btn btn-outline-secondary shadow" type="button"><i className="bi bi-person"></i></button>
                <button className="btn btn-outline-secondary shadow" type="button"><i className="bi bi-bag"></i></button>
              </form>
            </div>
          </div>
        </nav>
        <br />
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </header>
    </div>
    </Router>
  );
}

export default App;
