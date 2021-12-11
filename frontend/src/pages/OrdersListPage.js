import React, { useEffect } from 'react'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { filterAllOrders, getAllOrdersDate, getAllOrdersMonth, getAllOrdersYear, getMaxTotalOrders, listOfAllOrders, listOfDeliveredOrders, listOfPaidOrders, listOfSortedOrdersByDate, listOfSortedOrdersByTotal } from '../actions/orderAction';
import { listOfUsers } from '../actions/userAction';
import DateComponent from '../components/DateComponent';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderListsPage() {



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allOrderList = useSelector(state=>state.allOrderList);
    const {loading, error, ordersList} = allOrderList; 

    const allOrderFilterByDate = useSelector(state=>state.allOrderFilterByDate);
    const {loading: loadingFilter, error: errorFilter, filteredOrders} = allOrderFilterByDate;

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [paidOrder, setPaidOrder] = useState("");
    const [deliveredOrder, setDeliveredOrder] = useState("");
    const [orderTotalPrice, setOrderTotalPrice] = useState("");
    const [sortingCondition, setSortingCondition] = useState("");

    const allOrderDate = useSelector(state=>state.allOrderDate);
    const {loading: loadingDate, error: errorDate, ordersDate} = allOrderDate;

    const allOrderMonth = useSelector(state=>state.allOrderMonth);
    const {loading: loadingMonth, error: errorMonth, ordersMonth} = allOrderMonth;

    const allOrderYear = useSelector(state=>state.allOrderYear);
    const {loading: loadingYear, error: errorYear, ordersYear} = allOrderYear;

    const userList = useSelector(state=>state.userList);
    const {loading: loadingUser, error: errorUser, users} = userList;

    const orderPaid = useSelector(state=>state.orderPaid);
    const {loading: loadingPaidOrder, error: errorPaidOrder, paidOrders} = orderPaid;

    const orderDelivered = useSelector(state=>state.orderDelivered);
    const {loading: loadingDeliveredOrder, error: errorDeliveredOrder, deliveredOrders} = orderDelivered;

    const orderMaxTotal = useSelector(state=>state.orderMaxTotal);
    const {loading: loadingMaxTotalOrder, error: errorMaxTotalOrder, maxTotalOrders} = orderMaxTotal;

    const orderSortedByDate = useSelector(state=>state.orderSortedByDate);
    const {loading: loadingSortedOrderByDate, error: errorSortedOrderByDate, sortedOrdersByDate} = orderSortedByDate;

    const orderSortedByTotal = useSelector(state=>state.orderSortedByTotal);
    const {loading: loadingSortedOrderByTotal, error: errorSortedOrderByTotal, sortedOrdersByTotal} = orderSortedByTotal;


    
    const filterByYearHandler = (e) =>{
        setPaidOrder("");
        setDeliveredOrder("");
        setOrderTotalPrice("");
        setSortingCondition("");
        if(e.target.value==="")
        {
            setMonth("");
            setDay("");
            setYear("");
        }else{
            setYear(e.target.value);
            setMonth("");
            setDay("");
            dispatch(filterAllOrders(e.target.value, "null", "null"));
            dispatch(getAllOrdersMonth(e.target.value)); //month
        }
        
    }

    const filterByMonthHandler = (e) =>{
        setMonth(e.target.value);
        setDay("");
        dispatch(filterAllOrders(year, e.target.value, "null"));
        dispatch(getAllOrdersDate(e.target.value, year)); //day of month
    }

    const filterByDayHandler = (e) =>{
        setDay(e.target.value);
        dispatch(filterAllOrders(year, month, e.target.value));
    }

    const filterByIsPaid = (e) =>{
        setPaidOrder(e.target.value);
        setSortingCondition("");
        setDeliveredOrder("");
        setYear("");
        setMonth("");
        setDay("");
        if(e.target.value==="yes")
        {
            const boo = 'true';
            dispatch(listOfPaidOrders(boo));
        }else{
            const boo = 'false';
            dispatch(listOfPaidOrders(boo));
        }
    }

    const filterByIsDelivered = (e) =>{
        setDeliveredOrder(e.target.value);
        setSortingCondition("");
        setPaidOrder("");
        setYear("");
        setMonth("");
        setDay("");
        if(e.target.value==="yes")
        {
            const boo = 'true';
            dispatch(listOfDeliveredOrders(boo));
        }else{
            const boo = 'false';
            dispatch(listOfDeliveredOrders(boo));
        }
    }

    const filterByTotalPrice = (e) =>{
        setOrderTotalPrice(e.target.value);
        setSortingCondition("");
        setDeliveredOrder("");
        setPaidOrder("");
        setYear("");
        setMonth("");
        setDay("");
        if(e.target.value==="max")
        {
            dispatch(getMaxTotalOrders());
        }
        
    }

    const sortOrders = (e) =>{
        setSortingCondition(e.target.value);
        setOrderTotalPrice("");
        setDeliveredOrder("");
        setPaidOrder("");
        setYear("");
        setMonth("");
        setDay("");
        if(e.target.value.includes('date'))
        {
            dispatch(listOfSortedOrdersByDate(e.target.value));
        }
        if(e.target.value.includes("total"))
        {
            dispatch(listOfSortedOrdersByTotal(e.target.value));
        }
    }

    //const yearsArray = [2019, 2020, 2021];
    const monthsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const daysArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    //const averageIncomePerMonth = 0;


    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(listOfAllOrders());
        dispatch(listOfUsers());
        setTimeout(()=>{
            dispatch(getAllOrdersYear()); //year
        }, 100);
        
    }, []);

    return (
        <div>
            {/* <div className="row center">
                <div className="divHoldingLinkButton">
                    <Link to="/profile" className="admin linkButton">Về trang cá nhân<i className="fa fa-book"></i></Link>
                </div>
            </div> */}
            <div className="row">
                <div className="col-2">
                        <div className="row center">
                            {ordersList && (<h1>Tổng thu nhập: {ordersList.reduce((a, b)=> b.isPaid ? a+b.totalPrice : a+0, 0)} đồng</h1>)}
                        </div>
                        <div className="row center">
                            {ordersList && (<h2>Tổng số đơn hàng: {ordersList.length} </h2>)}
                        </div>
                        <div className="row center">
                            {ordersList && (<h2>Số đơn hàng đã thanh toán: {ordersList.filter((order)=>order.isPaid).length} </h2>)}
                        </div>
                        <div className="row center">
                            {ordersList && (<h2>Số đơn hàng chưa thanh toán: {ordersList.filter((order)=>!order.isPaid).length} </h2>)}
                        </div>
                        <div className="row center">
                            {ordersList && (<h2>Thu nhập trung bình cho mỗi đơn hàng (đã thanh toán): {Math.floor(ordersList.reduce((a, b)=>b.isPaid ? a + b.totalPrice : a+0, 0)/ordersList.filter((order)=>order.isPaid).length)} đồng </h2>)}
                        </div>
                </div>
                {year!=="" && <div className="col-1">
                    
                        <div className="row center">
                            {filteredOrders && (<h1>Thu nhập (đã lọc): {filteredOrders.reduce((a, b)=> b.isPaid ? a+ b.totalPrice : a+0, 0)} đồng </h1>)}
                        </div>
                        <div className="row center">  
                            {filteredOrders && (<h1>Số đơn hàng (đã lọc): {filteredOrders.length} </h1>)}
                        </div>
                        <div className="row center">
                            {ordersList && (<h1>Thu nhập trung bình mỗi tháng: {Math.floor(ordersList.reduce((a, b)=> b.isPaid ? a + b.totalPrice : a + 0, 0)/12)} đồng</h1>)}
                        </div>
                    </div>}
                <div className="col-1 card">
                    <div className="row">
                        <div>
                            <div className="row center">Năm:</div>
                            <select id="years" onChange={filterByYearHandler} value={year}>
                                <option hidden value="">Chọn năm</option>
                                <option value="">Hiện hết</option>
                                {ordersYear && ( 
                                    (ordersYear.map(i => (
                                        <option value={i._id.year}>{i._id.year}</option>
                                    ))))
                                }
                            </select>
                        </div>
                        <div>
                            <div className="row center">Tháng:</div>
                            <select id="months" onChange={filterByMonthHandler}  value={month}>
                                <option hidden value="">Chọn tháng</option>
                                <option>Bỏ trống</option>
                                {ordersMonth && ( 
                                    (ordersMonth.map(i=>(
                                        <option value={i._id.month}>{i._id.month}</option>
                                    ))))
                                }
                                

                            </select>
                        </div>
                        <div>
                            <div className="row center">Ngày:</div>
                            <select id="days" onChange={filterByDayHandler}  value={day}>
                                <option hidden value="">Chọn ngày</option>
                                <option>Bỏ trống</option>
                                {ordersDate && ( 
                                    (ordersDate.map(i=>(
                                        <option value={i._id.day}>{i._id.day}</option>
                                    ))))
                                }
                                
                            </select>
                        </div>
                        <div>
                            <select onChange={sortOrders} value={sortingCondition}>
                                <option value='date-desc'>Ngày Giảm dần</option>
                                <option value='date-asc'>Ngày Tăng dần</option>
                                <option value='total-desc'>Thành tiền Giảm dần</option>
                                <option value='total-asc'>Thành tiền Tăng dần</option>
                            </select>
                        </div>
                    </div>
                    
                   
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="row center  ">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>MÃ ĐƠN HÀNG</th>
                                    <th>MÃ NGƯỜI DÙNG</th>
                                    <th>TÊN NGƯỜI DÙNG</th>
                                    <th>TÊN ĐẦY ĐỦ</th>
                                    <th>TỔNG THÀNH TIỀN<select onChange={filterByTotalPrice} value={orderTotalPrice}>
                                            <option value="">Tất cả</option>
                                            <option value='max'>Lớn nhất</option>
                                            <option value='no'>hmm</option>
                                        </select></th>
                                    <th>THANH TOÁN<select onChange={filterByIsPaid} value={paidOrder}>
                                            <option value="">Tất cả</option>
                                            <option value='yes'>Rồi</option>
                                            <option value='no'>Chưa</option>
                                        </select></th>
                                    <th>GIAO HÀNG <select onChange={filterByIsDelivered} value={deliveredOrder}>
                                            <option value="">Tất cả</option>
                                            <option value='yes'>Rồi</option>
                                            <option value='no'>Chưa</option>
                                        </select></th>
                                    <th>CHI TIẾT</th>
                                </tr>
                            </thead>
                            <tbody>
                            {year==="" && paidOrder==="" && deliveredOrder==="" && orderTotalPrice==="" && sortingCondition==="" && (ordersList && (loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> :
                                ordersList.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} đồng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Chưa</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Chưa</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                                Chi tiết
                                            </button></td>
                                        </tr>)))}
                                    </>
                                ))))
                                
                            }
                            {year!=="" && (filteredOrders && (loadingFilter ? <LoadingBox></LoadingBox> : errorFilter ? <MessageBox variant="error">{errorFilter}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                filteredOrders.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} đồng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Chưa</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Chưa</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi tiết
                                        </button></td>
                                        </tr>)))}
                                    </>
                                ))))
                                
                            }
                            {paidOrder!=="" && (loadingPaidOrder ? <LoadingBox></LoadingBox> : errorPaidOrder ? <MessageBox variant="error">{errorPaidOrder}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                paidOrders.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} đồng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Chưa</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Chưa</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi tiết
                                        </button></td>
                                        </tr>)))}
                                    </>
                                )))
                                
                            }
                            {deliveredOrder!=="" && (loadingDeliveredOrder ? <LoadingBox></LoadingBox> : errorDeliveredOrder ? <MessageBox variant="error">{errorDeliveredOrder}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                deliveredOrders.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} đồng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Chưa</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Chưa</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi tiết
                                        </button></td>
                                        </tr>)))}
                                    </>
                                )))
                                
                            }
                            {orderTotalPrice==="max" && (loadingMaxTotalOrder ? <LoadingBox></LoadingBox> : errorMaxTotalOrder ? <MessageBox variant="error">{errorMaxTotalOrder}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                maxTotalOrders.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} đồng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Chưa</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Chưa</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi tiết
                                        </button></td>
                                        </tr>)))}
                                    </>
                                )))
                                
                            }
                            {sortingCondition.includes("date") && (loadingSortedOrderByDate ? <LoadingBox></LoadingBox> : errorSortedOrderByDate ? <MessageBox variant="error">{errorSortedOrderByDate}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                sortedOrdersByDate.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} đồng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Chưa</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Chưa</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi tiết
                                        </button></td>
                                        </tr>)))}
                                    </>
                                )))
                                
                            }
                            {sortingCondition.includes("total") && (loadingSortedOrderByTotal ? <LoadingBox></LoadingBox> : errorSortedOrderByTotal ? <MessageBox variant="error">{errorSortedOrderByTotal}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                sortedOrdersByTotal.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} đồng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Chưa</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Chưa</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi tiết
                                        </button></td>
                                        </tr>)))}
                                    </>
                                )))
                                
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            
            
            
        </div>
    )
}
