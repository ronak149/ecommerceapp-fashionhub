import React from "react";

const CheckoutSteps = (props) => {
    return (
        <div>
            <div className="row checkout-steps mb-3 text-center">
                <div className={ props.step1 ? 'text-indigo active-steps col p-2' : 'text-secondary col p-2' }> Signin <input type="range" className="form-range slider" disabled={ props.step1 ? false : true} min="0" max="1"  step={0.5} value={0.5} id="checkout-steps-range" /></div>
                <div className={ props.step2 ? 'text-indigo active-steps col p-2' : 'text-secondary col p-2' }> Shipping <input type="range" className="form-range slider" disabled={ props.step2 ? false : true} min="0" max="1"  step={0.5} value={0.5} id="checkout-steps-range" /></div>
                <div className={ props.step3 ? 'text-indigo active-steps col p-2' : 'text-secondary col p-2' }> Summary <input type="range" className="form-range slider" disabled={ props.step3 ? false : true} min="0" max="1"  step={0.5} value={0.5} id="checkout-steps-range" /></div>
                <div className={ props.step4 ? 'text-indigo active-steps col p-2' : 'text-secondary col p-2' }> Order <input type="range" className="form-range slider" disabled={ props.step4 ? false : true} min="0" max="1"  step={0.5} value={0.5} id="checkout-steps-range" /></div>
            </div>
        </div>
    );
}

export default CheckoutSteps;