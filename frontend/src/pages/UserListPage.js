import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { totalMoneySpent, totalMoneySpentOfAllUsers } from '../actions/orderAction';
import { getMostSpendingUser, listOfUsers, listTotalMoneySpent, searchUser, sortUserByDate, sortUserByName, sortUserByOrder, sortUserBySpending } from '../actions/userAction';
import DateComponent from '../components/DateComponent';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';    

export default function UserListPage() {
    const dispatch = useDispatch();

    
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userList = useSelector((state) => state.userList);
    const {loading, error, users} = userList;
    
    
    const userSearching = useSelector(state=>state.userSearching);
    const {loading: loadingSearch, error: errorSearch, userResult} = userSearching;

    const orderAggregateList = useSelector(state => state.orderAggregateList);
    const {loading: loadingSpending, error: errorSpending, userSpendingsList} = orderAggregateList;

    const userMostSpending = useSelector(state=>state.userMostSpending);
    const {loading: loadingMostSpending, error: errorMostSpending, mostSpendingUser} = userMostSpending;

    const userSortedByDate = useSelector(state=>state.userSortedByDate);
    const {loading: loadingSortByDate, error: errorSortByDate, sortedUsersByDate} = userSortedByDate;

    const userSortedBySpending = useSelector(state=>state.userSortedBySpending);
    const {loading: loadingSortBySpending, error: errorSortBySpending, sortedUsersBySpending} = userSortedBySpending;

    const userSortedByName = useSelector(state=>state.userSortedByName);
    const {loading: loadingSortByName, error: errorSortByName, sortedUsersByName} = userSortedByName;

    const userSortedByOrder = useSelector(state=>state.userSortedByOrder);
    const {loading: loadingSortByOrder, error: errorSortByOrder, sortedUsersByOrder} = userSortedByOrder;

    
    const [spendingFilter, setSpendingFilter] = useState("");
    const [sortingCondition, setSortingCondition] = useState("");

    const [keyword, setKeyword] = useState("");
    const setTheKeyword = (e) =>{
        setKeyword(e.target.value);
        dispatch(searchUser(keyword));
    }

    const filterBySpending = (e) =>{
        setSpendingFilter(e.target.value);
        setSortingCondition("");
        setKeyword("");
        if(e.target.value==="max")
        {
            dispatch(getMostSpendingUser());
        }
    }

    const sortUsers = (e) => {
        setSpendingFilter("");
        setKeyword("");
        setSortingCondition(e.target.value);
        if(e.target.value.includes("date")){
            dispatch(sortUserByDate(e.target.value));
        }
        if(e.target.value.includes("order")){
            dispatch(sortUserByOrder(e.target.value));
        }
        if(e.target.value.includes("name")){
            dispatch(sortUserByName(e.target.value));
        }
        if(e.target.value.includes("spending")){
            dispatch(sortUserBySpending(e.target.value));
        }
    }

    

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(listOfUsers());
        dispatch(totalMoneySpentOfAllUsers());
    }, [dispatch]);

    return (
        <div>
            <div className="row center orange-background"> 
                <div>
                    <Link to={`/admin/${userInfo._id}/profile`} className="admin linkButton">Back to Profile</Link>
                </div>
            </div>
            <div className="row center orange-background">
                <div className="search-background row center">
                    <input type="text" id="searchField" className="searchInput" onChange={setTheKeyword} placeholder="🔍Seach For User"></input>
                </div>
            </div>
            <h2>DANH SÁCH NGƯỜI DÙNG </h2>
            <div>    
            {users && <div>
                    Số người dùng bao gồm cả bạn (Quản trị viên): {users.length}
                </div>}
            {
                userResult && 
                <div>
                    Số người dùng tìm được:  {userResult.length}
                </div>
            }

            <select onChange={sortUsers} value={sortingCondition}>
                <option value="">Tất cả</option>
                <option value='date-asc'>Ngày tham gia (Tăng dần)</option>
                <option value='date-desc'>Ngày tham gia (Giảm dần)</option>
                <option value='name-asc'>Tên (Tăng dần)</option>
                <option value='name-desc'>Tên (Giảm dần)</option>
                <option value='order-asc'>Số đơn hàng đã thanh toán (Tăng dần)</option>
                <option value='order-desc'>Số đơn hàng đã thanh toán (Giảm dần)</option>
                <option value='spending-asc'>Số tiền tiêu (Tăng dần)</option>
                <option value='spending-asc'>Số tiền tiêu (Giảm dần)</option>
            </select>
            
            <div className="row center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>MÃ NGƯỜI DÙNG</th>
                                    <th>TÊN NGƯỜI DÙNG</th>
                                    <th>EMAIL</th>
                                    <th>SĐT</th>
                                    <th>NGÀY THAM GIA</th>
                                    <th>SỐ TIỀN TIÊU THỤ (ĐỒNG)<select onChange={filterBySpending} value={spendingFilter}>
                                            <option value="">Tất cả</option>
                                            <option value='max'>Nhiều nhất</option>
                                            <option value='hmm'>hmm</option>
                                        </select></th>
                                </tr>
                            </thead>
                        <tbody>  
                    {keyword==="" && spendingFilter==="" && sortingCondition ==="" && (loading ? (
                                <LoadingBox></LoadingBox>
                            ) :
                            error ? (
                                <MessageBox variant="error">{error}</MessageBox>
                            ) : (loading ? <LoadingBox></LoadingBox> : error ? <MessageBox></MessageBox> : users &&
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td><DateComponent passedDate={user.createdAt}></DateComponent></td>
                                <td>
                                {
                                    loadingSpending ? (<LoadingBox></LoadingBox>) : errorSpending ? (<MessageBox variant="error">{errorSpending}</MessageBox>)
                                    : (userSpendingsList.map((userSpend)=>(
                                        user._id === userSpend._id &&
                                        <p key={userSpend._id}>{userSpend.totalMoneySpent}</p>
                                    )) )
                                }</td>
                            </tr>
                        ))))}

                        {keyword!=="" && spendingFilter==="" && userResult && (userResult.length > 0 && (loadingSearch ? (
                                <LoadingBox></LoadingBox>
                            ) :
                            errorSearch ? (
                                <MessageBox variant="error">{errorSearch}</MessageBox>
                            ) : (
                            userResult.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td><DateComponent passedDate={user.createdAt}></DateComponent></td>
                                    <td>
                                    {
                                        loadingSpending ? (<LoadingBox></LoadingBox>) : errorSpending ? (<MessageBox variant="error">{errorSpending}</MessageBox>)
                                        : (userSpendingsList.map((userSpend)=>(
                                            user._id === userSpend._id &&
                                            <p key={userSpend._id}>{userSpend.totalMoneySpent}</p>
                                        )) )
                                    }</td>
                            </tr>
                            
                            )))))}
                            
                            {keyword==="" && spendingFilter==='max' && loadingMostSpending ?(
                                <LoadingBox></LoadingBox>
                            ) :
                            errorMostSpending ? (
                                <MessageBox variant="error">{errorMostSpending}</MessageBox>
                            ) : mostSpendingUser && (mostSpendingUser.map((u) => (
                                <>
                                    {
                                        loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="error">{error}</MessageBox>)
                                        : (users.map((us)=>(
                                            u._id==us._id &&
                                            (<tr key={us._id}>
                                                <td>{us._id}</td>
                                                <td>{us.name}</td>
                                                <td>{us.email}</td>
                                                <td>{us.phoneNumber}</td>
                                                <td><DateComponent passedDate={us.createdAt}></DateComponent></td>
                                                <td>{u.totalMoneySpent}</td>
                                            </tr>)
                                        )) )
                                    }
                                </>
                            
                            )))}
                        {keyword==="" && spendingFilter==="" && sortingCondition.includes("date") && (loadingSortByDate ? (
                            <LoadingBox></LoadingBox>
                        ) :
                        errorSortByDate ? (
                            <MessageBox variant="error">{errorSortByDate}</MessageBox>
                        ) : (sortedUsersByDate && sortedUsersByDate.length > 0 &&
                            sortedUsersByDate.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td><DateComponent passedDate={user.createdAt}></DateComponent></td>
                                <td>
                                {
                                    loadingSpending ? (<LoadingBox></LoadingBox>) : errorSpending ? (<MessageBox variant="error">{errorSpending}</MessageBox>)
                                    : (userSpendingsList.map((userSpend)=>(
                                        user._id === userSpend._id &&
                                        <p key={userSpend._id}>{userSpend.totalMoneySpent}</p>
                                    )) )
                                }</td>
                        </tr>
                        
                        ))))}
                        {keyword==="" && spendingFilter==="" && sortingCondition.includes("name") && (loadingSortByName ? (
                            <LoadingBox></LoadingBox>
                        ) :
                        errorSortByName ? (
                            <MessageBox variant="error">{errorSortByName}</MessageBox>
                        ) : (sortedUsersByName && sortedUsersByName.length > 0 &&
                            sortedUsersByName.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td><DateComponent passedDate={user.createdAt}></DateComponent></td>
                                <td>
                                {
                                    loadingSpending ? (<LoadingBox></LoadingBox>) : errorSpending ? (<MessageBox variant="error">{errorSpending}</MessageBox>)
                                    : (userSpendingsList.map((userSpend)=>(
                                        user._id === userSpend._id &&
                                        <p key={userSpend._id}>{userSpend.totalMoneySpent}</p>
                                    )) )
                                }</td>
                        </tr>
                        
                        ))))}
                        {/* {keyword==="" && spendingFilter==="" && sortingCondition.includes("order") && (loadingSortByOrder ? (
                            <LoadingBox></LoadingBox>
                        ) :
                        errorSortByOrder ? (
                            <MessageBox variant="error">{errorSortByOrder}</MessageBox>
                        ) : (sortedUsersByOrder && sortedUsersByOrder.length > 0 &&
                            sortedUsersByOrder.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td><DateComponent passedDate={user.createdAt}></DateComponent></td>
                                <td>
                                {
                                    loadingSpending ? (<LoadingBox></LoadingBox>) : errorSpending ? (<MessageBox variant="error">{errorSpending}</MessageBox>)
                                    : (userSpendingsList.map((userSpend)=>(
                                        user._id === userSpend._id &&
                                        <p key={userSpend._id}>{userSpend.totalMoneySpent}</p>
                                    )) )
                                }</td>
                        </tr>
                        
                        ))))} */}
                        {keyword==="" && spendingFilter==="" && sortingCondition.includes("spending") && (loadingSortBySpending ? (
                            <LoadingBox></LoadingBox>
                        ) :
                        errorSortBySpending ? (
                            <MessageBox variant="error">{errorSortBySpending}</MessageBox>
                        ) : (sortedUsersBySpending && sortedUsersBySpending.length > 0 &&
                            sortedUsersBySpending.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td><DateComponent passedDate={user.createdAt}></DateComponent></td>
                                <td>
                                {
                                    loadingSpending ? (<LoadingBox></LoadingBox>) : errorSpending ? (<MessageBox variant="error">{errorSpending}</MessageBox>)
                                    : (userSpendingsList.map((userSpend)=>(
                                        user._id === userSpend._id &&
                                        <p key={userSpend._id}>{userSpend.totalMoneySpent}</p>
                                    )) )
                                }</td>
                        </tr>
                        
                        ))))}
                        {keyword==="" && spendingFilter==='' && sortingCondition.includes("order") && (loadingSortByOrder ?(
                                <LoadingBox></LoadingBox>
                            ) :
                            errorSortByOrder ? (
                                <MessageBox variant="error">{errorSortByOrder}</MessageBox>
                            ) : sortedUsersByOrder && (sortedUsersByOrder.map((u) => (
                                <>
                                    {
                                        loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="error">{error}</MessageBox>)
                                        : (users.map((us)=>(
                                            u._id==us._id &&
                                            (<tr key={us._id}>
                                                <td>{us._id}</td>
                                                <td>{us.name}</td>
                                                <td>{us.email}</td>
                                                <td>{us.phoneNumber}</td>
                                                <td><DateComponent passedDate={us.createdAt}></DateComponent></td>
                                                <td>
                                                {
                                                    loadingSpending ? (<LoadingBox></LoadingBox>) : errorSpending ? (<MessageBox variant="error">{errorSpending}</MessageBox>)
                                                    : (userSpendingsList.map((userSpend)=>(
                                                        us._id === userSpend._id &&
                                                        <p key={userSpend._id}>{userSpend.totalMoneySpent} ({u.orderCount}đơn hàng)</p>
                                                    )) )
                                                }</td>
                                            </tr>)
                                        )) )
                                    }
                                </>
                            
                            ))))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
