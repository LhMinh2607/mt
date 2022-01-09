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
                                <h2>THANH TOÁN</h2>
                                <p>
                                    <strong>Phương thức thanh toán: </strong>
                                    {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : order && order.paymentMethod=="Cash" ? <div>Tiền mặt</div> : order.paymentMethod=="paypal" &&<div>Paypal</div>}
                                </p>
                                
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>HÓA ĐƠN</h2>
                                <h1>{order && <DateComponent passedDate={order.createdAt}></DateComponent>}</h1>
                                <ul>
                                    {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : order &&
                                    <><li>Username: {order.shippingInfo.username}</li>
                                    <li>Họ và tên: {order.shippingInfo.fullName}</li>
                                    <li>Email: {order.shippingInfo.email}</li>
                                    <li>SĐT: {order.shippingInfo.phoneNumber}</li>
                                    <li>Địa chỉ: {order.shippingInfo.shippingAddress}</li></>}
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
                                                    Đơn giá: {item.price} đồng
                                                </div>
                                                <div>
                                                    Giá topping: {item.toppingPrice} đồng
                                                </div>
                                                <div>
                                                    Số lượng: {item.quantity}
                                                </div>
                                                <div>
                                                    <strong>Tổng: {item.quantity*(item.price+item.toppingPrice)} đồng </strong>
                                                </div>
                                            </div>
                                        </li>
                                        
                                    ))
                                    }
                                    <li>
                                    <strong>Phí giao hàng</strong>: {order && order.shippingPrice} đồng
                                    </li>
                                    <h2>
                                        Tổng cộng {order && order.orderItems.reduce((a, c)=> a + c.quantity, 0)} món: {order && order.totalPrice} đồng
                                    </h2>
                                </ul>
                                {order && order.isPaid ? <div>
                                    <strong>Đã thanh toán lúc</strong> <DateComponent passedDate={order.paidAt}></DateComponent>
                                </div> : <div>Chưa thanh toán</div>
                                }
                                {userInfo && userInfo.role==="admin" && order && order.paymentMethod==='Cash' && order.isPaid === false &&
                                <div>
                                    <button className='admin' onClick={verifyPaid}>XÁC NHẬN ĐÃ THANH TOÁN (TIỀN MẶT)</button>    
                                </div>}
                                {order && order.isDelivered ? <div>
                                    <strong>Đã giao</strong> <DateComponent passedDate={order.deliveredAt}></DateComponent>
                                </div> : <div><strong>Chưa giao</strong></div>
                                }
                                
                                {userInfo && userInfo.role==="admin" && order && order.paymentMethod==='Cash' && order.isDelivered === false &&
                                <div>
                                    <button className='admin' onClick={verifyDelivered}>XÁC NHẬN ĐÃ GIAO HÀNG</button>    
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
                            Tổng cộng {order && order.orderItems.reduce((a, c)=> a + c.quantity, 0)} món: {order && order.totalPrice} đồng
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
