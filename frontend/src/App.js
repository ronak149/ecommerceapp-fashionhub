import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderScreen from './screens/HeaderScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import MensProductsScreen from './screens/MensProductsScreen';
import WomensProductsScreen from './screens/WomensProductsScreen';
import CartScreen from './screens/CartScreen.js';
// import OnSaleScreen from './screens/OnSaleScreen.js';
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
import SearchScreen from './screens/SearchScreen.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import DashboardScreen from './screens/DashboardScreen.js';
import AdminRoute from './components/AdminRoute.js';
import ProductListScreen from './screens/ProductListScreen.js';
import OrderListScreen from './screens/OrderListScreen.js';
import UserListScreen from './screens/UserList.js';
import AboutUsScreen from './screens/AboutUsScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';

function App() {

  return (
    <Router>
    <div className="App" >
      <ToastContainer position="bottom-center" limit={1} autoClose={1500} />
      <HeaderScreen />
        <main>
          <Routes>
            <Route path="Mens/products/:slug" element={<ProductInfoScreen />} />
            <Route path="Mens/" element={<MensProductsScreen />} />
            <Route path="Womens/products/:slug" element={<ProductInfoScreen />} />
            <Route path="Womens/" element={<WomensProductsScreen />} />
            <Route path="/AboutUs" element={<AboutUsScreen />} />
            {/* <Route path="Sale/products/:slug" element={<ProductInfoScreen />} /> */}
            {/* <Route path="Sale/" element={<OnSaleScreen />} /> */}
            <Route path="SignIn/" element={<SignInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/order-summary" element={<OrderSummaryScreen />} />
            <Route path="/order/:id" element={<ProtectedRoute><OrderConfirmationScreen /></ProtectedRoute>} />
            <Route path="Cart/" element={<CartScreen />} />
            <Route path="/orderHistory" element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<EditProfileScreen />} />
            <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
            <Route path="/search/products/:slug" element={<ProductInfoScreen />} />
            <Route path="/search" element={<SearchScreen />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminRoute><DashboardScreen /></AdminRoute>} />
            <Route path="/admin/productlist/editproduct/:id" element={<AdminRoute><ProductEditScreen /></AdminRoute>} />
            <Route path="/admin/productlist" element={<AdminRoute><ProductListScreen /></AdminRoute>} />
            <Route path="/admin/orderlist" element={<AdminRoute><OrderListScreen /></AdminRoute>} />
            <Route path="/admin/userlist" element={<AdminRoute><UserListScreen /></AdminRoute>} />

            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
 
    </div>
    </Router>
  );
}

export default App;
