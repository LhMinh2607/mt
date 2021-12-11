import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {useParams} from 'react-router-dom';
import { listOfOrders, totalMoneySpent } from '../actions/orderAction';
import { detailsOfUser } from '../actions/userAction';
import DateComponent from '../components/DateComponent';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';






export default function OrderHistoryPage() {

    const params = useParams();
    const id = params.userId;


    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;

    const orderAggregate = useSelector(state => state.orderAggregate);
    const {loading: loadingSpending, error: errorSpending, userSpending} = orderAggregate;

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userDetail = useSelector(state => state.userDetail);
    const {loading: loadingUser, error: errorUser, user} = userDetail;

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        if(userInfo && userInfo.role==='user' && userInfo._id!==id){
            navigate(`/order/history/${userInfo._id}`);
        }
        dispatch(listOfOrders(id));
        dispatch(detailsOfUser(id));
        dispatch(totalMoneySpent(id));

    }, [dispatch])

    return (
        <div>   
            {/* <div className="row center cyan-background"> 
                <div>
                    <Link to="/profile" className="linkButton">Back to Profile</Link>
                </div>
            </div> */}
            <h1>LỊCH SỬ MUA HÀNG CỦA {user && user.name}</h1>
            {
                loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="error">{error}</MessageBox>
                :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>MÃ</th>
                                <th>NGÀY</th>
                                <th>TỔNG THÀNH TIỀN</th>
                                <th>THANH TOÁN</th>
                                <th>GIAO HÀNG</th>
                                <th>CHI TIẾT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order)=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td><DateComponent passedDate = {order.createdAt}></DateComponent></td>
                                    <td>{order.totalPrice} đồng</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10): 'Chưa'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10): 'Chưa'}</td>
                                    <td>
                                        <button type="button" className="tiny primary" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                            <tr>
                                <td></td>
                                <th>Tổng số tiền đã tiêu thụ  </th>
                                
                                {
                                    loadingSpending ? (<LoadingBox></LoadingBox>) : errorSpending ? (<MessageBox variant="error">{error}</MessageBox>)
                                    : (
                                        userSpending.length !== 0 ?  
                                        (<td>{userSpending[0].totalMoneySpent} đồng</td>) :
                                        (<td>0 đồng</td>)
                                    )
                                }
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        
                    </table>
                )
            }
        </div>
    );
}
