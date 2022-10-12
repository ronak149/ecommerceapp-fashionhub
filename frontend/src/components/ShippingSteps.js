import React from 'react';

const ShippingSteps = (props) => {
    const { value, createdAt, shippedOn, deliveredOn, isShipped, isDelivered } = props;

    return (
        <>
            { createdAt ? 
            (<p className="card-text col-7 fw-semibold">Processed on: &nbsp; {createdAt.slice(0,10)}</p>)
            : (<> </>)}

            { isShipped ? 
            (<p className="card-text col-8 fw-semibold">Shipped on: &nbsp; {shippedOn.slice(0,10)}</p>) 
            : (<> </>)}

            { isDelivered ? 
            (<p className="card-text col-8 fw-semibold">Delivered on: &nbsp; {deliveredOn.slice(0,10)}</p>) 
            : (<> </>)}

            <div class="progress">
                <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: `${value}%`}} ></div>
            </div>
            <div className="row mt-2 m-1 text-center">
                <div className="col-4"><p className={ value <= 50 ? 'card-text fw-semibold text-indigo' : 'card-text fw-semibold'}>Processing</p></div>
                <div className="col-4"><p className={ value === 50 ? 'card-text fw-semibold text-indigo' : 'card-text fw-semibold'}>Shipped</p></div>
                <div className="col-4"><p className={ value > 50 ? 'card-text fw-semibold text-indigo' : 'card-text fw-semibold'}>Delivered</p></div>
            </div>
            <br />
        </>
    )
}

export default ShippingSteps;