import axios from 'axios';
import { CREATE_POST_COMMENT_FAILED, CREATE_POST_COMMENT_REQUEST, CREATE_POST_COMMENT_SUCCESSFUL, CREATE_POST_FAILED, CREATE_POST_REQUEST, CREATE_POST_SUCCESSFUL, DELETE_POST_COMMENT_FAILED, DELETE_POST_COMMENT_REQUEST, DELETE_POST_COMMENT_SUCCESSFUL, DELETE_POST_FAILED, DELETE_POST_REQUEST, DELETE_POST_SUCCESSFUL, EDIT_POST_COMMENT_FAILED, EDIT_POST_COMMENT_REQUEST, EDIT_POST_COMMENT_SUCCESSFUL, EDIT_POST_FAILED, EDIT_POST_REQUEST, EDIT_POST_SUCCESSFUL, FILTER_TOPIC_FAILED, FILTER_TOPIC_REQUEST, FILTER_TOPIC_SUCCESSFUL, POST_COMMENT_LIST_FAILED, POST_COMMENT_LIST_REQUEST, POST_COMMENT_LIST_SUCCESSFUL, POST_DETAILS_FAILED, POST_DETAILS_REQUEST, POST_DETAILS_SUCCESSFUL, SEARCH_POST_FAILED, SEARCH_POST_REQUEST, SEARCH_POST_SUCCESSFUL, SHOW_POST_FAILED, SHOW_POST_REQUEST, SHOW_POST_SUCCESSFUL, SORT_POST_FAILED, SORT_POST_REQUEST, SORT_POST_SUCCESSFUL } from '../constants/postConst';


export const createPost = (userId, title, content, topic) => async (dispatch) =>{
    dispatch({
        type: CREATE_POST_REQUEST, payload: {userId, title, content, topic}
    });
    try {
        const {data} = await axios.post('/api/forum/create_post', {userId, title, content, topic});
        dispatch({type: CREATE_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: CREATE_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const editPost = (postId, title, content) => async (dispatch) =>{
    dispatch({
        type: EDIT_POST_REQUEST, payload: {postId, title, content}
    });
    try {
        const {data} = await axios.put(`/api/forum/edit_post`, {postId, title, content});
        dispatch({type: EDIT_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: EDIT_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const deletePost = (postId) => async (dispatch) =>{
    dispatch({
        type: DELETE_POST_REQUEST, payload: {postId}
    });
    try {
        const {data} = await axios.put(`/api/forum/delete_post/${postId}`);
        dispatch({type: DELETE_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: DELETE_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const createPostComment = (postId, userId, replyContent) => async (dispatch) =>{
    dispatch({
        type: CREATE_POST_COMMENT_REQUEST, payload: {postId, userId, replyContent}
    });
    try {
        const {data} = await axios.post(`/api/forum/post/${postId}/reply`, {userId, replyContent});
        dispatch({type: CREATE_POST_COMMENT_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: CREATE_POST_COMMENT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const editPostComment = (postId, commentId, replyContent) => async (dispatch) =>{
    dispatch({
        type: EDIT_POST_COMMENT_REQUEST, payload: {postId, commentId, replyContent}
    });
    try {
        const {data} = await axios.put(`/api/forum/post/${postId}/edit_reply`, {commentId, replyContent});
        dispatch({type: EDIT_POST_COMMENT_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: EDIT_POST_COMMENT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const deletePostComment = (postId, commentId) => async (dispatch) =>{
    dispatch({
        type: DELETE_POST_COMMENT_REQUEST, payload: {postId, commentId}
    });
    try {
        const {data} = await axios.put(`/api/forum/post/${postId}/delete_reply`, {commentId});
        dispatch({type: DELETE_POST_COMMENT_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: DELETE_POST_COMMENT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

// export const listOfPostComments = (postId) => async (dispatch) =>{
//     dispatch({
//         type: POST_COMMENT_LIST_REQUEST, payload: postId
//     });
//     try {
//         const {data} = await axios.get(`/api/forum/post/${postId}/get_replies`);
//         dispatch({type: POST_COMMENT_LIST_SUCCESSFUL, payload: data});
//     } catch (error) {
//         dispatch({type: POST_COMMENT_LIST_FAILED, 
//             payload: error.response 
//             && error.response.data.message 
//             ? error.response.data.message
//             : error.message,});
//     }
// };

export const listOfPosts = () => async (dispatch) =>{
    dispatch({
        type: SHOW_POST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/forum');
        dispatch({type: SHOW_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: SHOW_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfSortedPosts = (topic) => async (dispatch) =>{
    dispatch({
        type: SORT_POST_REQUEST, payload: {topic}
    });
    try {
        const {data} = await axios.get(`/api/forum/sort/filter/${topic}`);
        dispatch({type: SORT_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: SORT_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfFilteredPosts = (topic, time) => async (dispatch) =>{
    dispatch({
        type: FILTER_TOPIC_REQUEST, payload: {topic, time}
    });
    try {
        const {data} = await axios.get(`/api/forum/filter/${topic}/sort/${time}`);
        dispatch({type: FILTER_TOPIC_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: FILTER_TOPIC_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfSearchedPosts = (keyword) => async (dispatch) =>{
    dispatch({
        type: SEARCH_POST_REQUEST, payload: {keyword}
    });
    try {
        const {data} = await axios.get(`/api/forum/search/${keyword}`);
        dispatch({type: SEARCH_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: SEARCH_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const detailsOfPost = (postId) => async (dispatch) =>{
    dispatch({
        type: POST_DETAILS_REQUEST, payload: {postId}
    });
    try {
        const {data} = await axios.get(`/api/forum/post/${postId}`);
        dispatch({type: POST_DETAILS_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: POST_DETAILS_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};