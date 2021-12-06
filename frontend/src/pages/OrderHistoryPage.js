import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { listOfOrders, totalMoneySpent } from '../actions/orderAction';
import DateComponent from '../components/DateComponent';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';






export default function OrderHistoryPage() {



    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;

    const orderAggregate = useSelector(state => state.orderAggregate);
    const {loading: loadingSpending, error: errorSpending, userSpending} = orderAggregate;

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(listOfOrders());
        //alert(userInfo._id);
        dispatch(totalMoneySpent(userInfo._id));
    }, [dispatch])

    return (
        <div>   
            {/* <div className="row center orange-background"> 
                <div>
                    <Link to="/profile" className="linkButton">Back to Profile</Link>
                </div>
            </div> */}
            <h1>LỊCH SỬ MUA HÀNG</h1>
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
                                    <td>{order.isDelivered ? order.paidAt.substring(0, 10): 'Chưa'}</td>
                                    <td>
                                        <button type="button" className="tiny primary" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Details
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
