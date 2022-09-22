
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: '#adb5bd'}}>
          <div className="container-fluid">
            <a className="navbar-brand logo" href="#">Fashion Hub</a>
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
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-secondary" type="submit"><i class="bi bi-search"></i></button>
                <button className="btn btn-secondary" type="button"><i class="bi bi-person"></i></button>
                <button className="btn btn-secondary" type="button"><i class="bi bi-bag"></i></button>
              </form>
            </div>
          </div>
        </nav>
        <p>Test</p>
      </header>
    </div>
  );
}

export default App;
