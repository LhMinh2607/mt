import { USER_COMMENT_FAILED, USER_COMMENT_LIST_FAILED, USER_COMMENT_LIST_REQUEST, USER_COMMENT_LIST_SUCCESSFUL, USER_COMMENT_REQUEST, USER_COMMENT_RESET, USER_COMMENT_SUCCESSFUL, USER_DELETE_COMMENT_FAILED, USER_DELETE_COMMENT_REQUEST, USER_DELETE_COMMENT_SUCCESSFUL, USER_EDIT_COMMENT_FAILED, USER_EDIT_COMMENT_REQUEST, USER_EDIT_COMMENT_RESET, USER_EDIT_COMMENT_SUCCESSFUL, USER_FILTER_COMMENT_BY_STAR_FAILED, USER_FILTER_COMMENT_BY_STAR_REQUEST, USER_FILTER_COMMENT_BY_STAR_RESET, USER_FILTER_COMMENT_BY_STAR_SUCCESSFUL, USER_SORT_COMMENT_FAILED, USER_SORT_COMMENT_REQUEST, USER_SORT_COMMENT_SUCCESSFUL } from "../constants/commentConst";


export const userCommentReducer = (state={}, action)=>{
    switch(action.type)
    {
        case USER_COMMENT_REQUEST:
            return {loading: true};
        case USER_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case USER_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        case USER_COMMENT_RESET:
            return {};
        default:
            return state;
    } 
}

export const userEditCommentReducer = (state={}, action)=>{
    switch(action.type)
    {
        case USER_EDIT_COMMENT_REQUEST:
            return {loading: true};
        case USER_EDIT_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case USER_EDIT_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        case USER_EDIT_COMMENT_RESET:
            return {};
        default:
            return state;
    } 
}

export const userDeleteCommentReducer = (state={}, action)=>{
    switch(action.type)
    {
        case USER_DELETE_COMMENT_REQUEST:
            return {loading: true};
        case USER_DELETE_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case USER_DELETE_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    } 
}

export const userCommentListReducer = (state={}, action)=>{
    switch(action.type)
    {
        case USER_COMMENT_LIST_REQUEST:
            return {loading: true};
        case USER_COMMENT_LIST_SUCCESSFUL:
            return {loading: false, comments: action.payload};
        case USER_COMMENT_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    } 
}

export const userFilterCommentByStarReducer = (state={}, action)=>{
    switch(action.type)
    {
        case USER_FILTER_COMMENT_BY_STAR_REQUEST:
            return {loading: true};
        case USER_FILTER_COMMENT_BY_STAR_SUCCESSFUL:
            return {loading: false, comments: action.payload};
        case USER_FILTER_COMMENT_BY_STAR_FAILED:
            return {loading: false, error: action.payload};
        case USER_FILTER_COMMENT_BY_STAR_RESET:
            return {};
        default:
            return state;
    } 
}

export const userSortCommentReducer = (state={}, action)=>{
    switch(action.type)
    {
        case USER_SORT_COMMENT_REQUEST:
            return {loading: true};
        case USER_SORT_COMMENT_SUCCESSFUL:
            return {loading: false, comments: action.payload};
        case USER_SORT_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        case USER_SORT_COMMENT_REQUEST:
            return {};
        default:
            return state;
    } 
}