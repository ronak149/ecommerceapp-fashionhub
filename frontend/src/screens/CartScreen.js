import './CartScreen.css';

const CartScreen = () => {

    return (
        <section id="cart-container" className="container-fluid cart-container">
            <header className="cart-container-header">
                <h1>Shopping Cart</h1>
            </header>
            <div className="d-flex flex-row justify-content-around flex-wrap align-content-around">
                <div className="cart-items-container rounded">
                    <hr />
                    <div class="card" style={{height: '30vh'}}>
            <div class="row">
                <div class="col-4" style={{textAlign: 'center'}}>
                    <img class="" src='../Mens-BasicT-Black.jpg' alt="Card image" style={{height: '30vh', width: '25vh'}} />
                </div>
                <div class="col-8 d-flex flex-column justify-content-between card-body" >
                    <div class="row">
                        <div class="col-10">
                            <h5 class="card-title">T-Shirt</h5>
                        </div>
                        <div class="col-2">
                        <a href="/" style={{color: 'black'}}><h5><i class="bi bi-x-lg"></i></h5></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <p class="card-text" style={{color: 'grey'}}>Black</p>
                        </div>
                        <div class="col-6">
                            <label for="quantity" className="form-select-label">Qty: </label>
                                                <select className="form-select form-select-sm" name="quantity" id="quantity">
                                                    <option value="volvo">1</option>
                                                    <option value="saab">2</option>
                                                    <option value="opel">3</option>
                                                    <option value="audi">4</option>
                                                </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <i class="bi bi bi-check2-circle" style={{color: '#00c900'}}><span style={{fontWeight: '400', color: 'grey', fontSize: '1rem'}}>In Stock</span></i>
                        </div>
                        <div class="col-4">
                            <h5>$25.00</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    <hr />
                </div>
                <div className="cart-summary-container rounded shadow">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Order Summary</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Subtotal</th>
                                <td>$25.00</td>
                            </tr>
                            <tr>
                                <th>Tax</th>
                                <td>$3.25</td>
                            </tr>
                            <tr>
                                <th>Shipping</th>
                                <td>$5.00</td>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Order Total</th>
                                <td>$33.25</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default CartScreen;