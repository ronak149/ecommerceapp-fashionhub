import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WomensProductsScreen = () => {

    const [womensProducts, setWomensProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          const result = await axios.get('/api/products');
          setWomensProducts(result.data.women);
      }
      fetchData();
    }, []);

    return(
        <section id="product-container" className="d-flex flex-row justify-content-around flex-wrap align-content-around">
          {
            womensProducts.map((product) => (
              <div className="card cardWidth shadow " key={product.id}>
                <div className="card-image-container">
                  <Link to={`product/${product.slug}`}>
                    <img src={product.src} alt={product.title} className="card-img-top card-image"/>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">{product.gender}'s <span style={{float: "right", margin: "0 10px 0 0", color: "red"}}>{product.promotion.discount ? 'On Sale: ' + product.promotion.discount + '% OFF' : ''}</span></p>
                  <h5 className="card-title"><Link to={`product/${product.slug}`}>{product.title}</Link><span style={{float: "right", margin: "0 10px 0 0"}}>${product.price}.00</span></h5>
                  <p className="card-text">{product.color}</p>
                  <button type="button" className="btn btn-outline-secondary" style={{width: "100%"}}>Add to Cart</button>
                </div>
              </div>
            ))
          }
          </section>
    );
}

export default WomensProductsScreen;