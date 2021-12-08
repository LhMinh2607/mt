import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {drinkFilterByPriceReducer, drinkFilterByStarReducer, drinkListReducer, drinkRatingReducer, drinksDetailReducer, drinkSearchReducer, drinkTagsAddingReducer, drinkTagsRemovingReducer, relatedDrinkListReducer} from './reducers/drinkReducer';
import { userDetailReducer, userListReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer';
import { allOrderDateReducer, allOrderFilterByDateReducer, allOrderListReducer, allOrderMonthReducer, allOrderYearReducer, createOrderReducer, orderAggregateReducer, OrderDetailReducer, orderListReducer } from './reducers/orderReducer';
import { detailsOfOrder } from './actions/orderAction';
import { userCommentListReducer, userCommentReducer, userDeleteCommentReducer, userEditCommentReducer, userFilterCommentByStarReducer, userSortCommentReducer } from './reducers/commentReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : [],    
        paymentMethod: 'Cash', //temporarily fixed
        shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {},
    }
};

const reducer = combineReducers({//bugs are fixed on every streak
    drinkList: drinkListReducer, //streak #1 + set up the project with frontend, backend and database
    userSignup: userSignupReducer, //streak #2
    userSignin: userSigninReducer,
    userList: userListReducer,
    cart: cartReducer,
    drinkDetail: drinksDetailReducer,//streak #3
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    relatedDrinkList: relatedDrinkListReducer, //streak #4
    drinkSearch: drinkSearchReducer,
    drinkFilterByRating: drinkFilterByStarReducer,
    drinkFilterByPrice: drinkFilterByPriceReducer,
    orderCreate: createOrderReducer, //streak #5
    orderDetail: OrderDetailReducer,
    orderList: orderListReducer,
    orderAggregate: orderAggregateReducer,
    userComment: userCommentReducer, //streak #6
    userEditComment: userEditCommentReducer,
    userDeleteComment: userDeleteCommentReducer,
    userCommentList: userCommentListReducer,
    userFilterCommentByStar: userFilterCommentByStarReducer,
    userSortComment: userSortCommentReducer,
    drinkRating: drinkRatingReducer,//streak #7 + setup admin and adminRoute + setup some GUIs for admin as well
    drinkTagsAdding: drinkTagsAddingReducer,//streak #8
    drinkTagRemoving: drinkTagsRemovingReducer,
    allOrderList: allOrderListReducer,
    allOrderFilterByDate: allOrderFilterByDateReducer,
    allOrderDate: allOrderDateReducer,
    allOrderMonth: allOrderMonthReducer,
    allOrderYear: allOrderYearReducer,
    
    //streak #9 + set up topping function (Add to cart with topping as well as the order)

    //streak #10 coming soon

})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;
