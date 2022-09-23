import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderScreen from './screens/HeaderScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import MensProductsScreen from './screens/MensProductsScreen';
import MensProductInfoScreen from './screens/MensProductInfoScreen.js';
import WomensProductsScreen from './screens/WomensProductsScreen';
import CartScreen from './screens/CartScreen.js';
import OnSaleScreen from './screens/OnSaleScreen.js';

import './App.css';

function App() {

  return (
    <Router>
    <div className="App">
      <HeaderScreen />
        <main>
          <Routes>
            <Route path="Mens/product/:slug" element={<MensProductInfoScreen />} />
            <Route path="Mens/" element={<MensProductsScreen />} />
            <Route path="Womens/product/:slug" element={<MensProductInfoScreen />} />
            <Route path="Womens/" element={<WomensProductsScreen />} />
            <Route path="Sale/product/:slug" element={<MensProductInfoScreen />} />
            <Route path="Sale/" element={<OnSaleScreen />} />
            <Route path="Cart/" element={<CartScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
    </div>
    </Router>
  );
}

export default App;
