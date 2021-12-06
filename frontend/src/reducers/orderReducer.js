import { ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESSFUL, ORDER_DETAIL_FAILED, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESSFUL, ORDER_LIST_FAILED, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESSFUL, ORDER_PAY_FAILED, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESSFUL, ORDER_TOTAL_FAILED, ORDER_TOTAL_REQUEST, ORDER_TOTAL_RESET, ORDER_TOTAL_SUCCESSFUL } from "../constants/orderConst";



export const createOrderReducer = (state ={}, action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESSFUL:
            return {loading: false, success: true, order: action.payload};
        case ORDER_CREATE_FAILED:
            return {loading: false, error: action.payload};
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const OrderDetailReducer = (state={loading: true}, action)=>{
    switch(action.type){
        case ORDER_DETAIL_REQUEST:
            return {loading: true};
        case ORDER_DETAIL_SUCCESSFUL:
            return {loading: false, order: action.payload};
        case ORDER_DETAIL_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const orderPayReducer = (state={}, action)=>{
    switch(action.type)
    {
        case ORDER_PAY_REQUEST:
            return {loading: true};
        case ORDER_PAY_SUCCESSFUL:
            return {loading: false, success: true};
        case ORDER_PAY_FAILED:
            return {loading: false, error: action.payload};
        case ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
};

export const orderListReducer = (state = {orders: []}, action)=>{
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading: true};
        case ORDER_LIST_SUCCESSFUL:
            return {loading: false, orders: action.payload};
        case ORDER_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const orderAggregateReducer = (state = {loading: true, userSpending: {}}, action)=>{
    switch(action.type)
    {
        case ORDER_TOTAL_REQUEST:
            return {loading: true};
        case ORDER_TOTAL_SUCCESSFUL:
            return {loading: false, userSpending: action.payload};
        case ORDER_TOTAL_FAILED:
            return {loading: false, error: action.payload};
        case ORDER_TOTAL_RESET:
            return {};
        default:
            return state;
    }    
};