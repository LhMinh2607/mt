import axios from "axios";
import { CART_EMPTY } from "../constants/cartConst";
import { ALL_ORDER_LIST_FAILED, ALL_ORDER_LIST_REQUEST, ALL_ORDER_LIST_SUCCESSFUL, LEAST_ORDERED_DRINK_FAILED, LEAST_ORDERED_DRINK_REQUEST, LEAST_ORDERED_DRINK_SUCCESSFUL, MOST_ORDERED_DRINK_FAILED, MOST_ORDERED_DRINK_REQUEST, MOST_ORDERED_DRINK_SUCCESSFUL, ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESSFUL, ORDER_DATE_FAILED, ORDER_DATE_REQUEST, ORDER_DATE_SUCCESSFUL, ORDER_DETAIL_FAILED, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESSFUL, ORDER_FILTER_BY_DATE_FAILED, ORDER_FILTER_BY_DATE_REQUEST, ORDER_FILTER_BY_DATE_SUCCESSFUL, ORDER_ISDELIVERED_FAILED, ORDER_ISDELIVERED_REQUEST, ORDER_ISDELIVERED_SUCCESSFUL, ORDER_ISPAID_FAILED, ORDER_ISPAID_REQUEST, ORDER_ISPAID_SUCCESSFUL, ORDER_LIST_FAILED, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESSFUL, ORDER_MAX_TOTAL_FAILED, ORDER_MAX_TOTAL_REQUEST, ORDER_MAX_TOTAL_SUCCESSFUL, ORDER_MONTH_FAILED, ORDER_MONTH_REQUEST, ORDER_MONTH_SUCCESSFUL, ORDER_SORT_BY_DATE_FAILED, ORDER_SORT_BY_DATE_REQUEST, ORDER_SORT_BY_DATE_SUCCESSFUL, ORDER_SORT_BY_TOTAL_FAILED, ORDER_SORT_BY_TOTAL_REQUEST, ORDER_SORT_BY_TOTAL_SUCCESSFUL, ORDER_TOTAL_FAILED, ORDER_TOTAL_OF_ALL_USERS_FAILED, ORDER_TOTAL_OF_ALL_USERS_REQUEST, ORDER_TOTAL_OF_ALL_USERS_SUCCESSFUL, ORDER_TOTAL_REQUEST, ORDER_TOTAL_SUCCESSFUL, ORDER_VERIFY_DELIVERED_FAILED, ORDER_VERIFY_DELIVERED_REQUEST, ORDER_VERIFY_DELIVERED_SUCCESSFUL, ORDER_VERIFY_PAID_FAILED, ORDER_VERIFY_PAID_REQUEST, ORDER_VERIFY_PAID_SUCCESSFUL, ORDER_YEAR_FAILED, ORDER_YEAR_REQUEST, ORDER_YEAR_SUCCESSFUL } from "../constants/orderConst";

export const createOrder = (order) =>async(dispatch, getState)=>{
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try {
        //console.log('hi kkkkkkkkkkkkkkkkkkkkkkkkkk');
        const {userSignin: {userInfo}} = getState();
        //console.log(userInfo.token);
        const {data} = await axios.post('/api/order', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }   
        });
        //console.log(data.order);
        dispatch({type: ORDER_CREATE_SUCCESSFUL, payload: data.order});
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems');
    }catch(error)
    {
        dispatch({
            type: ORDER_CREATE_FAILED,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const detailsOfOrder = (id) => async(dispatch, getState) =>{
    dispatch({type: ORDER_DETAIL_REQUEST, payload: id});
    try{
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.get(`/api/order/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: ORDER_DETAIL_SUCCESSFUL, payload: data});
    }catch(error)
    {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: ORDER_DETAIL_FAILED, payload: message});
    }
}

export const listOfOrders = (id) => async(dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST});
    const { userSignin: {userInfo}} = getState();
    try {
        const {data} = await axios.get(`/api/order/list/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: ORDER_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
        dispatch({type: ORDER_LIST_FAILED, payload: message});
    }
};

export const totalMoneySpent = (userId) => async(dispatch)=>{
    //console.log(userId);
    dispatch({
        type: ORDER_TOTAL_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/order/total/${userId}`, {
        });
        dispatch({type: ORDER_TOTAL_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_TOTAL_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const totalMoneySpentOfAllUsers = () => async(dispatch)=>{
    dispatch({
        type: ORDER_TOTAL_OF_ALL_USERS_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/order/total/all`, {
        });
        dispatch({type: ORDER_TOTAL_OF_ALL_USERS_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_TOTAL_OF_ALL_USERS_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfAllOrders = () => async (dispatch) =>{
    dispatch({
        type: ALL_ORDER_LIST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/admin/order/list/all');
        dispatch({type: ALL_ORDER_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ALL_ORDER_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};


export const filterAllOrders = (year, month, day) => async (dispatch) =>{
    dispatch({
        type: ORDER_FILTER_BY_DATE_REQUEST, payload: {year, month, day}
    });
    try {
        const {data} = await axios.get(`/api/admin/order/list/filter/${year}/${month}/${day}`);
        dispatch({type: ORDER_FILTER_BY_DATE_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_FILTER_BY_DATE_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const getAllOrdersDate = (month, year) => async (dispatch) =>{
    dispatch({
        type: ORDER_DATE_REQUEST, payload: {month, year}
    });
    //alert(date);
    try {
        const {data} = await axios.get(`/api/admin/order/list/date/day/month/${month}/year/${year}`);
        dispatch({type: ORDER_DATE_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DATE_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const getAllOrdersMonth = (year) => async (dispatch) =>{
    dispatch({
        type: ORDER_MONTH_REQUEST, payload: {year}
    });
    //alert(date);
    try {
        const {data} = await axios.get(`/api/admin/order/list/date/month/year/${year}`);
        dispatch({type: ORDER_MONTH_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_MONTH_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const getAllOrdersYear = () => async (dispatch) =>{
    dispatch({
        type: ORDER_YEAR_REQUEST
    });
    //alert(date);
    try {
        const {data} = await axios.get(`/api/admin/order/list/date/year`);
        dispatch({type: ORDER_YEAR_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_YEAR_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfPaidOrders = (boo) => async (dispatch) =>{
    dispatch({
        type: ORDER_ISPAID_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/order/list/paid/${boo}`);
        dispatch({type: ORDER_ISPAID_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_ISPAID_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfDeliveredOrders = (boo) => async (dispatch) =>{
    dispatch({
        type: ORDER_ISDELIVERED_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/order/list/delivered/${boo}`);
        dispatch({type: ORDER_ISDELIVERED_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_ISDELIVERED_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const getMaxTotalOrders = () => async (dispatch) =>{
    dispatch({
        type: ORDER_MAX_TOTAL_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/order/list/total/max`);
        dispatch({type: ORDER_MAX_TOTAL_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_MAX_TOTAL_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfSortedOrdersByDate = (boo) => async (dispatch) =>{
    dispatch({
        type: ORDER_SORT_BY_DATE_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/order/list/sort/date/${boo}`);
        dispatch({type: ORDER_SORT_BY_DATE_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_SORT_BY_DATE_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfSortedOrdersByTotal = (boo) => async (dispatch) =>{
    dispatch({
        type: ORDER_SORT_BY_TOTAL_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/order/list/sort/total/${boo}`);
        dispatch({type: ORDER_SORT_BY_TOTAL_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ORDER_SORT_BY_TOTAL_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const getMostOrderedDrink = () => async (dispatch) =>{
    dispatch({
        type: MOST_ORDERED_DRINK_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/order/list/drink/most`);
        dispatch({type: MOST_ORDERED_DRINK_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: MOST_ORDERED_DRINK_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const getLeastOrderedDrink = () => async (dispatch) =>{
    dispatch({
        type: LEAST_ORDERED_DRINK_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/order/list/drink/least`);
        dispatch({type: LEAST_ORDERED_DRINK_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: LEAST_ORDERED_DRINK_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const verifyPaidOrder = (id) => async (dispatch, getState)=>{
    dispatch({type: ORDER_VERIFY_PAID_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await axios.put(`/api/admin/order/verify/paid/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: ORDER_VERIFY_PAID_SUCCESSFUL, payload: data});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: ORDER_VERIFY_PAID_FAILED, payload: message});
    }
};

export const verifyDeliveredOrder = (id) => async (dispatch, getState)=>{
    dispatch({type: ORDER_VERIFY_DELIVERED_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await axios.put(`/api/admin/order/verify/delivered/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: ORDER_VERIFY_DELIVERED_SUCCESSFUL, payload: data});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: ORDER_VERIFY_DELIVERED_FAILED, payload: message});
    }
};