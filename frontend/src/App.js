import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen.js';
import ProductScreen from './Screens/ProductScreen.js';
import CartScreen from './Screens/CartScreen.js';
import SigninScreen from './Screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from './Screens/RegisterScreen';
import ProductsScreen from './Screens/ProductsScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen.js';
import ProfileScreen from './Screens/ProfileScreen.js';
import OrdersScreen from './Screens/OrdersScreen.js';
import { useEffect } from 'react';
import CreateCategory from './Screens/CategoryScreen.js';
import PageNotFound from './Screens/PageNotFound.js';
import { listCategories } from './actions/categoryActions.js';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Badge } from 'antd';



function App() {
  const userSignin = useSelector(state => state.userSignin);
  const categoryList = useSelector(state => state.categoryList);
  const cart = useSelector(state => state.cart);
  //console.log(cart.cartItems);
  const {  categories } = categoryList;
  const { userInfo } = userSignin;
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(listCategories());
    // eslint-disable-next-line
  }, []);

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (
    <BrowserRouter>
    <ToastContainer/>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">ClickNCart</Link>
          </div>
          <div className="header-links">
          <Badge count={cart.cartItems?.length} showZero >
                  <Link to="/cart" className="nav-link" style={{fontSize:"18px",position:"relative",top:"1px"}}>
                  <i className="fa-solid fa-cart-shopping" style={{color: '#1725e8'}}></i>Cart
                  </Link>
            </Badge>
             {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
             {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="/#" onClick={(e) => e.preventDefault()} >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    </li><li>
                    <Link to="/products">Products</Link>
                    </li><li>
                    <Link to="/edit-category">Categories</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3 style={{fontWeight:"bold"}}>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                  <li key={"All Categories 1245"}><Link
                        to={'/'}
                      >
                        All Categories
                      </Link></li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            
            <Routes >
            <Route path="/edit-category" element={<CreateCategory/>} />
            <Route path="/category/:id" element={<HomeScreen/>} />
            <Route path="/orders" element={<OrdersScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />
            <Route path="/products" element={<ProductsScreen/>} />
            <Route path="/order/:id" element={<OrderScreen/>} />
            <Route path="/shipping" element={<ShippingScreen/>} />
            <Route path="/payment" element={<PaymentScreen/>} />
            <Route path="/placeorder" element={<PlaceOrderScreen/>} />
            <Route path="/signin" element={<SigninScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
              <Route path="/product/:id" element={<ProductScreen/>} />
              <Route path="/cart/:id?" element={<CartScreen/>} />
              <Route path="/" exact={true} element={<HomeScreen />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            
          </div>
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
