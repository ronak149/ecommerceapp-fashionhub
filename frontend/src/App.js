import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderScreen from './screens/HeaderScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import FooterScreen from './screens/FooterScreen.js';
import MensProductsScreen from './screens/MensProductsScreen';
import WomensProductsScreen from './screens/WomensProductsScreen';
import CartScreen from './screens/CartScreen.js';
import OnSaleScreen from './screens/OnSaleScreen.js';
import ProductInfoScreen from './screens/ProductInfoScreen.js';

import './App.css';
import SignInScreen from './screens/SignInScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';
import OrderSummaryScreen from './screens/OrderSummaryScreen.js';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen.js';
import OrderHistoryScreen from './screens/OrderHistoryScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';

function App() {

  return (
    <Router>
    <div className="App">
      <ToastContainer position="bottom-center" limit={1} autoClose={1500} />
      <HeaderScreen />
        <main>
          <Routes>
            <Route path="Mens/products/:slug" element={<ProductInfoScreen />} />
            <Route path="Mens/" element={<MensProductsScreen />} />
            <Route path="Womens/products/:slug" element={<ProductInfoScreen />} />
            <Route path="Womens/" element={<WomensProductsScreen />} />
            <Route path="Sale/products/:slug" element={<ProductInfoScreen />} />
            <Route path="Sale/" element={<OnSaleScreen />} />
            <Route path="SignIn/" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/order-summary" element={<OrderSummaryScreen />} />
            <Route path="/order/:id" element={<OrderConfirmationScreen />} />
            <Route path="Cart/" element={<CartScreen />} />
            <Route path="/orderHistory" element={<OrderHistoryScreen />} />
            <Route path="/edit-profile" element={<EditProfileScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      <FooterScreen />
    </div>
    </Router>
  );
}

export default App;
