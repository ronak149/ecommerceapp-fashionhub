import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import './CartScreen.css';

const CartScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const cart = state.cart;

    cart.itemsPrice = cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0);
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
    cart.taxPrice = (0.13 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const updateQuantityHandler = async (product, quantity) => {
        const { data } = await axios.get(`/api/products/${product._id}`);
        if(data.quantityInStock < quantity) {
            window.alert('Sorry, Product out of stock');
            return;
        }
        ctxDispatch({type: 'ADD_TO_CART', payload: {...product, quantity }});
    }

    const removeFromCartHandler = (product) => {
        ctxDispatch({ type: 'REMOVE_FROM_CART', payload: product});
    }   

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }

    return (

        <div className="p-1 container-md my-2">
            
            <div className="col-md-12 mt-3 ">
                <h4 className="fw-bolder">Shopping Cart: </h4>
            </div>

            <div className="row g-2">
                <div className="col-lg-7">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-text fs-5"><strong>Items:</strong></h5> 
                            { cart.cartItems.length === 0 ? <h5 className="card-text">Cart empty... &nbsp; &nbsp;<Link className="text-indigo fs-6" to="/">&nbsp;Add Items<i class="bi bi-plus-lg"></i></Link></h5> :
                            (<ul className="list-group list-group-flush">
                                {cart.cartItems.map((item) => (
                                    <li className="list-group-item mb-2" key={item._id}>
                                        <div className="row mh-100">
                                            <div className="col-5">
                                                <img src={`/products/${item.src}`} alt={item.title} className="img-fluid rounded img-thumbnail" style={{maxHeight: '35vh'}}/>
                                            </div>
                                            <div className="col-7">
                                                <div className="row g-2">
                                                    <div className="col-9 mb-2">
                                                        <h5 className="card-text fs-6 fw-semibold">{item.title}</h5>
                                                    </div>
                                                    <div className="col-3 text-end">
                                                        <button className="btn" onClick={() => removeFromCartHandler(item)} style={{color: 'black'}}><h5><i className="bi bi-x-lg"></i></h5></button>                                                                                                                       
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <p className="card-text">{item.gender}'s | {item.color}</p>
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <h6 className='card-text'>Qty: {' '} 
                                                            <button className="btn m-0 p-0 mx-2" onClick={() => updateQuantityHandler(item, item.quantity - 1)} disabled={item.quantity === 1}><i className="h5 bi bi-dash-square-fill"></i></button> {' '}
                                                            <span>{item.quantity}</span> {' '}
                                                            <button className="btn m-0 p-0 mx-2"  onClick={() => updateQuantityHandler(item, item.quantity + 1)} disabled={item.quantity === item.quantityInStock}><i className="h5 bi bi-plus-square-fill"></i></button>
                                                        </h6>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <p className="card-text fs-6 fw-semibold">$ {(item.price).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>)}
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-text fs-5 fw-bolder">Order Summary:</h5> 
                            <ul class="list-group list-group-flush m-1">
                                <li class="list-group-item">
                                    <div className="row">
                                        <p className="card-text col-8 m-0  fw-semibold">Subtotal:</p>
                                        <p className="card-text col-4 m-0  fw-semibold">{(cart.itemsPrice).toFixed(2)}</p>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="row">
                                        <p className="card-text col-8 m-0  fw-semibold">Tax:</p>
                                        <p className="card-text col-4 m-0  fw-semibold">{(cart.taxPrice).toFixed(2)}</p>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="row">
                                        <p className="card-text col-8 m-0  fw-semibold">Shipping:</p>
                                        <p className="card-text col-4 m-0  fw-semibold">{(cart.shippingPrice).toFixed(2)}</p>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="row ">
                                        <p className="card-text col-8 m-0  fw-bolder fs-6">Order Total:</p>
                                        <p className="card-text col-4 m-0 fs-6 fw-bolder">{(cart.totalPrice).toFixed(2)}</p>
                                    </div>
                                </li>
                                <li class="list-group-item mt-2">
                                    <div className="row">
                                        <p className="card-text col-12 m-0  fw-semibold text-success">Free shipping on orders over $ 100.00</p>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="col text-center mt-4">
                                        <button className="btn-fill rounded" type="button" style={{width: '75%'}} onClick={() => checkoutHandler()} disabled={cart.cartItems.length === 0}>Checkout <i className="bi bi-arrow-right"></i></button>
                                    </div>
                                </li>
                            </ul>                 
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <section id="cart-container" className="container-fluid cart-container">
        //     <header className="cart-container-header">
        //         <h1>Shopping Cart</h1>
        //     </header>
        //     <div className="d-flex flex-row justify-content-around flex-wrap align-content-around">
                
        //                 { cartItems.length === 0 ?<h5 className="card-title">Cart empty... <Link to="/">Continue Shopping</Link></h5> :
        //                     (  
        //                         <div className="cart-items-container rounded">

        //                         { cartItems.map((product) => (
        //                             <div key={product.slug}>
        //                             <hr />
        //                             <div className="card shadow cart-item-card" style={{height: '100%'}}>
        //                                 <div className="row">
        //                                     <div className="col-4 card-image-container" style={{textAlign: 'center'}}>
        //                                         <img className="" src={`products/${product.src}`} alt={product.title} style={{height: '100%', width: '100%'}} />
        //                                     </div>
        //                                     <div className="col-8 d-flex flex-column justify-content-between card-body" >
        //                                         <div className="row">
        //                                             <div className="col-10">
        //                                                 <h5 className="card-title">{product.title}</h5>
        //                                             </div>
        //                                             <div className="col-2">
        //                                                 <button className="btn" onClick={() => removeFromCartHandler(product)} style={{color: 'black'}}><h5><i className="bi bi-x-lg"></i></h5></button>
        //                                             </div>
        //                                         </div>
        //                                         <div className="row">
        //                                             <div >
        //                                                 <p className="card-text" style={{color: 'grey'}}>{product.color}</p>
        //                                             </div>
        //                                         </div>
        //                                         <div>
        //                                             <div>
        //                                                 <h5>
        //                                                 <button className="btn" onClick={() => updateQuantityHandler(product, product.quantity - 1)} disabled={product.quantity === 1}><i className="h5 bi bi-dash-square-fill"></i></button> {' '}
        //                                                 <span>{product.quantity}</span> {' '}
        //                                                 <button className="btn"  onClick={() => updateQuantityHandler(product, product.quantity + 1)} disabled={product.quantity === product.quantityInStock}><i className="h5 bi bi-plus-square-fill"></i></button>
        //                                                 </h5>
        //                                             </div>
        //                                         </div>
        //                                         <div className="row">
        //                                             <div className="col-8">
        //                                             {product.quantity === product.quantityInStock ? <i className="bi-slash-circle danger" style={{color: 'red'}}><span style={{fontWeight: '400', color: 'grey', fontSize: '0.8rem'}}> {' '}Item out of stock</span></i> : <i className="bi bi bi-check2-circle" style={{color: '#00c900'}}><span style={{fontWeight: '400', color: 'grey', fontSize: '1rem'}}>  {' '} In Stock</span></i>}
        //                                             </div>
        //                                             <div className="col-4">
        //                                                 <h5>$ {product.price}.00</h5>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
                                   
        //                             </div>
        //                         ))}
        //                     </div>
        //                     )
        //                 }

        //         <div className="cart-summary-container">
        //             <table className="table table-light rounded shadow">
        //                 <thead>
        //                     <tr>
        //                     <th scope="col">Order Summary</th>
        //                     <th></th>
        //                     </tr>
        //                 </thead>
        //                 <tbody className="table-group-divider">
        //                     <tr>
        //                         <th></th>
        //                         <th></th>
        //                     </tr>
        //                     <tr>
        //                         <th>Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)}{' '}items): </th>
        //                         <td>$ {(cartItems.reduce((a,c) => a + c.price * c.quantity, 0)).toFixed(2)}</td>
        //                     </tr>
        //                     <tr>
        //                         <th>Tax:</th>
        //                         <td>$ {(cartItems.reduce((a,c) => a + c.price * c.quantity, 0) * 0.13).toFixed(2)}</td>
        //                     </tr>
        //                     <tr>
        //                         <th>Shipping:</th>
        //                         <td>$ {cartItems.length ? (10.00).toFixed(2) : (0.00).toFixed(2)}</td>
        //                     </tr>
        //                     <tr>
        //                         <th></th>
        //                         <th></th>
        //                     </tr>
        //                 </tbody>
        //                 <tfoot>
        //                     <tr>
        //                         <th>Order Total:</th>
        //                         <td>$ { cartItems.length ?
        //                         ((cartItems.reduce((a,c) => a + c.price * c.quantity, 0)) + (cartItems.reduce((a,c) => a + c.price * c.quantity, 0) * 0.13) + 10).toFixed(2) : (0).toFixed(2)} </td>
        //                     </tr>
        //                     <tr>
        //                         <td ><br /></td>
        //                         <td><br/></td>
        //                     </tr>
        //                     <tr>
        //                         <th colSpan="2">
        //                         <button className="btn btn-outline-primary shadow" type="button" style={{width: '100%'}} onClick={() => checkoutHandler()} disabled={cartItems.length === 0}>Checkout <i className="bi bi-arrow-right"></i></button>
        //                         </th>
        //                     </tr>
        //                 </tfoot>
                        
        //             </table>
        //         </div>
        //     </div>
        // </section>
    );
}

export default CartScreen;