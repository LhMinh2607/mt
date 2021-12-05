import axios from "axios";
import { CART_EMPTY } from "../constants/cartConst";
import { ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESSFUL, ORDER_DETAIL_FAILED, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESSFUL } from "../constants/orderConst";

export const createOrder = (order) =>async(dispatch, getState)=>{
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try {
        console.log('hi kkkkkkkkkkkkkkkkkkkkkkkkkk');
        const {userSignin: {userInfo}} = getState();
        console.log(userInfo.token);
        const {data} = await axios.post('/api/order', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }   
        });
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