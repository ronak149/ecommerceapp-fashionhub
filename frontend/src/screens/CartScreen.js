import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import './CartScreen.css';

const CartScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const cartItems = state.cart.cartItems;

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
        <section id="cart-container" className="container-fluid cart-container">
            <header className="cart-container-header">
                <h1>Shopping Cart</h1>
            </header>
            <div className="d-flex flex-row justify-content-around flex-wrap align-content-around">
                
                        { cartItems.length === 0 ?<h5 className="card-title">Cart empty... <Link to="/">Continue Shopping</Link></h5> :
                            (  
                                <div className="cart-items-container rounded">

                                { cartItems.map((product) => (
                                    <div key={product.slug}>
                                    <hr />
                                    <div className="card shadow cart-item-card" style={{height: '100%'}}>
                                        <div className="row">
                                            <div className="col-4 card-image-container" style={{textAlign: 'center'}}>
                                                <img className="" src={`products/${product.src}`} alt={product.title} style={{height: '100%', width: '100%'}} />
                                            </div>
                                            <div className="col-8 d-flex flex-column justify-content-between card-body" >
                                                <div className="row">
                                                    <div className="col-10">
                                                        <h5 className="card-title">{product.title}</h5>
                                                    </div>
                                                    <div className="col-2">
                                                        <button className="btn" onClick={() => removeFromCartHandler(product)} style={{color: 'black'}}><h5><i className="bi bi-x-lg"></i></h5></button>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div >
                                                        <p className="card-text" style={{color: 'grey'}}>{product.color}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <h5>
                                                        <button className="btn" onClick={() => updateQuantityHandler(product, product.quantity - 1)} disabled={product.quantity === 1}><i className="h5 bi bi-dash-square-fill"></i></button> {' '}
                                                        <span>{product.quantity}</span> {' '}
                                                        <button className="btn"  onClick={() => updateQuantityHandler(product, product.quantity + 1)} disabled={product.quantity === product.quantityInStock}><i className="h5 bi bi-plus-square-fill"></i></button>
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-8">
                                                    {product.quantity === product.quantityInStock ? <i className="bi-slash-circle danger" style={{color: 'red'}}><span style={{fontWeight: '400', color: 'grey', fontSize: '0.8rem'}}> {' '}Item out of stock</span></i> : <i className="bi bi bi-check2-circle" style={{color: '#00c900'}}><span style={{fontWeight: '400', color: 'grey', fontSize: '1rem'}}>  {' '} In Stock</span></i>}
                                                    </div>
                                                    <div className="col-4">
                                                        <h5>$ {product.price}.00</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    </div>
                                ))}
                            </div>
                            )
                        }

                <div className="cart-summary-container">
                    <table className="table table-light rounded shadow">
                        <thead>
                            <tr>
                            <th scope="col">Order Summary</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)}{' '}items): </th>
                                <td>$ {(cartItems.reduce((a,c) => a + c.price * c.quantity, 0)).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Tax:</th>
                                <td>$ {(cartItems.reduce((a,c) => a + c.price * c.quantity, 0) * 0.13).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Shipping:</th>
                                <td>$ {cartItems.length ? (10.00).toFixed(2) : (0.00).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Order Total:</th>
                                <td>$ { cartItems.length ?
                                ((cartItems.reduce((a,c) => a + c.price * c.quantity, 0)) + (cartItems.reduce((a,c) => a + c.price * c.quantity, 0) * 0.13) + 10).toFixed(2) : (0).toFixed(2)} </td>
                            </tr>
                            <tr>
                                <td ><br /></td>
                                <td><br/></td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                <button className="btn btn-outline-primary shadow" type="button" style={{width: '100%'}} onClick={() => checkoutHandler()} disabled={cartItems.length === 0}>Checkout <i className="bi bi-arrow-right"></i></button>
                                </th>
                            </tr>
                        </tfoot>
                        
                    </table>
                </div>
            </div>
        </section>
    );
}

export default CartScreen;