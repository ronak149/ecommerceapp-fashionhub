import './CartScreen.css';

const CartScreen = () => {

    return (
        <section id="cart-container" className="container-fluid cart-container">
            <header className="cart-container-header">
                <h1>Shopping Cart</h1>
            </header>
            <div className="d-flex flex-row justify-content-around flex-wrap align-content-around">
                <div className="cart-items-container">
                    <hr />
                    <div className="cart-item-card">
                        <div className="card-image-container">
                            <img src="Slippers-Black.jpg" className="card-image cart-item-image" alt="" />
                        </div>
                        <div className="cart-item-body">
                            <div className="">
                                <div className="cart-item-header">
                                    <div>
                                    <p>Fuzzy Slippers</p>
                                    </div>
                                    <div>
                                        <label for="quantity">Qty: </label>
                                        <select name="quantity" id="quantity">
                                            <option value="volvo">1</option>
                                            <option value="saab">2</option>
                                            <option value="opel">3</option>
                                            <option value="audi">4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="cart-summary-container">
                Column
                </div>
            </div>
        </section>
    );
}

export default CartScreen;