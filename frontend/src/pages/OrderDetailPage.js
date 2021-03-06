import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router';
import { detailsOfOrder, payOrder, verifyDeliveredOrder, verifyPaidOrder } from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DateComponent from '../components/DateComponent';
import axios from 'axios';
import {ORDER_PAY_RESET} from '../constants/orderConst';
import {PayPalButton} from 'react-paypal-button-v2';

export default function OrderDetailPage() {
    const params = useParams();
    const id = params.orderId;

    const orderDetail = useSelector(state => state.orderDetail);
    const {order, loading, error} = orderDetail;

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const orderPay = useSelector(state=> state.orderPay);
    const {loading: LoadingPay, error: payError, success: paySuccess} = orderPay;

    const [sdkReady, setSdkReady] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const verifyPaid = () =>{
        dispatch(verifyPaidOrder(id));
        window.location.reload();
    }

    const verifyDelivered= () =>{
        dispatch(verifyDeliveredOrder(id));
        window.location.reload();
    }

    const successPaymentHandler = (paymentResult) =>{
        //pay order
        dispatch(payOrder(order, paymentResult));
        // updateTotalSpent(order.totalPrice);
    }

    

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        if(userInfo && userInfo.role==='user' && order && userInfo._id!==order.user){
            navigate(`/order/history/${userInfo._id}`);
        }
        dispatch(detailsOfOrder(id));
        if(true){
            const addPayPalScript = async()=>{
                const {data} = await axios.get('/api/config/paypal');
                const script = document.createElement('script');
                script.type="text/javascript";
                script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
                script.async=true;
                script.onLoad = () => {
                    setSdkReady(true);
                };
                document.body.appendChild(script);
            };
            if(!order || paySuccess || (order && order._id !== id)) {
                dispatch({type: ORDER_PAY_RESET});
                dispatch(detailsOfOrder(id));
            }else{
                if (!order.isPaid) {
                    if (!window.paypal) {
                      addPayPalScript();
                    } else {
                      setSdkReady(true);
                    }
                }
            }
        }

        
    }, [dispatch, id, sdkReady, paySuccess]);


    return (
        <div>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>THANH TO??N</h2>
                                <p>
                                    <strong>Ph????ng th???c thanh to??n: </strong>
                                    {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : order && order.paymentMethod=="Cash" ? <div>Ti???n m???t</div> : order.paymentMethod=="paypal" &&<div>Paypal</div>}
                                </p>
                                
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>H??A ????N</h2>
                                <h1>{order && <DateComponent passedDate={order.createdAt}></DateComponent>}</h1>
                                <ul>
                                    {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : order &&
                                    <><li>Username: {order.shippingInfo.username}</li>
                                    <li>H??? v?? t??n: {order.shippingInfo.fullName}</li>
                                    <li>Email: {order.shippingInfo.email}</li>
                                    <li>S??T: {order.shippingInfo.phoneNumber}</li>
                                    <li>?????a ch???: {order.shippingInfo.shippingAddress}</li></>}
                                    {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : order &&
                                    order.orderItems.map((item)=>(
                                        <li key={item.drink} className="row purple">
                                            <Link to={`/drink/${item.drink}`}><div className="row effect effect-glitch" style={{backgroundImage: `url(${item.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}>
                                            <img 
                                                src={item.image}
                                                alt={item.name}
                                                className="tiny effect-img"></img>
                                            </div></Link>
                                            <div className="min-30">
                                                <Link to={`/drink/${item.drink}`}>{item.name}</Link>
                                                <div className="row">
                                                    Topping: {item.topping}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div>
                                                    ????n gi??: {item.price} ?????ng
                                                </div>
                                                <div>
                                                    Gi?? topping: {item.toppingPrice} ?????ng
                                                </div>
                                                <div>
                                                    S??? l?????ng: {item.quantity}
                                                </div>
                                                <div>
                                                    <strong>T???ng: {item.quantity*(item.price+item.toppingPrice)} ?????ng </strong>
                                                </div>
                                            </div>
                                        </li>
                                        
                                    ))
                                    }
                                    <li>
                                    <strong>Ph?? giao h??ng</strong>: {order && order.shippingPrice} ?????ng
                                    </li>
                                    <h2>
                                        T???ng c???ng {order && order.orderItems.reduce((a, c)=> a + c.quantity, 0)} m??n: {order && order.totalPrice} ?????ng
                                    </h2>
                                </ul>
                                {order && order.isPaid ? <div>
                                    <strong>???? thanh to??n l??c</strong> <DateComponent passedDate={order.paidAt}></DateComponent>
                                </div> : <div>Ch??a thanh to??n</div>
                                }
                                {userInfo && userInfo.role==="admin" && order && order.paymentMethod==='Cash' && order.isPaid === false &&
                                <div>
                                    <button className='admin' onClick={verifyPaid}>X??C NH???N ???? THANH TO??N (TI???N M???T)</button>    
                                </div>}
                                {order && order.isDelivered ? <div>
                                    <strong>???? giao</strong> <DateComponent passedDate={order.deliveredAt}></DateComponent>
                                </div> : <div><strong>Ch??a giao</strong></div>
                                }
                                
                                {userInfo && userInfo.role==="admin" && order && order.paymentMethod==='Cash' && order.isDelivered === false &&
                                <div>
                                    <button className='admin' onClick={verifyDelivered}>X??C NH???N ???? GIAO H??NG</button>    
                                </div>}
                            </div>
                            
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                            T???ng c???ng {order && order.orderItems.reduce((a, c)=> a + c.quantity, 0)} m??n: {order && order.totalPrice} ?????ng
                            </h2>
                            {/* {userInfo && userInfo.role}
                            {order && order.paymentMethod} */}
                            {userInfo.role==='user' && order && order.paymentMethod==='paypal' &&
                                !order.isPaid && (
                                    <li>
                                        
                                        {!sdkReady?
                                        (<LoadingBox></LoadingBox>)
                                        :(
                                            <>
                                            {payError && (
                                                <MessageBox variant="error"></MessageBox>
                                            )}
                                            {
                                                LoadingPay && <LoadingBox></LoadingBox>
                                            }
                                            
                                            <PayPalButton amount={Math.round(order.totalPrice/23000)} onSuccess={successPaymentHandler}></PayPalButton>
                                            </>
                                        )
                                    }
                                    </li>
                                )
                            }
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}
