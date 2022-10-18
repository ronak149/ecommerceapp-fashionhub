import React from 'react';

const ShippingSteps = (props) => {
    const { value, createdAt, shippedOn, deliveredOn, isShipped, isDelivered } = props;

    return (
        <>
            <div class="progress">
                <div class="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${value}%` }} ></div>
            </div>
            <div className="row mt-2 m-1 text-center">
                <div className="col-4">
                    <p className={value <= 50 ? 'card-text fw-semibold text-indigo' : 'card-text fw-semibold'}>{isShipped && (<i class="text-indigo fw-semibold bi bi-check-circle-fill"></i>)} &nbsp; {(isShipped || isDelivered) ? 'Processed' : 'Processing'}</p>
                    {createdAt && (<p className="card-text fw-semibold">{createdAt.slice(0, 10)}</p>)}
                </div>
                <div className="col-4">
                    <p className={value === 50 ? 'card-text fw-semibold text-indigo' : 'card-text fw-semibold'}>{isShipped && (<i class="text-indigo fw-semibold bi bi-check-circle-fill"></i>)} &nbsp; Shipped</p>
                    {isShipped && shippedOn && (<p className="card-text fw-semibold">{shippedOn.slice(0, 10)}</p>) }
                </div>
                <div className="col-4">
                    <p className={value > 50 ? 'card-text fw-semibold text-indigo' : 'card-text fw-semibold'}>{isDelivered && (<i class="text-indigo fw-semibold bi bi-check-circle-fill"></i>)} &nbsp; Delivered</p>
                    {isDelivered && deliveredOn && (<p className="card-text fw-semibold">{deliveredOn.slice(0, 10)}</p>)}
                </div>
            </div>
        </>
    )
}

export default ShippingSteps;