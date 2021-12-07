import { ALL_ORDER_LIST_FAILED, ALL_ORDER_LIST_REQUEST, ALL_ORDER_LIST_SUCCESSFUL, ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESSFUL, ORDER_DATE_FAILED, ORDER_DATE_REQUEST, ORDER_DATE_SUCCESSFUL, ORDER_DETAIL_FAILED, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESSFUL, ORDER_FILTER_BY_DATE_FAILED, ORDER_FILTER_BY_DATE_REQUEST, ORDER_FILTER_BY_DATE_SUCCESSFUL, ORDER_LIST_FAILED, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESSFUL, ORDER_MONTH_FAILED, ORDER_MONTH_REQUEST, ORDER_MONTH_SUCCESSFUL, ORDER_PAY_FAILED, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESSFUL, ORDER_TOTAL_FAILED, ORDER_TOTAL_REQUEST, ORDER_TOTAL_RESET, ORDER_TOTAL_SUCCESSFUL, ORDER_YEAR_FAILED, ORDER_YEAR_REQUEST, ORDER_YEAR_SUCCESSFUL } from "../constants/orderConst";



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

export const allOrderListReducer = (state = {ordersList: []}, action)=>{
    switch(action.type){
        case ALL_ORDER_LIST_REQUEST:
            return {loading: true};
        case ALL_ORDER_LIST_SUCCESSFUL:
            return {loading: false, ordersList: action.payload};
        case ALL_ORDER_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const allOrderFilterByDateReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_FILTER_BY_DATE_REQUEST:
            return {loading: true};
        case ORDER_FILTER_BY_DATE_SUCCESSFUL:
            return {loading: false, filteredOrders: action.payload};
        case ORDER_FILTER_BY_DATE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const allOrderDateReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_DATE_REQUEST:
            return {loading: true};
        case ORDER_DATE_SUCCESSFUL:
            return {loading: false, ordersDate: action.payload};
        case ORDER_DATE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const allOrderMonthReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_MONTH_REQUEST:
            return {loading: true};
        case ORDER_MONTH_SUCCESSFUL:
            return {loading: false, ordersMonth: action.payload};
        case ORDER_MONTH_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const allOrderYearReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_YEAR_REQUEST:
            return {loading: true};
        case ORDER_YEAR_SUCCESSFUL:
            return {loading: false, ordersYear: action.payload};
        case ORDER_YEAR_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};