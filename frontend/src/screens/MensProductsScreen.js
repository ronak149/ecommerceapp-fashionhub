import { useEffect, useReducer, useState } from 'react';
import Product from '../components/Product.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FooterScreen from './FooterScreen.js';
import LoadingProductCard from '../components/LoadingProductCard.js';

const mensProductsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, mensProducts: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const MensProductsScreen = () => {

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [collectionFilter, setCollectionFilter] = useState([]);

  const [{ mensProducts, loading, error }, dispatch] = useReducer(mensProductsReducer, {
    mensProducts: [],
    loading: true,
    error: '',
  });

  useEffect(() => {

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.filter((product) => product.gender.toLowerCase() === 'men') });
      }
      catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }
    fetchData();

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

  }, []);

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
  ];

  return (
    <main>
      <section className="row g-2 mt-2 p-3">
        <br />
        {
          loading ? <LoadingProductCard />
            : (
              <div className="row g-3 p-2 pt-0">
                <div className="col-md-3 p-2 pt-0" >
                  <div className="card shadow p-0 cardWidth" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men">
                        <img src={process.env.PUBLIC_URL + "/assets/mens-new-arrivals.jpg"} alt='new-arrivals' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">New Arrivals</p>
                      <Link to="/search?&gender=Men" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 p-2 pt-0" >
                  <div className="card shadow p-0 cardWidth" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men&category=T-Shirts">
                        <img src={process.env.PUBLIC_URL + "/assets/mens-basic-tees.jpg"} alt='basic-tees' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">Basic Tees</p>
                      <Link to="/search?&gender=Men&category=T-Shirts" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 p-2 pt-0" >
                  <div className="card shadow p-0 cardWidth" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men&category=Footwear">
                        <img src={process.env.PUBLIC_URL + "/assets/mens-footwear.jpg"} alt='footwear' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">Footwear</p>
                      <Link to="/search?&gender=Men&category=Footwear" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 p-2 pt-0" >
                  <div className="card shadow p-0 cardWidth" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men&category=Accessories">
                        <img src={process.env.PUBLIC_URL + "/assets/mens-accessories.jpg"} alt='accessories' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">Accessories</p>
                      <Link to="/search?&gender=Men&category=Accessories" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 p-2">
                  <div className="card shadow p-0" >
                    <div className="card-image-container" style={{ maxHeight: '40vh' }}>
                      <Link to="/search?&gender=Men&collection=Fall">
                        <img src={process.env.PUBLIC_URL + "/assets/new-arrivals.jpg"} alt='new-arrivals' className="card-img-top card-image rounded" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <p className="card-title">Fall Collection is finally here</p>
                      <Link to="/search?&gender=Men&collection=Fall" className="text-decoration-none"><p className="card-text">Shop now</p></Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 p-2">
                  <div className="col-12 mt-2" style={{ maxHeight: '40vh' }}>
                    <div className="row text-center" >
                      <h5 className="fw-bold mb-4 "><u>Shop Men's</u></h5>
                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Clothing</h6>
                        <Link to="/search?&gender=Men&category=T-Shirts" className="category-links d-block mb-2">T-Shirts</Link>
                        <Link to="/search?&gender=Men&category=Hoodies" className="category-links d-block mb-2">Hoodies</Link>
                        <Link to="/search?&gender=Men&category=Pants" className="category-links d-block mb-2">Pants</Link>
                        <Link to="/search?&gender=Men&category=Shorts" className="category-links d-block mb-2">Shorts</Link>
                      </div>

                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Accessories</h6>
                        <Link to="/search?&gender=Men&category=Accessories" className="category-links d-block mb-2">Caps</Link>
                        <Link to="/search?&gender=Men&category=Accessories" className="category-links d-block mb-2">Belts</Link>
                        <Link to="/search?&gender=Men&category=Accessories" className="category-links d-block mb-2">Beanie</Link>
                        <Link to="/search?&gender=Men&category=Accessories" className="category-links d-block mb-2">Bags</Link>
                      </div>

                      <div className="col-3 mx-auto mb-3 text-start">
                        <h6 className="fw-semibold mb-2 ">Footwear</h6>
                        <Link to="/search?&gender=Men&category=Footwear" className="category-links d-block mb-2">Shoes</Link>
                        <Link to="/search?&gender=Men&category=Footwear" className="category-links d-block mb-2">Sandals</Link>
                        <Link to="/search?&gender=Men&category=Footwear" className="category-links d-block mb-2">Slippers</Link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )
        }


        <br />
        <FooterScreen />
      </section>
    </main>
  );
}

export default MensProductsScreen;