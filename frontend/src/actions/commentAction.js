import axios from 'axios';
import { USER_COMMENT_FAILED, USER_COMMENT_LIST_FAILED, USER_COMMENT_LIST_REQUEST, USER_COMMENT_LIST_SUCCESSFUL, USER_COMMENT_REQUEST, USER_COMMENT_SUCCESSFUL, USER_DELETE_COMMENT_FAILED, USER_DELETE_COMMENT_REQUEST, USER_DELETE_COMMENT_SUCCESSFUL, USER_EDIT_COMMENT_FAILED, USER_EDIT_COMMENT_REQUEST, USER_EDIT_COMMENT_SUCCESSFUL, USER_FILTER_COMMENT_BY_STAR_FAILED, USER_FILTER_COMMENT_BY_STAR_REQUEST, USER_FILTER_COMMENT_BY_STAR_SUCCESSFUL, USER_SORT_COMMENT_FAILED, USER_SORT_COMMENT_REQUEST, USER_SORT_COMMENT_SUCCESSFUL } from '../constants/commentConst';

export const commitCommenting = ( user, drink, content, rating) => async(dispatch, getState)=>{
    dispatch({type: USER_COMMENT_REQUEST, payload: {content, rating, user, drink}});
    // const {
    //     userSignIn: {userInfo},
    // } = getState();
    try {
        const {data} = await axios.post(`/api/comment/commit_comment`, { user, drink, content, rating},
        // {
        //     headers: {Authorization: `Bearer ${userInfo}`},}
        );
        dispatch({type: USER_COMMENT_SUCCESSFUL});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_COMMENT_FAILED, payload: message});
    }
}

export const editComment = (commentId, content, rating) => async(dispatch, getState)=>{
    dispatch({type: USER_EDIT_COMMENT_REQUEST, payload: {commentId, content, rating}});
    // const {
    //     userSignIn: {userInfo},
    // } = getState();
    try {
        const {data} = await axios.put(`/api/comment/edit`, {commentId, content, rating}
        // {
        //     headers: {Authorization: `Bearer ${userInfo}`},}
        );
        dispatch({type: USER_EDIT_COMMENT_SUCCESSFUL});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_EDIT_COMMENT_FAILED, payload: message});
    }
}

export const deleteComment = (commentId) => async(dispatch, getState)=>{
    dispatch({type: USER_DELETE_COMMENT_REQUEST, payload: {commentId}});
    // const {
    //     userSignIn: {userInfo},
    // } = getState();
    try {
        const {data} = await axios.put(`/api/comment/delete/${commentId}`
        // {
        //     headers: {Authorization: `Bearer ${userInfo}`},}
        );
        dispatch({type: USER_DELETE_COMMENT_SUCCESSFUL});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_DELETE_COMMENT_FAILED, payload: message});
    }
}

export const filterCommentByStar = (drinkId, star, time) => async(dispatch)=>{
    dispatch({type: USER_FILTER_COMMENT_BY_STAR_REQUEST, payload: {drinkId, star, time}});
    try {
        //alert(`${drinkId}+${star}`);
        const {data} = await axios.get(`/api/comment/list/${drinkId}/filter/${star}/sort/${time}`);
        dispatch({type: USER_FILTER_COMMENT_BY_STAR_SUCCESSFUL, payload: data});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_FILTER_COMMENT_BY_STAR_FAILED, payload: message});
    }
}

export const sortComment = (drinkId, time) => async(dispatch)=>{
    dispatch({type: USER_SORT_COMMENT_REQUEST, payload: {drinkId, time}});
    try {
        //alert(`${drinkId}+${star}`);
        const {data} = await axios.get(`/api/comment/list/${drinkId}/sort/${time}`);
        dispatch({type: USER_SORT_COMMENT_SUCCESSFUL, payload: data});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_SORT_COMMENT_FAILED, payload: message});
    }
}

export const listOfComments = (postId) => async(dispatch)=>{
    dispatch({type: USER_COMMENT_LIST_REQUEST, payload: postId});
    try {
        const {data} = await axios.get(`/api/comment/list/${postId}`);
        dispatch({type: USER_COMMENT_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_COMMENT_LIST_FAILED, payload: message});
    }
}
