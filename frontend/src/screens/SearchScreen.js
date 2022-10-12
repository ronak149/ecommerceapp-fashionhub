import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Product from '../components/Product';

const reducer = (state, action) => {
    switch(action.type) {
        case "FETCH_REQUEST": 
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

    const [{ error, products }, dispatch] = useReducer (reducer, {loading: true, error: '', products: []});

    useEffect(() => {
        const fetchData = async () => {
            try{ 
                const { data } = await axios.get(`/api/products/search?&gender=${gender}&type=${type}&query=${query}&color=${color}&collection=${collection}&category=${category}&price=${price}&rating=${rating}&order=${order}`);
                dispatch({type: 'FETCH_SUCCESS', payload: data})
            }
            catch(err) {
                dispatch({type: 'FETCH_FAIL', payload: err.message});
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
            catch(err) {
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
            <div className='row m-2 g-2 clearfix'>
                <div className="row p-2">
                    <div className="col-6">
                        <h4 className='fw-bold d-block-inline'>New Arrivals: </h4> 
                    </div>
                    <div className="col-6 text-end">
                        <div className="form-group">
                            <label className=" d-inline-block form-check-label" htmlFor="sort-by">Sort by: &nbsp;</label> 
                            <select id="sort-by" className="w-auto d-inline-block form-select-sm form-select" aria-label="Default select example" value={order} onChange={(e) => { navigate(getFilterUrl( { order: e.target.value }))}}>
                                <option defaultValue value="newest">New Arrivals</option>
                                <option value="lowest">Price: Low to High</option>
                                <option value="highest">Price: High to Low</option>
                                <option value="toprated">Customer Ratings</option>
                            </select>
                        </div>
                    </div>          
                </div>
                < hr />
                <div className='col-md-12'>
                    <p className='fw-semibold'>Filters:
                    {gender !== 'all' && ' + ' + gender + "'s "}
                    {type !== 'all' && ' + ' + type}
                    {color !== 'all' && ' + ' + color}
                    {collection !== 'all' && ' + ' + collection}
                    {query !== 'all' && ' + ' + query}
                    {category !== 'all' && ' + ' + category}
                    {price !== 'all' && ' + Price ' + price}
                    {query !== 'all' || category !== 'all' || price !== 'all' || collection !== 'all' || color !== 'all' ? 
                    (  <button className="btn" onClick={() => navigate('/search')}>{' '} <i className="bi bi-x-circle-fill"></i></button>) : null }
                    &nbsp; <span className='float-end'><button className="btn btn-outline-dark d-lg-none fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"> Filter Items &nbsp; <i className="bi bi-sliders "></i></button></span></p>
                </div>
                <div className="col-md-2">                    

                    <div className="offcanvas-lg offcanvas-end" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title fw-semibold" id="offcanvasResponsiveLabel">Filter Items:</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body d-block m-2 p-2">
                            <p className="border-bottom pb-2"><Link className="text-secondary text-decoration-none " to={getFilterUrl({ gender: 'Men' })}><input className="form-check-input" type="checkbox" value=""  checked={gender === 'Men'}/> Men's</Link></p>
                            <p className="border-bottom pb-2"><Link className="text-secondary text-decoration-none" to={getFilterUrl({ gender: 'Women' })}><input className="form-check-input" type="checkbox" value=""  checked={gender === 'Women'}/> Women's</Link></p>
                            { type === 'sale' ? <p className="border-bottom pb-2"><Link className="text-secondary text-decoration-none" id="checkboxLink" to={getFilterUrl({ type: 'all' })}><input className="form-check-input" type="checkbox" value="" id="saleCheckbox" checked={true} /> On Sale</Link></p> :
                            <p className="border-bottom pb-2"><Link className="text-secondary text-decoration-none" id="checkboxLink" to={getFilterUrl({ type: 'sale' })}><input className="form-check-input" type="checkbox" value="" id="saleCheckbox" checked={false}/> On Sale</Link></p>}
                
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingOne">
                                            <button className="accordion-button text-secondary btn-sm px-0 py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            Category:
                                            </button>
                                        </h2>
                                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">
                                                <ul className="list-group list-group-flush form-check">
                                                <li className="list-group-item"><Link className={category === 'all' ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ category: 'all' })}><input className="form-check-input" type="checkbox" value="" id="allCategory" checked={category === 'all'}/>All</Link></li>
                                                {
                                                    categoryFilter.map((cat) => (                                                
                                                        <li className="list-group-item" key={cat}><Link className={cat === category ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ category: cat})}><input className="form-check-input" type="checkbox" value=""  checked={cat === category}/>{cat}</Link></li>
                                                    ))
                                                }
                                                </ul>
                                            </div>
                                        </div>  
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingTwo">
                                            <button className="accordion-button text-secondary btn-sm px-0 py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            Color:
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">
                                                <ul className="list-group list-group-flush form-check">
                                                <li className="list-group-item"><Link className={color === 'all' ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ color: 'all' })}><input className="form-check-input" type="checkbox" value="" id="allcolor" checked={color === 'all'}/>All</Link></li>
                                                {
                                                    colorFilter.map((col) => (                                                
                                                        <li className="list-group-item" key={col}><Link className={col === color ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ color: col})}><input className="form-check-input" type="checkbox" value=""  checked={col === color}/>{col}</Link></li>
                                                    ))
                                                }
                                                </ul>
                                            </div>
                                        </div>  
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingThree">
                                            <button className="accordion-button text-secondary btn-sm px-0 py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            Collection:
                                            </button>
                                        </h2>
                                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">
                                                <ul className="list-group list-group-flush form-check">
                                                <li className="list-group-item"><Link className={collection === 'all' ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ collection: 'all' })}><input className="form-check-input" type="checkbox" value="" id="allcollection" checked={collection === 'all'}/>All</Link></li>
                                                {
                                                    collectionFilter.map((coll) => (                                                
                                                        <li className="list-group-item" key={coll}><Link className={coll === collection ? 'fw-bold text-secondary text-decoration-none' : 'text-decoration-none text-secondary'} to={getFilterUrl({ collection: coll})}><input className="form-check-input" type="checkbox" value=""  checked={coll === collection}/>{coll}</Link></li>
                                                    ))
                                                }
                                                </ul>
                                            </div>
                                        </div>  
                                    </div>
                                </div>

                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingFour">
                                            <button className="accordion-button text-secondary btn-sm px-0 py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                            Price:
                                            </button>
                                        </h2>
                                        <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">
                                                <ul className="list-group list-group-flush form-check">
                                                <li className="list-group-item"><Link className={price === 'all' ? 'fw-bold text-decoration-none text-secondary' : 'text-decoration-none text-secondary'} to={getFilterUrl({ price: 'all' })}><input className="form-check-input" type="checkbox" value=""  checked={price === 'all'}/>All</Link></li>
                                                {
                                                    prices.map((p) => (
                                                        <li className="list-group-item" key={p}><Link className={p.value === price ? 'fw-bold text-decoration-none text-secondary' : 'text-decoration-none text-secondary'} to={getFilterUrl({ price: p.value})}><input className="form-check-input" type="checkbox" value="" id="p" checked={p.value === price}/>{p.name}</Link></li>
                                                    ))
                                                }
                                                </ul>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                        </div>
                    </div>                        

                </div>
                <div className="col-md-10 p-1">
                    <div  id="product-container" className="d-flex flex-row justify-content-around flex-wrap align-content-around clearfix">                    

                        {products.length === 0 && (
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
    );
}

export default SearchScreen;