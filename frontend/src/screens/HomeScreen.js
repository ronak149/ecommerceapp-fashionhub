import { data } from "../data";
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <section>
        <h1>Featured Products</h1>
          <section id="product-container" className="d-flex flex-row justify-content-around flex-wrap align-content-around">
          {
            data.products.map((product) => (
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
                  <button type="button" class="btn btn-outline-secondary" style={{width: "100%"}}>Add to Cart</button>
                </div>
              </div>
            ))
          }
          </section>
        </section>
    );
}

export default HomeScreen;