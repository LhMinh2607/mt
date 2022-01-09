import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { savePaymentMethod, saveShippingInfo } from '../actions/cartAction';
import { createOrder, detailsOfOrder } from '../actions/orderAction';
import { detailsOfUser } from '../actions/userAction';
import { CART_EMPTY } from '../constants/cartConst';
import { ORDER_CREATE_RESET } from '../constants/orderConst';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';

export default function OrderPage() {


    const [fullName, setFullName] = useState();
    const [shippingAddress, setShippingAddress] = useState();
    const [lat, setLat] = useState(); //latitude
    const [lng, setLng] = useState(); //longtitude
    const [paymentMethod, setPaymentMethod] = useState('cash');

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
    cart.itemsPrice = cart.cartItems.reduce((a, c)=> a + (c.price + c.toppingPrice) * c.quantity, 0)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    const username = userInfo.name;


    //API-KEY=AIzaSyDLUeXVxDxuJBTpK2ASfc_2UFEJk6-Hk_k //google map api
    const latitude = 10.846497226619887;
    // 59.955413;
    // 10.846497;
    // 10.846497226619887;
    const longitude = 106.7942787886718;
    // 30.337844;
    // 106.794278;
    // 106.7942787886718;
    const defaultProps = {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: 11
      };

    const K_CIRCLE_SIZE = 30;
    const K_STICK_SIZE = 10;
    const K_STICK_WIDTH = 3;

    //from google-map-react/google-map-react document
    const _distanceToMouse = (markerPos, mousePos, markerProps) => {
        const x = markerPos.x;
        // because of marker non symmetric,
        // we transform it central point to measure distance from marker circle center
        // you can change distance function to any other distance measure
        const y = markerPos.y - K_STICK_SIZE - K_CIRCLE_SIZE / 2;

        // and i want that hover probability on markers with text === 'A' be greater than others
        // so i tweak distance function (for example it's more likely to me that user click on 'A' marker)
        // another way is to decrease distance for 'A' marker
        // this is really visible on small zoom values or if there are a lot of markers on the map
        const distanceKoef = markerProps.text !== 'A' ? 1.5 : 1;

        // it's just a simple example, you can tweak distance function as you wish
        return distanceKoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
    }
    
    // const renderMarkers = (map, maps) => {
    //     let marker = new maps.Marker({
    //      position: { lat: latitude, lng: longitude },
    //      map,
    //      title: 'Trụ sở quán'
    //      });
    //      return marker;
    //    };

    const onMapClick = (t, map, ) => {
        const lat = latitude;
        const lng = longitude;

    }

    
    const email = userInfo.email;

    const submitHandler =() =>{
        if(userInfo && user){
            //alert(username);
            const phoneNumber = user.phoneNumber; 
            //alert(phoneNumber);
            //alert(email);
            alert(paymentMethod);
            dispatch(
                saveShippingInfo({ username, fullName, shippingAddress, email, phoneNumber, lat, lng,})
            );
            dispatch(savePaymentMethod(paymentMethod));
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
                        <div style={{ height: '50vh', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyDLUeXVxDxuJBTpK2ASfc_2UFEJk6-Hk_k' }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals 
                                hoverDistance={K_CIRCLE_SIZE / 2}
                                // distanceToMouse={_distanceToMouse}
                                onClick={onMapClick}
                                >
                                <Marker
                                    lat={latitude}
                                    lng={longitude}
                                    text={"Trụ sở quán"}
                                /> 

                               
                            </GoogleMapReact>
                        </div>
                        <input id="shippingAddress" type="text" placeholder="Nhập địa chỉ giao hàng" value={shippingAddress} onChange={(e)=> setShippingAddress(e.target.value)}>
                        </input>
                        
                        <div className='box'><select id="payment" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option value='cash'>Tiền mặt</option>
                                <option value='paypal'>Paypal / thẻ quốc tế</option>
                            </select></div>
                        <button type="button" onClick={submitHandler} className="primary block">
                            Xác nhận đặt hàng
                        </button>
                </div>
            </form>

            
            
        </div>
    )
}
