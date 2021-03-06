import React, { useEffect } from 'react'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { filterAllOrders, getAllOrdersDate, getAllOrdersMonth, getAllOrdersYear, getMaxTotalOrders, getOrderedDrinkCount, listOfAllOrders, listOfDeliveredOrders, listOfOrdersIncomePerMonth, listOfPaidOrders, listOfSortedOrdersByDate, listOfSortedOrdersByTotal } from '../actions/orderAction';
import { listOfUsers } from '../actions/userAction';
import DateComponent from '../components/DateComponent';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import { BarChart, Bar, XAxis, YAxis } from 'recharts';
// import {Area, CirclePie, BarMetric} from 'react-simple-charts'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  import { Bar, Pie } from 'react-chartjs-2';
//   import faker from 'faker';
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default function OrderListsPage() {



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allOrderList = useSelector(state=>state.allOrderList);
    const {loading, error, ordersList} = allOrderList; 

    const allOrderFilterByDate = useSelector(state=>state.allOrderFilterByDate);
    const {loading: loadingFilter, error: errorFilter, filteredOrders} = allOrderFilterByDate;

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [monthWithZero, setMonthWithZero] = useState("");
    const [year, setYear] = useState("all");

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

    const orderIncomePerMonthList = useSelector(state=>state.orderIncomePerMonthList);
    const {loading: loadingIncomePerMonthList, error: errorIncomePerMonthList, incomePerMonthList} = orderIncomePerMonthList;

    const drinkOrderedCount = useSelector(state=>state.drinkOrderedCount);
    const {loading: loadingDrinkCount, error: errorDrinkCount, orderedDrinkCount} = drinkOrderedCount;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
      );
    
    ChartJS.register(
        ArcElement, Tooltip, Legend
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Bi???u ?????',
            },
        },
        scales: {
            y: [{
              scaleLabel: {
                display: true,
                labelString: '?????ng',
                ticks: {
                    fontSize: 40
                }
              }
            }],
            x: [{
              scaleLabel: {
                display: true,
                labelString: 'Th??ng',
                ticks: {
                    fontSize: 40
                }
              }
            }],
          }     
    };


    const options2 = {
        responsive: true,
        maintainAspectRatio: true,
        // plugins: {
        //     legend: {
        //     position: 'top',
        //     },
        //     title: {
        //     display: true,
        //     text: 'Bi???u ????? tr?? s???a theo s??? ????n h??ng',
        //     },
        // },
    };

    

    // const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //         label: 'Dataset 1',
    //         data: labels.map(() => 2),
    //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //         },
    //         {
    //         label: 'Dataset 2',
    //         data: labels.map(() => 5),
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };

    

    
    const filterByYearHandler = (e) =>{
        setPaidOrder("");
        setDeliveredOrder("");
        setOrderTotalPrice("");
        setSortingCondition("");
        
        if(e.target.value==="all")
        {
            setMonth("");
            setMonthWithZero("");
            setDay("");
            setYear("all");
            dispatch(listOfOrdersIncomePerMonth("all"));
        }else{
            setYear(e.target.value);
            setMonth("");
            setMonthWithZero("");
            setDay("");
            dispatch(filterAllOrders(e.target.value, "null", "null"));
            dispatch(getAllOrdersMonth(e.target.value)); //month
            dispatch(listOfOrdersIncomePerMonth(e.target.value));
        }
        
    }

    const filterByMonthHandler = (e) =>{
        setMonth(e.target.value);
        if(Number(e.target.value)<10){
            setMonthWithZero("0"+e.target.value);
        }else{
            setMonthWithZero(e.target.value);
        }
        setDay("");
        if(e.target.value!==""){
            dispatch(filterAllOrders(year, e.target.value, "null"));
        }else{
            dispatch(filterAllOrders(year, "null", "null"));
        }
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
        setYear("all");
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
        setYear("all");
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
        setYear("all");
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
        setYear("all");
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


    //example data to test excel exporter
    // const dataSet3 = [
    //     {
    //         shippingInfo: {
    //           username: 'T??n Th???t H???c',
    //           fullName: 'T??n Th???t H???c',
    //           shippingAddress: 'TPHCM',
    //           email: 'tonthathoc@gmail.com',
    //           phoneNumber: '036999199'
    //         },
    //         _id: '61acaf995539ea271a6ec9e4',
    //         orderItems: [
    //           {
    //             name: 'S???a t????i tr??n ch??u ???????ng ??en',
    //             image: 'https://vietgle.vn/wp-content/uploads/2020/07/sua-tuoi-tran-chau-tu-lam-tai-nha-thom-ngon.jpg',
    //             price: 25000,
    //             drink: '61a196c925530fee2b855cac',
    //             topping: 'M???c ?????nh',
    //             toppingPrice: 0,
    //             _id: '61acaf995539ea271a6ec9e5',
    //             quantity: 1
    //           }
    //         ],
    //         paymentMethod: 'Cash',
    //         itemsPrice: 25000,
    //         totalPrice: 75000,
    //         shippingPrice: 50000,
    //         user: '61a3769f2ff60281c79bf18d',
    //         isPaid: true,
    //         isDelivered: true,
    //         createdAt: '2021-12-05T12:24:57.983Z',
    //         updatedAt: '2021-12-05T12:24:57.983Z',
    //         __v: 0,
    //         deliveredAt: '2021-12-06T13:21:04.308Z',
    //         paidAt: '2021-12-06T13:21:04.308Z'
    //       },
    //       {
    //         shippingInfo: {
    //           username: 'Kh??ng Ph???i Long',
    //           fullName: 'Kh??ng Ph???i Long',
    //           shippingAddress: 'B??nh Th?????ng',
    //           email: 'disisnotlong@gmail.com',
    //           phoneNumber: '2002123117'
    //         },
    //         _id: '61ad7a72ad5b8a24c9db7657',
    //         orderItems: [
    //           {
    //             name: 'Tr?? s???a tr??n ch??u ???????ng ??en',
    //             image: 'https://cdn.dayphache.edu.vn/wp-content/uploads/2019/02/519cb84dfa56f4e64bd73c0393e49890.jpg',
    //             price: 20000,
    //             drink: '61a198a125530fee2b855cae',
    //             topping: 'M???c ?????nh',
    //             toppingPrice: 0,
    //             quantity: 10,
    //             _id: '61ad7a72ad5b8a24c9db7658'
    //           }
    //         ],
    //         paymentMethod: 'Cash',
    //         itemsPrice: 200000,
    //         totalPrice: 250000,
    //         shippingPrice: 50000,
    //         user: '61a37b952ff60281c79bf1b5',
    //         isPaid: true,
    //         isDelivered: true,
    //         createdAt: '2021-12-06T02:50:26.201Z',
    //         updatedAt: '2021-12-06T02:50:26.201Z',
    //         __v: 0,
    //         deliveredAt: '2021-12-06T02:50:26.201Z',
    //         paidAt: '2021-12-06T02:50:26.201Z'
    //       }
    // ]

    //Math.floor(Math.random()*16777215).toString(16);
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(listOfAllOrders());
        dispatch(listOfUsers());
        dispatch(listOfOrdersIncomePerMonth("all"));
        dispatch(getOrderedDrinkCount());
        setTimeout(()=>{
            dispatch(getAllOrdersYear()); //year
        }, 100);
        
    }, [year, month, day, monthWithZero]);

    return (
        <div>
            {/* <div className="row center">
                <div className="divHoldingLinkButton">
                    <Link to="/profile" className="admin linkButton">V??? trang c?? nh??n<i className="fa fa-book"></i></Link>
                </div>
            </div> */}
            <div>
                {year==="all" && <table className="table" style={{width: '50%'}}>
                    <tbody>
                        <tr>
                            <td><h3>T???ng thu nh???p:</h3></td>
                            {ordersList && ( <td>{ordersList.reduce((a, b)=> b.isPaid ? a+b.totalPrice : a+0, 0)} ?????ng</td>)}
                        </tr>
                        <tr>
                            <td><h3>T???ng s??? ????n h??ng:</h3></td>
                            {ordersList && ( <td>{ordersList.length}</td> )}
                        </tr>
                        <tr>
                            <td><h3>S??? ????n h??ng ???? thanh to??n:</h3></td>
                            {ordersList && ( <td>{ordersList.filter((order)=>order.isPaid).length}</td> )}
                        </tr>
                        <tr>
                            <td><h3>S??? ????n h??ng ch??a thanh to??n:</h3></td>
                            {ordersList && ( <td>{ordersList.filter((order)=>!order.isPaid).length}</td> )}
                        </tr>
                        <tr>
                            <td><h3>Thu nh???p trung b??nh cho m???i ????n h??ng (???? thanh to??n): </h3></td>
                            {ordersList && ( <td>{Math.floor(ordersList.reduce((a, b)=>b.isPaid ? a + b.totalPrice : a+0, 0)/ordersList.filter((order)=>order.isPaid).length)} ?????ng</td>)}
                        </tr>
                    </tbody>
                </table>}
                

                {year!=="all" && <><table className="table" style={{width: '50%', right: 0}}>
                        <tbody>
                            <tr>
                                <td><h3>Thu nh???p (???? l???c):</h3></td>
                                {filteredOrders && ( <td>{filteredOrders.reduce((a, b)=> b.isPaid ? a+ b.totalPrice : a+0, 0)} ?????ng </td>)}
                            </tr>
                            <tr>  
                                <td><h3>S??? ????n h??ng (???? l???c):</h3></td>
                                {filteredOrders && ( <td>{filteredOrders.length}</td> )}
                            </tr>
                            <tr>
                                <td><h3>Thu nh???p trung b??nh m???i th??ng:</h3></td>
                                {ordersList && ( <td>{Math.floor(ordersList.reduce((a, b)=> b.isPaid ? a + b.totalPrice : a + 0, 0)/12)} ?????ng</td>)}
                            </tr>
                        </tbody>
                    </table>
                    </>
                    
                    }
                    <div className='row'>
                        <div className='col-2'>
                            {loadingDrinkCount ? <LoadingBox></LoadingBox> : errorDrinkCount ? <MessageBox variant="error">{errorDrinkCount}</MessageBox> :
                                orderedDrinkCount && (
                                <div style={{width: '70%'}}><Pie data={{
                                    labels: orderedDrinkCount.map((od)=>od._id.drinkName),
                                    datasets: [
                                        {
                                        label: 'of Votes',
                                        data: orderedDrinkCount.map((od)=>od.drinkCount),
                                        backgroundColor: orderedDrinkCount.map((od)=>getRandomColor()),
                                        // borderColor: orderedDrinkCount.map((od)=>getRandomColor()),
                                        borderWidth: 1,
                                        },
                                    ],
                                }} options={options2}></Pie></div>)
                            }
                        </div>
                        <div className='col-2'>
                            {
                            loadingIncomePerMonthList ? <LoadingBox></LoadingBox> : errorIncomePerMonthList ? <MessageBox variant='error'>{errorIncomePerMonthList}</MessageBox> :
                                incomePerMonthList && <Bar options={options} data={{
                                                            labels: incomePerMonthList.map((fo => "Th??ng "+fo._id.month+" N??m "+fo._id.year)),
                                                            datasets: [
                                                                {
                                                                    label: 'Thu nh???p',
                                                                    // data: [1, 2],
                                                                    data: incomePerMonthList.map((fo => fo.monthlyIncome)),
                                                                    backgroundColor: '#0861a1',
                                                                }
                                                            ],
                                                        }} 
                                    height={100} with={600} />
                            }
                        </div>
                    </div>
                    
                    {/* {<div style={{width: '40%'}}><Pie data={data} options={options2}></Pie></div>} */}
                    
                    {monthWithZero!=="" && day==="" &&
                        loadingFilter ? <LoadingBox></LoadingBox> : errorFilter ? <MessageBox variant='error'>{errorFilter}</MessageBox> :
                        filteredOrders && (<Bar options={options} data={{
                                                    labels: filteredOrders.map((fo => fo.createdAt.substring(0, 4) === year && fo.createdAt.substring(5, 7) === monthWithZero && "Ng??y "+fo.createdAt.substring(8, 10))),
                                                    datasets: [
                                                        {
                                                            label: 'Thu nh???p',
                                                            // data: [1, 2],
                                                            data: filteredOrders.map((fo=> fo.createdAt.substring(0, 4) === year && fo.createdAt.substring(5, 7) === monthWithZero && (fo.isPaid ? fo.totalPrice : 0))),
                                                            backgroundColor: '#0861a1',
                                                        }
                                                    ],
                                                }} 
                            height={100} with={600} />)
                    }
                        
                <div className="col-1 card">
                    <div className="row">
                        <div>
                            <div className="row center">N??m:</div>
                            <div className='box'><select id="years" onChange={filterByYearHandler} value={year}>
                                <option hidden value="">Ch???n n??m</option>
                                <option value="all">Hi???n h???t</option>
                                {ordersYear && ( 
                                    (ordersYear.map(i => (
                                        <option value={i._id.year}>{i._id.year}</option>
                                    ))))
                                }
                            </select></div>
                        </div>
                        <div>
                            <div className="row center">Th??ng:</div>
                            <div className='box'><select id="months" onChange={filterByMonthHandler}  value={month}>
                                <option hidden value="">Ch???n th??ng</option>
                                <option>B??? tr???ng</option>
                                {ordersMonth && ( 
                                    (ordersMonth.map(i=>(
                                        <option value={i._id.month}>{i._id.month}</option>
                                    ))))
                                }
                                

                            </select></div>
                        </div>
                        <div>
                            <div className="row center">Ng??y:</div>
                            <div className='box'><select id="days" onChange={filterByDayHandler}  value={day}>
                                <option hidden value="">Ch???n ng??y</option>
                                <option>B??? tr???ng</option>
                                {ordersDate && ( 
                                    (ordersDate.map(i=>(
                                        <option value={i._id.day}>{i._id.day}</option>
                                    ))))
                                }
                                
                            </select></div>
                        </div>
                        <div>
                            <div className='box'><select onChange={sortOrders} value={sortingCondition}>
                                <option value='date-desc'>Ng??y Gi???m d???n</option>
                                <option value='date-asc'>Ng??y T??ng d???n</option>
                                <option value='total-desc'>Th??nh ti???n Gi???m d???n</option>
                                <option value='total-asc'>Th??nh ti???n T??ng d???n</option>
                            </select></div>
                        </div>
                    </div>
                    
                   
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="row center  ">
                        {/* export excel file */}
                        {/* <ExcelFile element={<button>Download Data</button>}>
                            <ExcelSheet data={dataSet3} name="Leaves">
                                <ExcelColumn label="M?? h??a ????n" value="_id"/>
                                <ExcelColumn label="M?? Kh??ch h??ng" value="user"/>
                                <ExcelColumn label="Username Kh??ch h??ng" value={(col) => col.shippingInfo.username}/>
                                <ExcelColumn label="T??n Kh??ch h??ng" value={(col) => col.shippingInfo.fullName}/>
                                <ExcelColumn label="T???ng th??nh ti???n" value="totalPrice"/>
                                <ExcelColumn label="Thanh to??n" value={(col) => col.isPaid ? col.paidAt : "Ch??a"}/>
                                <ExcelColumn label="Giao h??ng" value={(col) => col.isDelivered ? col.deliveredAt : "Ch??a"}/>
                                <ExcelColumn label="Ph????ng th???c thanh to??n" value={(col) => col==='Cash' ? "Ti???n m???t" : col.paymentMethod}/>
                            </ExcelSheet>
                        </ExcelFile> */}
                        
                            {year==="all" && paidOrder==="" && deliveredOrder==="" && orderTotalPrice==="" && sortingCondition==="" && (ordersList && (loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> :
                                ordersList &&
                                <ExcelFile filename="Danh s??ch h??a ????n" element={<button className='primary'>Xu???t b???ng</button>}>
                                    <ExcelSheet data={ordersList} name="Danh s??ch h??a ????n">
                                        <ExcelColumn label="M?? h??a ????n" value="_id"/>
                                            <ExcelColumn label="M?? Kh??ch h??ng" value="user"/>
                                            <ExcelColumn label="Username Kh??ch h??ng" value={(col) => col.shippingInfo.username}/>
                                            <ExcelColumn label="T??n Kh??ch h??ng" value={(col) => col.shippingInfo.fullName}/>
                                            <ExcelColumn label="T???ng th??nh ti???n" value="totalPrice"/>
                                            <ExcelColumn label="Thanh to??n" value={(col) => col.isPaid ? col.paidAt : "Ch??a"}/>
                                            <ExcelColumn label="Giao h??ng" value={(col) => col.isDelivered ? col.deliveredAt : "Ch??a"}/>
                                            <ExcelColumn label="Ph????ng th???c thanh to??n" value={(col) => col==='Cash' ? "Ti???n m???t" : col.paymentMethod}/>
                                    </ExcelSheet>
                                </ExcelFile>
                                ))
                            }
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>M?? ????N H??NG</th>
                                    <th>M?? NG?????I D??NG</th>
                                    <th>T??N NG?????I D??NG</th>
                                    <th>T??N ?????Y ?????</th>
                                    <th>T???NG TH??NH TI???N<div className='box'><select onChange={filterByTotalPrice} value={orderTotalPrice}>
                                            <option value="">T???t c???</option>
                                            <option value='max'>L???n nh???t</option>
                                            <option value='no'>hmm</option>
                                        </select></div></th>
                                    <th>THANH TO??N<div className='box'><select onChange={filterByIsPaid} value={paidOrder}>
                                            <option value="">T???t c???</option>
                                            <option value='yes'>R???i</option>
                                            <option value='no'>Ch??a</option>
                                        </select></div></th>
                                    <th>GIAO H??NG <div className='box'><select onChange={filterByIsDelivered} value={deliveredOrder}>
                                            <option value="">T???t c???</option>
                                            <option value='yes'>R???i</option>
                                            <option value='no'>Ch??a</option>
                                        </select></div></th>
                                    <th>CHI TI???T</th>
                                </tr>
                            </thead>
                            <tbody>
                            {year==="all" && paidOrder==="" && deliveredOrder==="" && orderTotalPrice==="" && sortingCondition==="" && (ordersList && (loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> :
                                ordersList.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} ?????ng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Ch??a</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Ch??a</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                                Chi ti???t
                                            </button></td>
                                        </tr>)))}
                                    </>
                                ))))
                                
                            }
                            
                            {year!=="all" && (filteredOrders && (loadingFilter ? <LoadingBox></LoadingBox> : errorFilter ? <MessageBox variant="error">{errorFilter}</MessageBox> : loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                filteredOrders.map((order)=>(
                                    <>{users.map(user=>(
                                        order.user === user._id &&
                                        (<tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user}</td>
                                            <td>{user.name}</td>
                                            <td>{order.shippingInfo.fullName}</td>
                                            <td>{order.totalPrice} ?????ng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Ch??a</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Ch??a</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi ti???t
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
                                            <td>{order.totalPrice} ?????ng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Ch??a</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Ch??a</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi ti???t
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
                                            <td>{order.totalPrice} ?????ng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Ch??a</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Ch??a</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi ti???t
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
                                            <td>{order.totalPrice} ?????ng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Ch??a</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Ch??a</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi ti???t
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
                                            <td>{order.totalPrice} ?????ng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Ch??a</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Ch??a</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi ti???t
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
                                            <td>{order.totalPrice} ?????ng</td>
                                            <td>{order.isPaid ? <DateComponent passedDate = {order.paidAt}> </DateComponent> : <>Ch??a</>}</td>
                                            <td>{order.isDelivered ? <DateComponent passedDate = {order.deliveredAt}></DateComponent> : <>Ch??a</>}</td>
                                            <td><button type="button" className="tiny admin" onClick={() => {navigate(`/order/${order._id}`);}}>
                                            Chi ti???t
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
