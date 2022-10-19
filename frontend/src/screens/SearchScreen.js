import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingProductCard from '../components/LoadingProductCard';
import Product from '../components/Product';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                countProducts: action.payload.countProducts,
                loading: false
            }
        case 'FETCH_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

const prices = [
    {
        name: '$1 to $10',
        value: '1-10',
    },
    {
        name: '$11 to $20',
        value: '11-20'
    },
    {
        name: '$21 to $30',
        value: '21-30',
    },
    {
        name: '$31 to $40',
        value: '31-40',
    },
    {
        name: '$41 to $50',
        value: '41-50'
    }
]


const SearchScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const gender = sp.get('gender') || 'all';
    const type = sp.get('type') || 'all';
    const category = sp.get('category') || 'all';
    const color = sp.get('color') || 'all';
    const collection = sp.get('collection') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';

    const [{ error, products, loading }, dispatch] = useReducer(reducer, { loading: false, error: '', products: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/products/search?&gender=${gender}&type=${type}&query=${query}&color=${color}&collection=${collection}&category=${category}&price=${price}&rating=${rating}&order=${order}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
                toast.error(err.message);
            }
        }
        fetchData();
    }, [gender, category, error, order, color, collection, price, query, rating, type]);

    const [categoryFilter, setCategoryFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const [collectionFilter, setCollectionFilter] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const { data } = await axios.get('/api/products/categories');
                setCategoryFilter(data.categories);
                setColorFilter(data.colors);
                setCollectionFilter(data.collections);
            }
            catch (err) {
                toast.error(err.message);
            }
        }
        fetchFilters();
    }, [dispatch]);

    const getFilterUrl = (filter) => {
        const genderFilter = filter.gender || gender;
        const filterType = filter.type || type;
        const filterCategory = filter.category || category;
        const filterColor = filter.color || color;
        const collectionFilter = filter.collection || collection;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const filterOrder = filter.order || order;
        return `/search?&gender=${genderFilter}&type=${filterType}&category=${filterCategory}&color=${filterColor}&collection=${collectionFilter}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}`;
    }

    return (
        <div className='row m-2 mt-0 g-2'>

            <div className="col-md-2 m-0 border-end">
                
                <div className="offcanvas-lg m-0 offcanvas-end" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel" style={{maxWidth: '80vw'}} >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title fw-semibold" id="offcanvasResponsiveLabel">Filter Items:</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-block p-2 ">
                        <div className="d-flex">
                            <div className="nav flex-column nav-pills m-2" style={{ width: '100%' }}>
                                <ul className="list-group list-group-flush px-2 float-center">
                                    <li className='list-group-item'><Link className={gender === 'Men' ? `btn-outline-sidenav rounded sidenav-active` : `btn-outline-sidenav rounded`} to={getFilterUrl({ gender: 'Men' })} type="button"><i className=" fs-6 bi bi-gender-male"></i> &nbsp; Men's </Link></li>
                                    <li className='list-group-item'><Link className={gender === 'Women' ? `btn-outline-sidenav rounded sidenav-active` : `btn-outline-sidenav rounded`} to={getFilterUrl({ gender: 'Women' })} type="button"><i className=" fs-6 bi bi-gender-female"></i> &nbsp; Women's </Link></li>
                                    <li className='list-group-item'><Link className={type === 'sale' ? `btn-outline-sidenav rounded sidenav-active` : `btn-outline-sidenav rounded`} to={ type === 'sale' ? getFilterUrl({ type: 'all' }) : getFilterUrl({ type: 'sale' })} type="button"><i className=" fs-6 bi bi-coin"></i> &nbsp;Sale </Link></li>
                                    <li className='list-group-item p-0'>
                                        <div className="accordion accordion-flush" id="accordionFlushExample">
                                            <div className="accordion-item ">
                                                <h2 className="accordion-header" id="flush-headingOne">
                                                    <button className="accordion-button text-secondary btn-sm px-0 py-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                        Category:
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">
                                                        <ul className="list-group list-group-flush form-check">
                                                            <li className="list-group-item"><Link className={category === 'all' ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ category: 'all' })}><input className="form-check-input" type="checkbox" value="" id="allCategory" onChange={()=>{}} checked={category === 'all'} />All</Link></li>
                                                            {
                                                                categoryFilter.map((cat, i) => (
                                                                    <li className="list-group-item" key={i}><Link className={cat === category ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ category: cat })}><input className="form-check-input" type="checkbox" value="" onChange={()=>{}} checked={cat === category} />{cat}</Link></li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="accordion-item ">
                                                <h2 className="accordion-header" id="flush-headingTwo">
                                                    <button className="accordion-button text-secondary btn-sm px-0 py-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                        Color:
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">
                                                        <ul className="list-group list-group-flush form-check">
                                                            <li className="list-group-item"><Link className={color === 'all' ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ color: 'all' })}><input className="form-check-input" type="checkbox" value="" id="allcolor" onChange={()=>{}} checked={color === 'all'} />All</Link></li>
                                                            {
                                                                colorFilter.map((col,i) => (
                                                                    <li className="list-group-item" key={i}><Link className={col === color ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ color: col })}><input className="form-check-input" type="checkbox" value="" onChange={()=>{}} checked={col === color} />{col}</Link></li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="accordion-item ">
                                                <h2 className="accordion-header" id="flush-headingThree">
                                                    <button className="accordion-button text-secondary btn-sm px-0 py-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                        Collection:
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">
                                                        <ul className="list-group list-group-flush form-check">
                                                            <li className="list-group-item"><Link className={collection === 'all' ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ collection: 'all' })}><input className="form-check-input" type="checkbox" value="" id="allcollection" onChange={()=>{}} checked={collection === 'all'} />All</Link></li>
                                                            {
                                                                collectionFilter.map((coll,i) => (
                                                                    <li className="list-group-item" key={i}><Link className={coll === collection ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ collection: coll })}><input className="form-check-input" type="checkbox" value="" onChange={()=>{}} checked={coll === collection} />{coll}</Link></li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="accordion-item ">
                                                <h2 className="accordion-header" id="flush-headingFour">
                                                    <button className="accordion-button text-secondary btn-sm px-0 py-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                                        Price:
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">
                                                        <ul className="list-group list-group-flush form-check">
                                                            <li className="list-group-item"><Link className={price === 'all' ? 'fw-bold text-decoration-none text-secondary' : 'text-decoration-none text-secondary'} to={getFilterUrl({ price: 'all' })}><input className="form-check-input" type="checkbox" value="" onChange={()=>{}} checked={price === 'all'} />All</Link></li>
                                                            {
                                                                prices.map((p, i) => (
                                                                    <li className="list-group-item" key={i}><Link className={p.value === price ? 'fw-bold text-decoration-none text-secondary' : 'text-decoration-none text-secondary'} to={getFilterUrl({ price: p.value })}><input className="form-check-input" type="checkbox" value="" id="p" onChange={()=>{}} checked={p.value === price} />{p.name}</Link></li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="offcanvas-header">
                        <button type="button" className="btn-outline m-0 px-2 py-1 rounded" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"> Apply Filter &nbsp; <i class="bi bi-sliders"></i></button>
                        <button className="btn-outline m-0 px-2 py-1 rounded" onClick={() => navigate('/search')}> Remove Filter&nbsp; <i class="bi bi-trash3-fill"></i></button>
                    </div>
                </div>
            </div>

            <div className="col-md-10 mt-0 p-3">
                <div className="row">
                    <div className='col-md-12 mb-1'>
                        <p className='fw-semibold'>Active filters:
                            {gender !== 'all' && ' + ' + gender + "'s "}
                            {type !== 'all' && ' + ' + type}
                            {color !== 'all' && ' + ' + color}
                            {collection !== 'all' && ' + ' + collection}
                            {query !== 'all' && ' + ' + query}
                            {category !== 'all' && ' + ' + category}
                            {price !== 'all' && ' + Price ' + price}
                            {gender !== 'all' || type !== 'all' ||query !== 'all' || category !== 'all' || price !== 'all' || collection !== 'all' || color !== 'all' ?
                                (<><button className="btn p-0 m-0" onClick={() => navigate('/search')}>&nbsp;<i className="bi bi-x-circle-fill fs-6"></i></button> <hr /> </>) : null} </p>
                            
                    </div>
                    <div className='col-5 mb-1 text-center d-flex justify-content-center align-items-center'><span className='text-center'><button className="btn py-1 px-2 btn-outline d-lg-none fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"> Filter &nbsp; <i className="bi bi-sliders "></i></button></span></div>
                    <div className="col-7 text-end">
                        <div className="form-group">
                            <small><label className=" d-inline-block form-check-label" htmlFor="sort-by">Sort by: &nbsp;</label></small>
                            <select id="sort-by" className="w-auto d-inline-block form-select-sm form-select" aria-label="Default select example" value={order} onChange={(e) => { navigate(getFilterUrl({ order: e.target.value })) }}>
                                <option className="select-options" defaultValue value="newest">New Arrivals</option>
                                <option className="select-options" value="lowest">Price: Low to High</option>
                                <option className="select-options" value="highest">Price: High to Low</option>
                                <option className="select-options" value="toprated">Customer Ratings</option>
                            </select>
                        </div>
                        <br/>
                    </div>
                    <div id="product-container" className="d-flex flex-row justify-content-around flex-wrap align-content-around">
                        {loading ? <LoadingProductCard /> : products.length === 0 && (
                            <div className="row p-2">
                                <div className="col-9">
                                    <h4 className='fw-bold'>No product found</h4>
                                </div>
                            </div>
                        )}

                        {
                            products.map((product) => (
                                <Product
                                    product={product}
                                    key={product.slug}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchScreen;