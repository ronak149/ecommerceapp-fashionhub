import React from 'react';

const LoadingProductCard = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <div className="card cardWidth" aria-hidden="true">
                        <div className="placeholder-glow">
                            <span className="placeholder col-12" style={{height: '25vh'}}></span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                            <a
                                href="#"
                                tabIndex="-1"
                                className="btn btn-primary disabled placeholder col-6"
                            ></a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card cardWidth" aria-hidden="true">
                        <div className="placeholder-glow">
                            <span className="placeholder col-12" style={{height: '25vh'}}></span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                            <a
                                href="#"
                                tabIndex="-1"
                                className="btn btn-primary disabled placeholder col-6"
                            ></a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card cardWidth" aria-hidden="true">
                        <div className="placeholder-glow">
                            <span className="placeholder col-12" style={{height: '25vh'}}></span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                                <span className="placeholder col-6"></span>
                            </h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </p>
                            <a
                                href="#"
                                tabIndex="-1"
                                className="btn btn-primary disabled placeholder col-6"
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoadingProductCard;