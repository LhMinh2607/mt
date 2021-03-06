import {  CREATE_POST_COMMENT_FAILED, 
    CREATE_POST_COMMENT_REQUEST, 
    CREATE_POST_COMMENT_SUCCESSFUL, 
    CREATE_POST_FAILED, 
    CREATE_POST_REQUEST, 
    CREATE_POST_SUCCESSFUL,   
    DELETE_POST_COMMENT_FAILED,   
    DELETE_POST_COMMENT_REQUEST,   
    DELETE_POST_COMMENT_SUCCESSFUL,   
    DELETE_POST_FAILED,  
    DELETE_POST_REQUEST,  
    DELETE_POST_SUCCESSFUL,   
    EDIT_POST_COMMENT_FAILED,   
    EDIT_POST_COMMENT_REQUEST,   
    EDIT_POST_COMMENT_SUCCESSFUL,   
    EDIT_POST_FAILED,   
    EDIT_POST_REQUEST,   
    EDIT_POST_SUCCESSFUL,   
    FILTER_TOPIC_FAILED,   
    FILTER_TOPIC_REQUEST,   
    FILTER_TOPIC_SUCCESSFUL,   
    POST_DETAILS_FAILED, 
    POST_DETAILS_REQUEST, 
    POST_DETAILS_SUCCESSFUL, 
    SEARCH_POST_FAILED, 
    SEARCH_POST_REQUEST, 
    SEARCH_POST_SUCCESSFUL, 
    SHOW_POST_FAILED, 
    SHOW_POST_REQUEST, 
    SHOW_POST_SUCCESSFUL, 
    SORT_POST_FAILED, 
    SORT_POST_REQUEST,
    SORT_POST_SUCCESSFUL} from "../constants/postConst";


export const postCreatingReducers = (state = {}, action)=>{
    switch(action.type){
        case CREATE_POST_REQUEST:
            return {loading: true};
        case CREATE_POST_SUCCESSFUL:
            return {loading: false, success: true};
        case CREATE_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postEditingReducers = (state = {}, action)=>{
    switch(action.type){
        case EDIT_POST_REQUEST:
            return {loading: true};
        case EDIT_POST_SUCCESSFUL:
            return {loading: false, success: true};
        case EDIT_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postDeletingReducers = (state = {}, action)=>{
    switch(action.type){
        case DELETE_POST_REQUEST:
            return {loading: true};
        case DELETE_POST_SUCCESSFUL:
            return {loading: false, success: true};
        case DELETE_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postListReducers = (state = {}, action)=>{
    switch(action.type){
        case SHOW_POST_REQUEST:
            return {loading: true};
        case SHOW_POST_SUCCESSFUL:
            return {loading: false, posts: action.payload};
        case SHOW_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postDetailsReducers = (state = {}, action)=>{
    switch(action.type){
        case POST_DETAILS_REQUEST:
            return {loading: true};
        case POST_DETAILS_SUCCESSFUL:
            return {loading: false, post: action.payload};
        case POST_DETAILS_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postCommentPostingReducers = (state = {}, action)=>{
    switch(action.type){
        case CREATE_POST_COMMENT_REQUEST:
            return {loading: true};
        case CREATE_POST_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case CREATE_POST_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postCommentEditingReducers = (state = {}, action)=>{
    switch(action.type){
        case EDIT_POST_COMMENT_REQUEST:
            return {loading: true};
        case EDIT_POST_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case EDIT_POST_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postCommentDeletingReducers = (state = {}, action)=>{
    switch(action.type){
        case DELETE_POST_COMMENT_REQUEST:
            return {loading: true};
        case DELETE_POST_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case DELETE_POST_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postSearchingReducers = (state = {}, action)=>{
    switch(action.type){
        case SEARCH_POST_REQUEST:
            return {loading: true};
        case SEARCH_POST_SUCCESSFUL:
            return {loading: false, searchedPosts: action.payload};
        case SEARCH_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postSortingReducers = (state = {}, action)=>{
    switch(action.type){
        case SORT_POST_REQUEST:
            return {loading: true};
        case SORT_POST_SUCCESSFUL:
            return {loading: false, sortedPosts: action.payload};
        case SORT_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postFilteringReducers = (state = {}, action)=>{
    switch(action.type){
        case FILTER_TOPIC_REQUEST:
            return {loading: true};
        case FILTER_TOPIC_SUCCESSFUL:
            return {loading: false, filteredPosts: action.payload};
        case FILTER_TOPIC_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};
