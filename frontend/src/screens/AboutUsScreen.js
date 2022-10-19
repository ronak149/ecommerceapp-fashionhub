import React from 'react';
import { Link } from 'react-router-dom';
import FooterScreen from './FooterScreen';

const AboutUsScreen = () => {
    return (
        <main>
            <section className="row m-0" >
                <div className="col-md-6 m-0 p-0  text-center">
                    <div className="row align-items-center" style={{ height: '100%' }}>
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <h2 className="fw-semibold mb-4 border-bottom border-secondary d-inline-block lh-base">Our Story</h2>
                            <p className="lh-base text-secondary"> In 2021, we started Blue Tagged Clothing to disrupt the overpriced and outdated models of the fashion industry. Empowered by the people through crowdfunding, our original watch line set us apart by bringing you quality, minimalist designs at radically fair prices. Through social media we grew far beyond our Los Angeles home, becoming a global community of 1.5 million MVMT owners (and counting).
                                We're inspired by the go-getters, the innovators, the dreamers; and our designs embody this very spiril. They're built for adventuring. creating and daring to disrupt the norm
                                Above all else, we create with the dream of enlivening our ultimate mission: to inspire you to live life on your own terms. <br /> <br />
                                We are committed to responsible, sustainable, and ethical manufacturing. Our small-scale approach allows us to focus on quality and reduce our impact. We are doing out best to serve you anf fulfill all your clothing needs.</p>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <img className="mb-3" src={process.env.PUBLIC_URL + "/logo-full.PNG"} alt="Blue Tagged Logo" width="200" height="175" />
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
                <div className="col-md-6 p-2 overflow-hidden rounded">
                    <img src={process.env.PUBLIC_URL + '/assets/womens-new-arrivals.jpg'} alt="Hero" className="img-fluid rounded m-2 p-2 shadow" />
                </div>
            </section>

            <section className="row p-2 g-2" style={{ backgroundColor: '#311b9215' }}>
                <h3 className="fw-semibold text-center mt-2 "><br />Our Promise<br /> <br /> </h3>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-6 p-3">
                            <h6 className="text-center mb-2"><i class="bi fs-1 bi-award fw-semibold text-indigo"></i></h6>
                            <h6 className="text-center fs-5 mb-2 fw-semibold text-indigo">Best Quality</h6> <br />
                            <p className="text-center">Its our promise to you to serve you with the premium quality material</p>
                        </div>

                        <div className="col-6 p-3">
                            <h6 className="text-center mb-2"><i class="bi fs-1 bi-gift fw-semibold text-indigo"></i></h6>
                            <h6 className="text-center fs-5 mb-2 fw-semibold text-indigo">Rewards</h6><br />
                            <p className="text-center">Looking for a deal? Sign up for our rewards program and get discounts</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-6 p-3">
                            <h6 className="text-center mb-2"><i class="bi bi-truck fw-semibold text-indigo fs-1"></i></h6>
                            <h6 className="text-center fs-5 mb-2 fw-semibold text-indigo">Express Shipping</h6><br />
                            <p className="text-center">Get timely delivery with our express shipping and get free delivery on orders over $100</p>
                        </div>

                        <div className="col-6 p-3">
                            <h6 className="text-center mb-2"><i class="bi fs-1 bi-bookmark-star fw-semibold text-indigo"></i></h6>
                            <h6 className="text-center fs-5 mb-2 fw-semibold text-indigo">Gaurantee</h6><br />
                            <p className="text-center">Not what you expected? We have got you covered with our 30 day Money Back Gaurantee</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="row shadow m-2  g-2 p-2" style={{ backgroundColor: '#311b9215' }}>
                <br />
                <br />
                <h4 className="fw-bold">Get in touch: </h4>
                <div className='col-md-3 card p-3' style={{ backgroundColor: '#311b9215' }}>
                    <p className="card-title">Contact Information</p>
                    <p className="card-text">Have questions? Get in touch with us. We have dedicated employees who are available to help you provide answers that you are looking for. <br /> <br />  We promis we will get back to you within 24 hours</p>
                    <br />
                    <p className="fs-6"><i class="bi bi-telephone"></i> &nbsp; +1 123-456-7890</p>
                    <p className="fs-6"><i class="bi bi-envelope"></i> &nbsp; info@btaggedclothing.com</p>
                    <div className="d-flex justify-content-center justify-content-lg-between p-2">
                        <Link to="" className="me-4 text-decoration-none text-indigo">
                            <i className="bi bi-facebook fs-5"></i>
                        </Link>
                        <Link to="" className="me-4 text-decoration-none text-indigo">
                            <i className="bi bi-twitter fs-5"></i>
                        </Link>
                        <Link to="" className="me-4 text-decoration-none text-indigo">
                            <i className="bi bi-instagram fs-5"></i>
                        </Link>
                        <Link to="" className="me-4 text-decoration-none text-indigo">
                            <i className="bi bi-linkedin fs-5"></i>
                        </Link>
                    </div>
                </div>
                <div className="col-md-9 px-4 g-2">
                    <p className="fs-5 fw-semibold">Send us a message:</p>
                    <div class="row g-3">
                        <div class="col mb-2">
                            <label for="contact-fname" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="contact-fname" placeholder="First name" aria-label="First name" />
                        </div>
                        <div class="col mb-2">
                            <label for="contact-lname" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="contact-lname" placeholder="Last name" aria-label="Last name" />
                        </div>
                    </div>
                    <br />
                    <div class="row g-3">
                        <div class="col mb-2">
                            <label for="contact-email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="contact-email" placeholder="Email" aria-label="Email" />
                        </div>
                        <div class="col mb-2">
                            <label for="contact-phnumber" class="form-label">Phone Number</label>
                            <input type="number" class="form-control" id="contact-phnumber" placeholder="Phone Number" aria-label="Phone Number" />
                        </div>
                    </div>
                    <br />
                    <div class="row mb-2">
                        <div class="col mb-2">
                            <label for="contact-subject" class="form-label">Subject</label>
                            <input type="text" class="form-control" id="contact-subject" placeholder="Subject" aria-label="Subject" />
                        </div>
                    </div>
                    <br />
                    <div class="row mb-2">
                        <div class="col mb-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="row mb-2 p-2 text-center d-inline-block float-end"><button className="btn-outline rounded d-inline-block">Submit</button></div>
                </div>
            </section>
            <FooterScreen />
        </main>
    )
}

export default AboutUsScreen;