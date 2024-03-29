import { useState, useEffect, useReducer } from 'react';
import Product from '../components/Product';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const onSaleProductsReducer = (state, action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, onSaleProducts: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading:false, error: action.payload};
    default:
      return state;
  }
}

const OnSaleScreen = () => {

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [collectionFilter, setCollectionFilter] = useState([]);

  const [{onSaleProducts, loading, error}, dispatch] = useReducer(onSaleProductsReducer, {
    onSaleProducts: [],
    loading: true,
    error: '',
  });

  useEffect(() => {

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.filter((product) => product.onSale === true)});
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
      catch(err) {
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

    return(
      <section className="row m-2 mt-0 g-2" >              
        <div className="col-md-2 mt-0 border-end">
        <span className='float-end'><button class="btn btn-outline-dark d-lg-none fw-semibold" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"> Filter Items &nbsp; <i class="bi bi-sliders "></i></button></span>
        <div class="offcanvas-lg m-0 offcanvas-end" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title fw-semibold" id="offcanvasResponsiveLabel">Filter Items:</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body d-block p-2 ">
            <div class="d-flex">
              <div class="nav flex-column nav-pills m-2" style={{ width: '100%' }}>
                <ul className="list-group list-group-flush px-2 float-center">
                  <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/Mens" type="button"><i class=" fs-6 bi bi-gender-male"></i> &nbsp; Men's </Link></li>
                  <li className='list-group-item'><Link class="btn-outline-sidenav rounded" to="/Womens" type="button"><i class=" fs-6 bi bi-gender-female"></i> &nbsp; Women's </Link></li>
                  <li className='list-group-item'><Link class="btn-outline-sidenav rounded sidenav-active" to="/Sale" type="button"><i class=" fs-6 bi bi-coin"></i> &nbsp;Sale </Link></li>
                  <li className='list-group-item p-0'>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                      <div class="accordion-item ">
                        <h2 class="accordion-header" id="flush-headingOne">
                          <button class="accordion-button text-secondary btn-sm px-0 py-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Category:
                          </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                            <ul className="list-group list-group-flush form-check">
                              {
                                categoryFilter.map((category) => (
                                  <li className='list-group-item'><Link className="text-secondary text-decoration-none" to={`/search?category=${category}`}><input class="form-check-input" type="checkbox" value="" id={category} />{category}</Link></li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingTwo">
                          <button class="accordion-button text-secondary btn-sm px-0 py-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Color:
                          </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                            <ul className="list-group list-group-flush form-check">
                              {
                                colorFilter.map((color) => (
                                  <li className='list-group-item'><Link className="text-secondary text-decoration-none" to={`/search?color=${color}`}><input class="form-check-input" type="checkbox" value="" id={color} />{color}</Link></li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingThree">
                          <button class="accordion-button text-secondary btn-sm px-0 py-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Collection:
                          </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                            <ul className="list-group list-group-flush form-check">
                              {
                                collectionFilter.map((collection) => (
                                  <li className='list-group-item'><Link className="text-secondary text-decoration-none" to={`/search?collection=${collection}`}><input class="form-check-input" type="checkbox" value="" id={collection} />{collection}</Link></li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingFour">
                          <button class="accordion-button text-secondary btn-sm px-0 py-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                            Price:
                          </button>
                        </h2>
                        <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                            <ul className="list-group list-group-flush form-check">
                              {
                                prices.map((price) => (
                                  <li className='list-group-item'><Link className="text-secondary text-decoration-none" to={`/search?price=${price.value}`}><input class="form-check-input" type="checkbox" value="" id={price} />{price.name}</Link></li>
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
        </div>
      </div>

      <div className="col-md-10 mt-0 p-3 overflow-scroll" > 
          <div className="col-12 p-2">
             <h4 className='fw-bold'>New Arrivals: </h4>              
          </div>

          <div  id="product-container" className="d-flex flex-row justify-content-between flex-wrap">
            {  loading ? (<div>Loading...</div>) : error ? (<div>{error}</div>) :
              (onSaleProducts.map((product) => (
                <Product 
                  product={product}
                  key={product.slug}
                />
              )))
            }
          </div>             
      </div>                     
    </section>
    );
}

export default OnSaleScreen;