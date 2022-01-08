import React, { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { listOfDrinks } from '../actions/drinkAction';
import MessageBox from '../components/MessageBox';

export default function CartPage(props){

    const params = useParams();
    const id = params.drinkId;
    const quantity = Number(params.quantity);
    const topping = params.topping;

    const [toppingPrice, setToppingPrice] = useState(0); 
    
    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo, loading, error} = userSignin;
  

    const navigate = useNavigate();


    const cart = useSelector(state => state.cart);
    const {cartItems}=cart;

    const dispatch = useDispatch();

    const drinkList = useSelector((state) => state.drinkList);
    const {loading: loadingList, error: errorList, drinks} = drinkList;



    const removeFromCartHandler = (id, itemTopping) => {
        //remove item
        //alert(id); results in undefined, ok my bad
        dispatch(removeFromCart(id, itemTopping));

    }

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        // experimental
        // const arr = [{dd: 'a', tt: 'b'}, {dd: 'a', tt: 'd'}, {dd: 'c', tt: 'd'}];
        // const arrR = arr.filter((x) => (x.dd !== 'a' || x.tt !='b')); //hmmm may be because of `!==`, `&&` must be flipped to `||`
        //alert(JSON.stringify(arrR));
        //this experiment walks so the code in cartReducer could fly lol
        dispatch(listOfDrinks());
        if(id){
            //alert(id);
            //alert(quantity);
            if(topping!=='Mặc định'){
                setToppingPrice(10000);
                //alert(toppingPrice);
                dispatch(addToCart(id, quantity, topping, toppingPrice));
            }else{
                dispatch(addToCart(id, quantity, topping, toppingPrice));
            }
        }
    }, [dispatch, id, toppingPrice]);

    

    const checkOutHandler =() =>{
        if(userInfo){
            navigate('/order');
        } else{
            navigate('/signin?redirect=order');
        }
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Giỏ hàng</h1>
                {cartItems.length === 0
                ? 
                <MessageBox>
                    <div className="purple card card-body">
                        Giỏ hàng trống
                        <Link to="/drink"> Mua liền!!!</Link>
                    </div>
                </MessageBox> 
                :
                (
                <ul>
                    {cartItems.map((item)=>(
                        <li key={item.drink, item.topping} className="row purple left">
                            <div className="row top">
                            <Link to={`/drink/${item.drink}`}>
                                <div className='effect effect-glitch' style={{backgroundImage: `url(${item.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}>
                                    <img 
                                    src={item.image}
                                    alt={item.name}
                                    className="tiny effect-img effect-glitch"></img>
                                </div></Link>
                                <li className="col-1">
                                    <Link to={`/drink/${item.drink}`}>{item.name}</Link>
                                </li>
                            </div>
                            <li className="row top">
                                <li className="col-2">
                                    {item.price} đồng
                                </li>
                                <li className="col-2">
                                    Topping: {item.topping}
                                </li>
                                <li className="col-2">
                                    Giá Topping: {item.toppingPrice}
                                </li>
                            </li>
                            
                            <li className="row top">
                            <div className='box'><select
                                    value={item.quantity}
                                    onChange={(e) =>
                                        dispatch(
                                        addToCart(item.drink, Number(e.target.value), item.topping, item.toppingPrice)
                                        )
                                    }
                                    >
                                    {drinks && drinks.map(d=>(
                                        d._id === item.drink &&
                                        [...Array(d.quantity).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        ))
                                    )) }
                                </select></div>
                            </li>
                            <li>
                                <button className="primary" type="button" onClick={()=> removeFromCartHandler(item.drink, item.topping)}>
                                    Gỡ
                                </button>
                            </li>
                        </li>
                    ))
                    }
                </ul>
                )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Tổng thành tiền của ({cartItems.reduce((a, c) => a + Number(c.quantity), 0)} sản phẩm) : {cartItems.reduce((a, c)=> a + (c.toppingPrice + c.price) * Number(c.quantity), 0)} đồng 
                            </h2>
                        </li>
                        <li>
                            <Link to="/drink" className="primary block" hidden={cartItems.length === 0}>
                                Tiếp tục mua
                            </Link>
                        </li>
                        <li>
                            <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length === 0}>
                                Đặt hàng
                            </button>
                        </li>
                        <li>
                        
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}