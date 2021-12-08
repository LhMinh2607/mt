import { CLEAR_ALL, LEAST_SPENDING_USER_FAILED, LEAST_SPENDING_USER_REQUEST, LEAST_SPENDING_USER_SUCCESSFUL, MOST_SPENDING_USER_FAILED, MOST_SPENDING_USER_REQUEST, MOST_SPENDING_USER_SUCCESSFUL, USERS_SEARCH_FAILED, USERS_SEARCH_REQUEST, USERS_SEARCH_SUCCESSFUL, USER_DETAIL_FAILED, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESSFUL, USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESSFUL, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESSFUL, USER_SIGNOUT, USER_SIGN_UP_FAILED, USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESSFUL, USER_SORT_BY_DATE_FAILED, USER_SORT_BY_DATE_REQUEST, USER_SORT_BY_DATE_SUCCESSFUL, USER_SORT_BY_NAME_FAILED, USER_SORT_BY_NAME_REQUEST, USER_SORT_BY_NAME_SUCCESSFUL, USER_SORT_BY_ORDER_FAILED, USER_SORT_BY_ORDER_REQUEST, USER_SORT_BY_ORDER_SUCCESSFUL, USER_SORT_BY_SPENDING_FAILED, USER_SORT_BY_SPENDING_REQUEST, USER_SORT_BY_SPENDING_SUCCESSFUL, USER_UPDATE_PROFILE_FAILED, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESSFUL } from "../constants/userConst";


export const userSignupReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_SIGN_UP_REQUEST:
            return {loading: true};
        case USER_SIGN_UP_SUCCESSFUL:
            return {loading: false, userInfo: action.payload};
        case USER_SIGN_UP_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const userSigninReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESSFUL:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAILED:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};

export const userSignOutReducer = (state={}, action)=>{
    switch(action.type){
        case CLEAR_ALL:
            return {};
        default:
            return state;
    }
}

export const userListReducer = (state = {loading: true, users: []}, action) =>{
    switch(action.type){
        case USER_LIST_REQUEST: 
            return {loading: true};
        case USER_LIST_SUCCESSFUL:
            return {loading: false, users: action.payload};
        case USER_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userDetailReducer = (state ={loading: true}, action)=>{
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {loading: true};
        case USER_DETAIL_SUCCESSFUL:
            return {loading: false, user: action.payload};
        case USER_DETAIL_FAILED:
            return {loading: false, error: action.payload};
        case CLEAR_ALL:
            return {};
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true};
        case USER_UPDATE_PROFILE_SUCCESSFUL:
            return {loading: false, success: true};
        case USER_UPDATE_PROFILE_FAILED:
            return {loading: false, error: action.payload};
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }    
};

export const userSearchingReducer = (state={}, action)=>{
    switch(action.type){
        case USERS_SEARCH_REQUEST:
            return {loading: true};
        case USERS_SEARCH_SUCCESSFUL:
            return {loading: false, userResult: action.payload};
        case USERS_SEARCH_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userMostSpendingReducer = (state={}, action)=>{
    switch(action.type){
        case MOST_SPENDING_USER_REQUEST:
            return {loading: true};
        case MOST_SPENDING_USER_SUCCESSFUL:
            return {loading: false, mostSpendingUser: action.payload};
        case MOST_SPENDING_USER_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

// export const leastSpendingUserReducer = (state={}, action)=>{
//     switch(action.type){
//         case LEAST_SPENDING_USER_REQUEST:
//             return {loading: true};
//         case LEAST_SPENDING_USER_SUCCESSFUL:
//             return {loading: false, leastSpendingUser: action.payload};
//         case LEAST_SPENDING_USER_FAILED:
//             return {loading: false, error: action.payload};
//         default:
//             return state;
//     }
// }

export const userSortedBySpendingReducer = (state={}, action)=>{
    switch(action.type){
        case USER_SORT_BY_SPENDING_REQUEST:
            return {loading: true};
        case USER_SORT_BY_SPENDING_SUCCESSFUL:
            return {loading: false, sortedUsersBySpending: action.payload};
        case USER_SORT_BY_SPENDING_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userSortedByOrderReducer = (state={}, action)=>{
    switch(action.type){
        case USER_SORT_BY_ORDER_REQUEST:
            return {loading: true};
        case USER_SORT_BY_ORDER_SUCCESSFUL:
            return {loading: false, sortedUsersByOrder: action.payload};
        case USER_SORT_BY_ORDER_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userSortedByNameReducer = (state={}, action)=>{
    switch(action.type){
        case USER_SORT_BY_NAME_REQUEST:
            return {loading: true};
        case USER_SORT_BY_NAME_SUCCESSFUL:
            return {loading: false, sortedUsersByName: action.payload};
        case USER_SORT_BY_NAME_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userSortedByDateReducer = (state={}, action)=>{
    switch(action.type){
        case USER_SORT_BY_DATE_REQUEST:
            return {loading: true};
        case USER_SORT_BY_DATE_SUCCESSFUL:
            return {loading: false, sortedUsersByDate: action.payload};
        case USER_SORT_BY_DATE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}