import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { saveShippingInfo } from '../actions/cartAction';
import { createOrder, detailsOfOrder } from '../actions/orderAction';
import { detailsOfUser } from '../actions/userAction';
import { CART_EMPTY } from '../constants/cartConst';
import { ORDER_CREATE_RESET } from '../constants/orderConst';

export default function OrderPage() {


    const [fullName, setFullName] = useState();
    const [shippingAddress, setShippingAddress] = useState();
    const [lat, setLat] = useState(); //latitude
    const [lng, setLng] = useState(); //longtitude

    // setLat(0);
    // setLng(0); these 2 causes infinite loop re-render

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const userDetail = useSelector(state=>state.userDetail);
    const {user} = userDetail;

    const orderCreate = useSelector(state => state.orderCreate);
    const {loading: loadingCreateOrder, success, error: errorCreateOrder, order} = orderCreate;

    // const orderDetail = useSelector(state => state.orderDetail);
    // const {order, loading, error} = orderDetail;
    
    
    const cart = useSelector((state) => state.cart);
    // if(!cart.paymentMethod){
    //     props.history.push('/payment');
    // }


    cart.shippingPrice = 50000; //temporarily fixed, I'll figure out later with GOOGLE MAP API hopefully
    cart.itemsPrice = cart.cartItems.reduce((a, c)=> a + c.price * c.quantity, 0)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    const username = userInfo.name;



    
    const email = userInfo.email;

    const submitHandler =() =>{
        if(userInfo && user){
            //alert(username);
            const phoneNumber = user.phoneNumber; 
            //alert(phoneNumber);
            //alert(email);
        
            dispatch(
                saveShippingInfo({ username, fullName, shippingAddress, email, phoneNumber, lat, lng,})
            );
            dispatch(createOrder({...cart, orderItems: cart.cartItems}));
        
        
            //dispatch(detailsOfOrder(orderId));
        } else{
            navigate('/signin?redirect=order');
        }
    }
    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        //alert(detailsOfUser(userInfo._id));
        dispatch(detailsOfUser(userInfo._id));
        if(success){
            alert(order);
            navigate(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, navigate, success, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="fullname">
                            Họ và tên: 
                        </label>
                        <input id="fullname" type="text" placeholder="Nhập họ tên đầy đủ"value={fullName} onChange={(e)=> setFullName(e.target.value)}>
                        </input>
                        <label htmlFor="address">
                            Địa chỉ: 
                        </label>
                        <input id="shippingAddress" type="text" placeholder="Nhập địa chỉ giao hàng" value={shippingAddress} onChange={(e)=> setShippingAddress(e.target.value)}>
                        </input>
                        <button type="button" onClick={submitHandler} className="primary block">
                            Xác nhận đặt hàng
                        </button>
                </div>
            </form>

            
            
        </div>
    )
}
