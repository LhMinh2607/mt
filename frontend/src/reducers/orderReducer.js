import { ALL_ORDER_LIST_FAILED, ALL_ORDER_LIST_REQUEST, ALL_ORDER_LIST_SUCCESSFUL, LEAST_ORDERED_DRINK_FAILED, LEAST_ORDERED_DRINK_REQUEST, LEAST_ORDERED_DRINK_SUCCESSFUL, MOST_ORDERED_DRINK_FAILED, MOST_ORDERED_DRINK_REQUEST, MOST_ORDERED_DRINK_SUCCESSFUL, OORDER_TOTAL_OF_ALL_USERS_RESET, ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESSFUL, ORDER_DATE_FAILED, ORDER_DATE_REQUEST, ORDER_DATE_SUCCESSFUL, ORDER_DETAIL_FAILED, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESSFUL, ORDER_FILTER_BY_DATE_FAILED, ORDER_FILTER_BY_DATE_REQUEST, ORDER_FILTER_BY_DATE_SUCCESSFUL, ORDER_ISDELIVERED_FAILED, ORDER_ISDELIVERED_REQUEST, ORDER_ISDELIVERED_SUCCESSFUL, ORDER_ISPAID_FAILED, ORDER_ISPAID_REQUEST, ORDER_ISPAID_SUCCESSFUL, ORDER_LIST_FAILED, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESSFUL, ORDER_MAX_TOTAL_FAILED, ORDER_MAX_TOTAL_REQUEST, ORDER_MAX_TOTAL_SUCCESSFUL, ORDER_MONTH_FAILED, ORDER_MONTH_REQUEST, ORDER_MONTH_SUCCESSFUL, ORDER_PAY_FAILED, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESSFUL, ORDER_SORT_BY_DATE_FAILED, ORDER_SORT_BY_DATE_REQUEST, ORDER_SORT_BY_DATE_SUCCESSFUL, ORDER_SORT_BY_TOTAL_FAILED, ORDER_SORT_BY_TOTAL_REQUEST, ORDER_SORT_BY_TOTAL_SUCCESSFUL, ORDER_TOTAL_FAILED, ORDER_TOTAL_OF_ALL_USERS_FAILED, ORDER_TOTAL_OF_ALL_USERS_REQUEST, ORDER_TOTAL_OF_ALL_USERS_SUCCESSFUL, ORDER_TOTAL_REQUEST, ORDER_TOTAL_RESET, ORDER_TOTAL_SUCCESSFUL, ORDER_VERIFY_DELIVERED_FAILED, ORDER_VERIFY_DELIVERED_REQUEST, ORDER_VERIFY_DELIVERED_SUCCESSFUL, ORDER_VERIFY_PAID_FAILED, ORDER_VERIFY_PAID_REQUEST, ORDER_VERIFY_PAID_SUCCESSFUL, ORDER_YEAR_FAILED, ORDER_YEAR_REQUEST, ORDER_YEAR_SUCCESSFUL } from "../constants/orderConst";



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

export const orderAggregateListReducer = (state = {loading: true, userSpending: {}}, action)=>{
    switch(action.type)
    {
        case ORDER_TOTAL_OF_ALL_USERS_REQUEST:
            return {loading: true};
        case ORDER_TOTAL_OF_ALL_USERS_SUCCESSFUL:
            return {loading: false, userSpendingsList: action.payload};
        case ORDER_TOTAL_OF_ALL_USERS_FAILED:
            return {loading: false, error: action.payload};
        case OORDER_TOTAL_OF_ALL_USERS_RESET:
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

export const orderPaidReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_ISPAID_REQUEST:
            return {loading: true};
        case ORDER_ISPAID_SUCCESSFUL:
            return {loading: false, paidOrders: action.payload};
        case ORDER_ISPAID_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

// export const orderNotPaidReducer = (state = {}, action)=>{
//     switch(action.type)
//     {
//         case ORDER_ISNOTPAID_REQUEST:
//             return {loading: true};
//         case ORDER_ISNOTPAID_SUCCESSFUL:
//             return {loading: false, notPaidOrders: action.payload};
//         case ORDER_ISNOTPAID_FAILED:
//             return {loading: false, error: action.payload};
//         default:
//             return state;
//     }    
// };

export const orderDeliveredReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_ISDELIVERED_REQUEST:
            return {loading: true};
        case ORDER_ISDELIVERED_SUCCESSFUL:
            return {loading: false, deliveredOrders: action.payload};
        case ORDER_ISDELIVERED_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

// export const orderNotDeliveredReducer = (state = {}, action)=>{
//     switch(action.type)
//     {
//         case ORDER_ISNOTDELIVERED_REQUEST:
//             return {loading: true};
//         case ORDER_ISNOTDELIVERED_SUCCESSFUL:
//             return {loading: false, notDeliveredOrders: action.payload};
//         case ORDER_ISNOTDELIVERED_FAILED:
//             return {loading: false, error: action.payload};
//         default:
//             return state;
//     }    
// };

export const orderMaxTotalReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_MAX_TOTAL_REQUEST:
            return {loading: true};
        case ORDER_MAX_TOTAL_SUCCESSFUL:
            return {loading: false, maxTotalOrders: action.payload};
        case ORDER_MAX_TOTAL_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const orderSortedByDateReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_SORT_BY_DATE_REQUEST:
            return {loading: true};
        case ORDER_SORT_BY_DATE_SUCCESSFUL:
            return {loading: false, sortedOrdersByDate: action.payload};
        case ORDER_SORT_BY_DATE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const orderSortedByTotalReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case ORDER_SORT_BY_TOTAL_REQUEST:
            return {loading: true};
        case ORDER_SORT_BY_TOTAL_SUCCESSFUL:
            return {loading: false, sortedOrdersByTotal: action.payload};
        case ORDER_SORT_BY_TOTAL_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const drinkMostOrderedReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case MOST_ORDERED_DRINK_REQUEST:
            return {loading: true};
        case MOST_ORDERED_DRINK_SUCCESSFUL:
            return {loading: false, mostOrderedDrink: action.payload};
        case MOST_ORDERED_DRINK_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const drinkLeastOrderedReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case LEAST_ORDERED_DRINK_REQUEST:
            return {loading: true};
        case LEAST_ORDERED_DRINK_SUCCESSFUL:
            return {loading: false, leastOrderedDrink: action.payload};
        case LEAST_ORDERED_DRINK_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const paidOrderVerifyingReducer = (state ={}, action)=>{
    switch(action.type){
        case ORDER_VERIFY_PAID_REQUEST:
            return {loading: true};
        case ORDER_VERIFY_PAID_SUCCESSFUL:
            return {loading: false, success: true};
        case ORDER_VERIFY_PAID_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const deliveredOrderVerifyingReducer = (state ={}, action)=>{
    switch(action.type){
        case ORDER_VERIFY_DELIVERED_REQUEST:
            return {loading: true};
        case ORDER_VERIFY_DELIVERED_SUCCESSFUL:
            return {loading: false, success: true};
        case ORDER_VERIFY_DELIVERED_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};