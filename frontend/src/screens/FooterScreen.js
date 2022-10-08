import React from "react";
import { Link } from "react-router-dom";

const FooterScreen = () => {
    return (
        <footer className="text-center text-lg-start ">
            <hr />
            <section className="d-flex justify-content-center justify-content-lg-between p-2">
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>
                <div>
                    <Link to="" className="me-4 ">
                        <i className="bi bi-facebook fs-5"></i>
                    </Link>
                    <Link to="" className="me-4 ">
                        <i className="bi bi-twitter fs-5"></i>
                    </Link>
                    <Link to="" className="me-4 ">
                        <i className="bi bi-instagram fs-5"></i>
                    </Link>
                    <Link to="" className="me-4 ">
                        <i className="bi bi-linkedin fs-5"></i>
                    </Link>
                </div>
            </section>

            <hr />

            <section className="">
                <div className="container text-center text-md-start">
                    <div className="row ">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-3 text-center">
                            <img className="mb-3" src={process.env.PUBLIC_URL + "/logo-full.png"} alt="Blue Tagged Logo" width="160" height="135" />
                            <p>
                                Exclusive store for branded clothing and accessories.
                            </p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-3 ">
                            <h6 className="fw-semibold mb-4 ">
                                Products
                            </h6>
                            <p>
                                <Link to="/Mens">Mens</Link>
                            </p>
                            <p>
                                <Link to="/womens">Womens</Link>
                            </p>
                            <p>
                                <Link to="/Sale">Sale</Link>
                            </p>
                        </div>
                        
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-3">
                            <h6 className="fw-semibold mb-4 ">Contact</h6>
                            <p>
                                <i class="bi bi-house-fill">{' '}</i>
                                &nbsp; Etobicoke, Ontario, CA
                            </p>
                            <p>
                                <i class="bi bi-envelope-fill">{' '}</i>
                                &nbsp; info@fhub.com
                            </p>
                            <p>
                                <i class="bi bi-telephone-fill"> {' '} </i>
                                &nbsp; + 01 234 567 89
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            <div className="text-center p-4">
                © 2022 Copyright: {' '}
                <Link className="" to="/">{' '} fhub.com</Link>
            </div>

        </footer>

    );
}

export default FooterScreen;
