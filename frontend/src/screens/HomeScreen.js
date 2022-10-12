import { Link } from "react-router-dom";

const HomeScreen = () => {

    return (
        <main>
          <section className="row m-2">
            <div className="col-md-6 text-center">
              <div className="row align-items-center" style={{height: '100%'}}>
              <div className="col-md-1"></div>
                <div className="col-md-10">
                  <h1 className="fs-1 fw-bold mb-4">Summer styles are finally here</h1>
                  <p className="mb-4">Checkout our new summer collection that has been specially selected for your comfort and fit. </p>
                  <Link className="btn pt-2 mx-3 mb-4" style={{backgroundColor: '#311b92', color: 'white', fontSize: '0.8rem', height: '2.5rem', width: '10rem'}} to="/Mens">Shop Men's</Link>
                  <Link className="btn pt-2 mx-3 mb-4" style={{backgroundColor: '#311b92', color: 'white', fontSize: '0.8rem', height: '2.5rem', width: '10rem'}} to="/Womens">Shop Women's</Link>
                </div>
                <div className="col-md-1"></div>
              </div>
              </div>
              <div className="col-md-6 text-center">
                <img src={process.env.PUBLIC_URL + '/assets/hero-image.png'} alt="Hero" className="img-fluid"/>
              </div>
            </section>

          <hr />

          <section className="row m-1">
            <br />
            <br />
            <h5 className="fw-bold">Shop by Category: </h5>
              <div className="col-md-6">
                <div className="row">
                <div className="col-md-12 p-2">
                  <div className="card" style={{maxHeight: '40vh'}}>
                    <div className="overflow-hidden">
                      <img src={process.env.PUBLIC_URL + "./assets/new-arrivals.jpg"} alt="New Arrivals" className="img-fluid"/>
                    </div>
                    <div className="card-img-overlay p-0">
                      <div className="position-absolute bottom-0 bg-light opacity-75 px-4 py-2 text-center" style={{width: '100%'}}>
                        <h5 className="card-title m-0">New Arrivals</h5>
                        <div className="row text-center">
                          <div className="col-6">
                            <Link className="category-links d-block fs-6" to="/Mens"><small>Shop Mens</small></Link>
                          </div>
                          <div className="col-6">
                            <Link className="category-links d-block fs-6" to="/Womens"><small>Shop Womens</small></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>                  
                </div>
                <div className="col-md-6 p-2" style={{maxHeight: '40vh'}}>
                  <div className="card" >
                    <div className="overflow-hidden rounded">
                      <img src={process.env.PUBLIC_URL + "./assets/footwear.jpg"} alt="New Arrivals" className="img-fluid"/>
                    </div>
                    <div className="card-img-overlay p-0">
                      <div className="position-absolute bottom-0 bg-light opacity-75 px-4 py-2 text-center" style={{width: '100%'}}>
                        <h5 className="card-title m-0">Footwear</h5>
                        <div className="row text-center">
                          <div className="col-6">
                            <Link className="category-links d-block fs-6" to="/Mens"><small>Mens</small></Link>
                          </div>
                          <div className="col-6">
                            <Link className="category-links d-block fs-6" to="/Womens"><small>Womens</small></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>                  
                </div>
                <div className="col-md-6 p-2" style={{maxHeight: '40vh'}}>
                  <div className="card">
                    <div className="overflow-hidden rounded">
                      <img src={process.env.PUBLIC_URL + "./assets/accessories.jpg"} alt="New Arrivals" className="img-fluid"/>
                    </div>
                    <div className="card-img-overlay p-0">
                      <div className="position-absolute bottom-0 bg-light opacity-75 px-4 py-2 text-center" style={{width: '100%'}}>
                        <h5 className="card-title m-0">Accessories</h5>
                        <div className="row text-center">
                          <div className="col-6">
                            <Link className="category-links d-block fs-6" to="/Mens"><small>Mens</small></Link>
                          </div>
                          <div className="col-6">
                            <Link className="category-links d-block fs-6" to="/Womens"><small>Womens</small></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>                  
                </div>
              </div>
              </div>
              <div className="col-md-6 p-2">
                <div className="col-12 mt-2" style={{maxHeight: '40vh'}}>
                  <div className="row text-center" >
                    <h5 className="fw-bold mb-4 "><u>Shop Men's</u></h5>            
                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Clothing</h6>
                          <Link to="/Mens" className="category-links d-block mb-2">Basic Tees</Link>
                          <Link to="/Mens" className="category-links d-block mb-2">Hoodies</Link>
                          <Link to="/Mens" className="category-links d-block mb-2">Pants</Link>
                          <Link to="/Mens" className="category-links d-block mb-2">Shorts</Link>
                      </div>
                      
                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Accessories</h6>
                          <Link to="/Mens" className="category-links d-block mb-2">Caps</Link>
                          <Link to="/Mens" className="category-links d-block mb-2">Belts</Link>
                          <Link to="/Mens" className="category-links d-block mb-2">Beanie</Link>
                          <Link to="/Mens" className="category-links d-block mb-2">Bags</Link>
                      </div>
            
                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Footwear</h6>
                          <Link to="/Mens" className="category-links d-block mb-2">Shoes</Link>
                          <Link to="/Mens" className="category-links d-block mb-2">Sandals</Link>
                          <Link to="/Mens" className="category-links d-block mb-2">Slippers</Link>
                      </div>            
                  </div>                  
                </div>

                <div className="col-12 mt-2" style={{maxHeight: '40vh'}}>
                  <div className="row text-center" >
                    <h5 className="fw-bold mb-4 "><u>Shop Women's</u></h5>            
                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Clothing</h6>
                          <Link to="/Womens" className="category-links d-block mb-2">Basic Tees</Link>
                          <Link to="/Womens" className="category-links d-block mb-2">Hoodies</Link>
                          <Link to="/Womens" className="category-links d-block mb-2">Pants</Link>
                          <Link to="/Womens" className="category-links d-block mb-2">Shorts</Link>
                      </div>
                      
                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Accessories</h6>
                          <Link to="/Womens" className="category-links d-block mb-2">Caps</Link>
                          <Link to="/Womens" className="category-links d-block mb-2">Belts</Link>
                          <Link to="/Womens" className="category-links d-block mb-2">Beanie</Link>
                          <Link to="/Womens" className="category-links d-block mb-2">Bags</Link>
                      </div>
            
                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Footwear</h6>
                          <Link to="/Womens" className="category-links d-block mb-2">Shoes</Link>
                          <Link to="/Womens" className="category-links d-block mb-2">Sandals</Link>
                          <Link to="/Womens" className="category-links d-block mb-2">Slippers</Link>
                      </div>            
                  </div>                  
                </div>
              </div>
            <br />
            <br />
          </section>

          <hr />

          <section className="row m-1">
            <br />
              <div className="col-12">
              <div className="card p-0 ">
                <div className="overflow-hidden rounded" >
                  <img src={process.env.PUBLIC_URL + "/assets/wardrobe.JPG"} alt="Wardrobe" className="img-fluid rounded"/>
                </div>
                <div className="card-img-overlay m-1 p-0">
                        <div className="row text-center align-items-center" style={{width: '100%', height: '100%'}}>
                            <div className="col-12 m-2">
                              <h5 className="card-text mb-3 text-white fs-4 fw-bold">Wardrobe Essentials</h5>
                              <p className="m-1 text-white">We are committed to responsible, sustainable, and ethical manufacturing.</p>
                              <p className="m-1 text-white"> Fill your wardrobe with our selected quality products. </p>
                              <Link className="btn pt-2 mt-3" style={{backgroundColor: '#311b92', color: 'white', fontSize: '0.8rem', height: '2.3rem', width: '8rem', margin: '0 1rem 0 0'}} to="/Mens">Shop Men's</Link>
                              <Link className="btn pt-2 mt-3" style={{backgroundColor: '#311b92', color: 'white', fontSize: '0.8rem', height: '2.3rem', width: '8rem'}} to="/Womens">Shop Women's</Link>
                            </div>
                        </div>
                </div>
              </div>
              </div>
            <br />
          </section>

          <section>
            <hr />
            <br />
            <div className="row px-4 py-2 align-items-center text-center" style={{backgroundColor: '#202938'}}>
              <div className="col-md-1"></div>
              <div className="col-md-5 text-white">
                <h3 className="fw-bold">Sale</h3>
                <h3 className="fw-bold">Upto 50% off.</h3>
                <small>- on selected products</small>
                <p className="m-2"> <Link to="/Sale" className="text-white">Shop Sale<i className="bi bi-arrow-right"></i></Link> </p>
              </div>
              <div className="col-md-5">
                <div className="overflow-hidden rounded">
                  <img src={process.env.PUBLIC_URL + "/assets/sale.jpg"} alt="Wardrobe" className="img-fluid rounded"/>
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <br />
          </section>
        </main>
    );
}

export default HomeScreen;