import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { detailsOfOrder } from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderDetailPage() {
    const params = useParams();
    const id = params.orderId;

    const orderDetail = useSelector(state => state.orderDetail);
    const {order, loading, error} = orderDetail;


    const dispatch = useDispatch();


    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(detailsOfOrder(id));
    }, [dispatch, id]);


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
                                    {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : order && order.paymentMethod=="Cash" ? <div>Tiền mặt</div> : <div>Chắc MOMO ai biết</div>}
                                </p>
                                
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>HÓA ĐƠN</h2>
                                <ul>
                                    {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : order &&
                                    order.orderItems.map((item)=>(
                                        <li key={item.drink} className="row purple">
                                            <div className="row">
                                            <Link to={`/drink/${item.drink}`}><img 
                                                src={item.image}
                                                alt={item.name}
                                                className="tiny"></img></Link>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/drink/${item.drink}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                {item.price} đồng
                                            </div>
                                            
                                        </li>
                                        
                                    ))
                                    }
                                </ul>
                                {order && order.isPaid ? <div>
                                    Đã thanh toán lúc {order.PaidAt}
                                </div> : <div>Chưa thanh toán</div>
                                }
                                {order && order.isDelivered ? <div>
                                    Đã giao
                                </div> : <div>Chưa giao</div>
                                }
                            </div>
                            
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                            Tổng cộng {order && order.orderItems.length} món: {order && order.totalPrice} đồng
                            </h2>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}
