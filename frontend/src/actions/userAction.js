import axios from 'axios'
import { CART_EMPTY } from '../constants/cartConst';
import {} from '../constants/drinkConst'
import { CLEAR_ALL, MOST_SPENDING_USER_FAILED, MOST_SPENDING_USER_REQUEST, MOST_SPENDING_USER_SUCCESSFUL, USERS_SEARCH_FAILED, USERS_SEARCH_REQUEST, USERS_SEARCH_SUCCESSFUL, USER_DETAIL_FAILED, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESSFUL, USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESSFUL, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESSFUL, USER_SIGNOUT, USER_SIGN_UP_FAILED, USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESSFUL, USER_SORT_BY_DATE_FAILED, USER_SORT_BY_DATE_REQUEST, USER_SORT_BY_DATE_SUCCESSFUL, USER_SORT_BY_NAME_FAILED, USER_SORT_BY_NAME_REQUEST, USER_SORT_BY_NAME_SUCCESSFUL, USER_SORT_BY_ORDER_FAILED, USER_SORT_BY_ORDER_REQUEST, USER_SORT_BY_ORDER_SUCCESSFUL, USER_SORT_BY_SPENDING_FAILED, USER_SORT_BY_SPENDING_REQUEST, USER_SORT_BY_SPENDING_SUCCESSFUL, USER_UPDATE_PROFILE_FAILED, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESSFUL } from '../constants/userConst';


export const signout = () => (dispatch) =>{
    localStorage.removeItem('userInfo');
    localStorage.clear();
    localStorage.removeItem('cartItems');
    dispatch({type: CART_EMPTY});
    dispatch({type: CLEAR_ALL});
    dispatch({type: USER_SIGNOUT});
}

export const signup = (name, email, password, gender, birthDate, phoneNumber) => async(dispatch) =>{
    dispatch({type: USER_SIGN_UP_REQUEST, payload: {name, email, password, gender, birthDate, phoneNumber}});
    try {
        const {data} = await axios.post('/api/user/signup', {name, email, password, gender, birthDate, phoneNumber});
        dispatch({type: USER_SIGN_UP_SUCCESSFUL, payload: data});
        //dispatch({type: USER_SIGNIN_SUCCESSFUL, payload: data});
        //localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGN_UP_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

export const signin = (email, password) => async(dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await axios.post('/api/user/signin', {email, password});
        dispatch({type: USER_SIGNIN_SUCCESSFUL, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

export const listOfUsers = () => async (dispatch) =>{
    dispatch({
        type: USER_LIST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/user/list');
        dispatch({type: USER_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: USER_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const detailsOfUser = (userId) => async(dispatch, getState) =>{
    dispatch({type: USER_DETAIL_REQUEST, payload: userId});
    const {userSignin: {userInfo}}= getState();
    try {
        const {data} = await axios.get(`/api/user/${userId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        
        dispatch({type: USER_DETAIL_SUCCESSFUL, payload: data});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_DETAIL_FAILED, payload: message});
    }
};


export const updateUserProfile = (user) => async (dispatch, getState)=>{
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    const {
        userSignin: {userInfo},
    } = getState();
   // console.log(user);
    try {
        const {data} = await axios.put(`/api/user/profile/update`, user, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_UPDATE_PROFILE_SUCCESSFUL, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESSFUL, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_UPDATE_PROFILE_FAILED, payload: message});
    }
};

export const searchUser = (keyword) =>async(dispatch) => {
    dispatch({
        type: USERS_SEARCH_REQUEST, payload: keyword
    });
    try {
        const {data} = await axios.get(`/api/admin/user/search/${keyword}`);
        dispatch({type: USERS_SEARCH_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: USERS_SEARCH_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const getMostSpendingUser = () => async (dispatch) =>{
    dispatch({
        type: MOST_SPENDING_USER_REQUEST
    });
    try {
        const {data} = await axios.get('/api/admin/user/spending/most');
        dispatch({type: MOST_SPENDING_USER_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: MOST_SPENDING_USER_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const sortUserBySpending = (boo) => async (dispatch) =>{
    dispatch({
        type: USER_SORT_BY_SPENDING_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/user/list/sort/spending/${boo}`);
        dispatch({type: USER_SORT_BY_SPENDING_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: USER_SORT_BY_SPENDING_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const sortUserByOrder = (boo) => async (dispatch) =>{
    dispatch({
        type: USER_SORT_BY_ORDER_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/user/list/sort/order/${boo}`);
        dispatch({type: USER_SORT_BY_ORDER_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: USER_SORT_BY_ORDER_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const sortUserByName = (boo) => async (dispatch) =>{
    dispatch({
        type: USER_SORT_BY_NAME_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/user/list/sort/name/${boo}`);
        dispatch({type: USER_SORT_BY_NAME_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: USER_SORT_BY_NAME_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const sortUserByDate = (boo) => async (dispatch) =>{
    dispatch({
        type: USER_SORT_BY_DATE_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/admin/user/list/sort/date/${boo}`);
        dispatch({type: USER_SORT_BY_DATE_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: USER_SORT_BY_DATE_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};