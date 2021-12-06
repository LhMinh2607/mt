import React from 'react'
import { Route, Routes } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import DrinkPage from './pages/DrinkPage';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import {useDispatch, useSelector} from 'react-redux';
import SignUpPage from './pages/SignupPage';
import { signout } from './actions/userAction';
import CartPage from './pages/CartPage';
import DrinkDetailPage from './pages/DrinkDetailPage';
import ProfilePage from './pages/ProfilePage';
import OrderPage from './pages/OrderPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderHistoryPage from './pages/OrderHistoryPage';


function App() {


  const userSignin = useSelector((state)=> state.userSignin);
  const {userInfo, loading, error} = userSignin;

  const dispatch = useDispatch();
  const signOutHandler = () =>{
    dispatch(signout());
  };

  const cart = useSelector((state)=> state.cart);
  const {cartItems} = cart;

  return (
      <BrowserRouter>
        <div className="grid-containter">
              <header className="row navigation-bar">
                  <div>
                    <Link to="/" className="brand">MilkTea WebStore</Link>
                  </div>
                  <div>
                    <Link to="/drink" className="">Xem thêm</Link>
                  </div>
                    <Link to="/shopping_cart">Giỏ hàng
                      <i className="fa fa-shopping-cart"></i>
                    {
                    cartItems.length>0
                    && (<span className="cart-items-count">{cartItems.reduce((a, c) => a + Number(c.quantity), 0)}</span>)
                    }</Link>
                      {userInfo && userInfo.role==='user' ? (
                        <div className="dropDown">
                          <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                        
                          <ul className="dropDown-content">
                            <li>
                              <Link to={`/user/${userInfo._id}/profile`}>Tài khoản<i className="fa fa-user"></i></Link>
                            </li>
                            <li>
                              <Link  to={`/order/history`}>Lịch sử mua hàng<i className="fa fa-history"></i></Link>
                            </li>
                            <li>
                              <Link to="/" onClick={signOutHandler}>
                                Đăng xuất<i className="fa fa-hand-o-left"></i>
                              </Link>
                            </li>
                          </ul> 
                        </div>) : <Link to="/signin" className="">Đăng nhập</Link>}
              </header>
              <main>
                <Routes>
                  {/* React Router Dom v6 syntax */}
                  <Route exact path="/" element={<HomePage></HomePage>}></Route>
                  
                  <Route exact path="/signin" element={<SigninPage></SigninPage>}></Route>
                  <Route exact path="/signup" element={<SignUpPage></SignUpPage>}></Route>
                </Routes>
                <Routes>
                  <Route exact path="/drink" element={<DrinkPage></DrinkPage>}></Route>
                  <Route exact path="/drink/:drinkId" element={<DrinkDetailPage></DrinkDetailPage>}></Route>
                </Routes>
                <Routes>
                  <Route path="/shopping_cart" element={<CartPage></CartPage>}></Route>
                  <Route path="/shopping_cart/:drinkId" element={<CartPage></CartPage>}></Route>
                  <Route path="/shopping_cart/:drinkId/:quantity" element={<CartPage></CartPage>}></Route>
                </Routes>
                <Routes>
                  <Route path="/user/:id/profile" element={<ProfilePage></ProfilePage>}></Route>
                </Routes>
                <Routes>
                  <Route exact path="/order" element={<OrderPage></OrderPage>}></Route>
                  <Route exact path={`/order/:orderId`} element={<OrderDetailPage></OrderDetailPage>}></Route>
                  <Route exact path={"/order/history"} element={<OrderHistoryPage></OrderHistoryPage>}></Route>
                </Routes>

              </main>
              {/* <footer className="row-bottom">
                  <div className="nav-menu-item">
                    <i className="fab fa-youtube bigger-icon"></i><a href="https://youtube.com/channel/UCGmokfRCnHmlz7AF3-suNvQ/about">LhMinh2607</a>
                  </div>
                  <div className="nav-menu-item">
                    <i className="fab fa-discord bigger-icon"></i><a href="https://www.discordapp.com/users/LhMinh2607#7347">LhMinh2607.gg</a>
                  </div>
                  <div className="nav-menu-item">
                    All Rights Reserved 
                  </div>
                  <div className="nav-menu-item">
                    <i className="fab fa-github bigger-icon"></i><a href="https://www.github.com/LhMinh2607/TTCM_AssetStore">LhMinh2607.git</a>
                  </div>
                  <div className="nav-menu-item">
                    <i className="fab fa-reddit bigger-icon"></i><a href="https://reddit.com/u/LhMinh2607">u/LhMinh2607</a>
                  </div>
              </footer> */}
          </div>
      </BrowserRouter>
    
  );
}


export default App;
