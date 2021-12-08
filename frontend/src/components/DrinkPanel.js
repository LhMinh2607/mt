import React, { useState } from 'react'
import RatingComponent from './RatingComponent'
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';




export default function DrinkPanel(props) {

    const {d} = props;

    const navigate = useNavigate();
    
    const addToCartHandler = () =>{
        navigate(`/shopping_cart/${d._id}/topping=${topping}/quantity=${quantity}`);
    }

    const [quantity, setquantity] = useState(1);
    const [topping, setTopping] = useState("Mặc định"); //default name of topping

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    return (
        <div>
            <div key={d._id} className="card">
                <Link to={`/drink/${d._id}`}>
                    <img className="medium" src={d.image} alt={d.name}/>
                </Link>
                <div className="card-body card-body-limit">
                    <Link to={`/drink/${d._id}`}>
                        <h2>{d.name}</h2>
                    </Link>
                    <RatingComponent rating={d.rating} reviewNum = {d.reviewNum}></RatingComponent>
                    <div className="price">
                        {d.price}đ
                    </div>
                    {(
                    <>
                      <li>
                        <div className="row">
                          <div>Số lượng</div>
                          <div>
                            <select
                              value={quantity}
                              onChange={(e) => setquantity(e.target.value)}
                            >
                              {[...Array(5).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      {userInfo && userInfo.role==='user' && <li>
                        <button onClick={addToCartHandler} className="primary block">Thêm vào giỏ hàng</button>
                        <select onChange={(e) => setTopping(e.target.value)} value={topping}>
                          <option value="Mặc định" >Mặc định</option> {/*default topping, whether the drink has topping by default or not. It says clearly in the name so....*/}
                          <option value="Trân châu đen">Trân châu đen</option> {/*black bubble or black pearl*/}
                          <option value="Thạch phô mai">Thạch phô mai</option>
                        </select>
                      </li>}
                      {!userInfo && <li>
                        <button onClick={addToCartHandler} className="primary block">Thêm vào giỏ hàng</button>
                        <select onChange={(e) => setTopping(e.target.value)} value={topping}>
                          <option value="Mặc định" >Mặc định</option> {/*default topping, whether the drink has topping by default or not. It says clearly in the name so....*/}
                          <option value="Trân châu đen">Trân châu đen</option> {/*black bubble or black pearl*/}
                          <option value="Thạch phô mai">Thạch phô mai</option>
                        </select>
                      </li>}
                    </>
                  )}
                </div>
            </div>     
        </div>
    );
}

    