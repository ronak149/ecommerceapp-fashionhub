import React from 'react';
import { Link } from 'react-router-dom';
import FooterScreen from './FooterScreen.js';


const MensProductsScreen = () => {

  return (
    <main className='m-0'>
      <section className="row g-2 m-0 mt-2 p-3">
        <br />
        <h3 className="fw-semibold">Shop by Category:</h3>
              <div className="row g-3 m-0 p-2 text-center pt-0">
                <div className="col-md-3 text-center p-2 pt-0" >
                  <div className="card shadow m-auto p-0 m-auto cardWidth" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men">
                        <img src={process.env.PUBLIC_URL + "/assets/mens-new-arrivals.jpg"} alt='new-arrivals' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">New Arrivals</p>
                      <Link to="/search?&gender=Men" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 p-2 pt-0" >
                  <div className="card shadow m-auto p-0 cardWidth" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men&category=T-Shirts">
                        <img src={process.env.PUBLIC_URL + "/assets/mens-basic-tees.jpg"} alt='basic-tees' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">Basic Tees</p>
                      <Link to="/search?&gender=Men&category=T-Shirts" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 p-2 pt-0" >
                  <div className="card shadow m-auto p-0 cardWidth" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men&category=Footwear">
                        <img src={process.env.PUBLIC_URL + "/assets/mens-footwear.jpg"} alt='footwear' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">Footwear</p>
                      <Link to="/search?&gender=Men&category=Footwear" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 p-2 pt-0" >
                  <div className="card shadow m-auto p-0 cardWidth" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men&category=Accessories">
                        <img src={process.env.PUBLIC_URL + "/assets/mens-accessories.jpg"} alt='accessories' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">Accessories</p>
                      <Link to="/search?&gender=Men&category=Accessories" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 p-2">
                  <div className="card shadow m-auto p-0" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men&collection=Fall">
                        <img src={process.env.PUBLIC_URL + "/assets/new-arrivals.jpg"} alt='new-arrivals' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">Fall Collection is finally here</p>
                      <Link to="/search?&gender=Men&collection=Fall" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 p-2">
                  <div className="col-12 mt-2" style={{ maxHeight: '40vh' }}>
                    <div className="row text-center" >
                      <h5 className="fw-bold mb-4 "><u>Shop Men's</u></h5>
                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Clothing</h6>
                        <Link to="/search?&gender=Men&category=T-Shirts" className="category-links d-block mb-2">T-Shirts</Link>
                        <Link to="/search?&gender=Men&category=Hoodies" className="category-links d-block mb-2">Hoodies</Link>
                        <Link to="/search?&gender=Men&category=Pants" className="category-links d-block mb-2">Pants</Link>
                        <Link to="/search?&gender=Men&category=Shorts" className="category-links d-block mb-2">Shorts</Link>
                      </div>

                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Accessories</h6>
                        <Link to="/search?&gender=Men&category=Accessories" className="category-links d-block mb-2">Caps</Link>
                        <Link to="/search?&gender=Men&category=Accessories" className="category-links d-block mb-2">Belts</Link>
                        <Link to="/search?&gender=Men&category=Accessories" className="category-links d-block mb-2">Beanie</Link>
                        <Link to="/search?&gender=Men&category=Accessories" className="category-links d-block mb-2">Bags</Link>
                      </div>

                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Footwear</h6>
                        <Link to="/search?&gender=Men&category=Footwear" className="category-links d-block mb-2">Shoes</Link>
                        <Link to="/search?&gender=Men&category=Footwear" className="category-links d-block mb-2">Sandals</Link>
                        <Link to="/search?&gender=Men&category=Footwear" className="category-links d-block mb-2">Slippers</Link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

        <br />
        <FooterScreen />
      </section>
    </main>
  );
}

export default MensProductsScreen;