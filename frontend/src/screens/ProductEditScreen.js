import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingProductCard from '../components/LoadingProductCard';
import { Store } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoadingButton } from '../components/LoadingBox';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL': 
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
}

const ProductEditScreen = () => {

    const [title, setTitle] = useState('');
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState('');
    const [collectionSeason, setCollectionSeason] = useState('');
    const [slug, setSlug] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [src, setSrc] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [ratings, setRatings] = useState('');
    const [onSale, setOnSale] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');

    const params = useParams();
    const { id: productId } = params;

    const navigate = useNavigate();

    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
        loading: false,
        error: ''
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/products/${productId}`);
                setTitle(data.title);
                setGender(data.gender);
                setCategory(data.category);
                setCollectionSeason(data.collectionSeason);
                setSlug(data.slug);
                setColor(data.color);
                setPrice(data.price);
                setSrc(data.src);
                setQuantityInStock(data.quantityInStock);
                setRatings(data.ratings);
                setOnSale(data.onSale);
                setDiscount(data.discount);
                setDescription(data.description);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }
        fetchData();
    }, [userInfo, productId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'UPDATE_REQUEST'});
            await axios.put(`/api/products/${productId}`,
            {
                _id: productId,
                title,
                gender,
                category,
                color,
                slug,
                price,
                src,
                quantityInStock,
                collectionSeason,
                onSale,
                discount,
                ratings,
                description,
            },
            {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            }
            );
            dispatch({ type: 'UPDATE_SUCCESS'});
            toast.success('Product updated successfully !');
        }
        catch(err) {
            toast.error('Product update failed!');
            dispatch({ type: 'UPDATE_FAIL' });
        }   
        navigate('/admin/productlist');
    }

    return (
        <section>
            <div className="row m-2 mt-0  g-2 shadow">
                <span className='m-0 p-0 text-start'><button class="btn text-indigo d-lg-none fw-semibold fs-5" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"> Profile: &nbsp; <i class="bi fs-4 bi-person-circle"></i></button></span>
                <div class="col-md-2 offcanvas-lg offcanvas-start m-0 border-end" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-block p-1">
                        <div class="d-flex align-items-start">
                            <div class="nav flex-column nav-pills m-2">
                                <ul className="list-group list-group-flush px-2">
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/admin/dashboard" type="button"><i class="fs-6 bi bi-clipboard-data"></i> &nbsp;Dashboard</Link></li>
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded sidenav-active" to="/admin/productlist" type="button"><i class="fs-6 bi bi-handbag"></i> &nbsp; Products</Link></li>
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/admin/orderlist" type="button"><i class="fs-6 bi bi-box-seam"></i> &nbsp; Orders</Link></li>
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/admin/userlist" type="button"><i class="fs-6 bi bi-people"></i> &nbsp; Customers</Link></li>
                                    <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/admin/productlist" type="button"><i class="fs-6 bi bi-box-arrow-left"></i> &nbsp; Sign Out</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-10 p-3">
                    <h4 className='fw-bold mt-2'>Edit Product: </h4>
                    <form onSubmit={submitHandler}>
                        <div className="row p-2 g-2">
                            <div className="col-md-6 p-2">
                                <label for="productTitle" class="form-label">Product Title</label>
                                <input type="text" class="form-control" id="productTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productgender" class="form-label">Gender</label>
                                <input type="text" class="form-control" id="productgender" value={gender} onChange={(e) => setGender(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productCategory" class="form-label">Category</label>
                                <input type="text" class="form-control" id="productCategory" value={category} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productCollection" class="form-label">Collection</label>
                                <input type="text" class="form-control" id="productCollection" value={collectionSeason} onChange={(e) => setCollectionSeason(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productColor" class="form-label">Color</label>
                                <input type="text" class="form-control" id="productColor" value={color} onChange={(e) => setColor(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productSlug" class="form-label">Slug</label>
                                <input type="text" class="form-control" id="productSlug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productPrice" class="form-label">Price</label>
                                <input type="number" class="form-control" id="productPrice" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productSrc" class="form-label">Image Source</label>
                                <input type="text" class="form-control" id="productSrc" value={src} onChange={(e) => setSrc(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productQuantity" class="form-label">Quantity</label>
                                <input type="number" class="form-control" id="productQuantity" value={quantityInStock} onChange={(e) => setQuantityInStock(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productRatings" class="form-label">Ratings</label>
                                <input type="number" class="form-control" id="productRatings" value={ratings} onChange={(e) => setRatings(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productSale" class="form-label">Sale</label>
                                <input type="text" class="form-control" id="productSale" value={onSale} onChange={(e) => setOnSale(e.target.value)} />
                            </div>
                            <div className="col-md-6 p-2">
                                <label for="productDiscount" class="form-label">Discount</label>
                                <input type="text" class="form-control" id="productDiscount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label for="productDesc" class="form-label">Description</label>
                                <textarea class="form-control" rows="3" id="productTitle" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="col-md-12 text-center">
                                <br />
                                <button className="btn-outline rounded" disabled={loadingUpdate} type="submit" style={{width: '25%'}}>Submit</button>
                                {loadingUpdate && <LoadingButton />}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ProductEditScreen;