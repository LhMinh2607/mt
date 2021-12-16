import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {drinkAddingReducer, drinkFeatureAddingReducer, drinkFeatureRemovingAllReducer, drinkFeatureRemovingReducer, drinkFilterByPriceReducer, drinkFilterByStarReducer, drinkListReducer, drinkRatingReducer, drinksDetailReducer, drinkSearchReducer, drinkTagsAddingReducer, drinkTagsRemovingReducer, drinkUpdatingReducer, relatedDrinkListReducer} from './reducers/drinkReducer';
import { userDetailReducer, userListReducer, userMostSpendingReducer, userSearchingReducer, userSigninReducer, userSignupReducer, userSortedByDateReducer, userSortedByNameReducer, userSortedByOrderReducer, userSortedBySpendingReducer, userUpdateProfileReducer } from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer';
import { allOrderDateReducer, allOrderFilterByDateReducer, allOrderListReducer, allOrderMonthReducer, allOrderYearReducer, createOrderReducer, deliveredOrderReducer, deliveredOrderVerifyingReducer, drinkLeastOrderedReducer, drinkMostOrderedReducer, leastOrderedDrinkReducer, maxTotalOrderReducer, mostOrderedDrinkReducer, orderAggregateListReducer, orderAggregateReducer, orderDeliveredReducer, OrderDetailReducer, orderListReducer, orderMaxTotalReducer, orderPaidReducer, orderSortedByDateReducer, orderSortedByTotalReducer, paidOrderReducer, paidOrderVerifyingReducer } from './reducers/orderReducer';
import { detailsOfOrder } from './actions/orderAction';
import { userCommentListReducer, userCommentReducer, userDeleteCommentReducer, userEditCommentReducer, userFilterCommentByStarReducer, userSortCommentReducer } from './reducers/commentReducer';
import { postCommentEditingReducers, postCommentPostingReducers, postCreatingReducers, postDeletingReducers, postDetailsReducers, postEditingReducers, postFilteringReducers, postListReducers, postSearchingReducers, postSortingReducers } from './reducers/postReducer';

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

    orderPaid: orderPaidReducer,//streak #10 done
    orderDelivered: orderDeliveredReducer,
    orderMaxTotal: orderMaxTotalReducer,
    orderSortedByDate: orderSortedByDateReducer,
    orderSortedByTotal: orderSortedByTotalReducer,
    drinkMostOrdered: drinkMostOrderedReducer,
    drinkLeastOrdered: drinkLeastOrderedReducer,
    userSearching: userSearchingReducer,
    userMostSpending: userMostSpendingReducer,
    userSortedBySpending: userSortedBySpendingReducer,
    userSortedByOrder: userSortedByOrderReducer,
    userSortedByName: userSortedByNameReducer,
    userSortedByDate: userSortedByDateReducer,
    orderAggregateList: orderAggregateListReducer,
    
    drinkAdding: drinkAddingReducer,//streak #11
    drinkUpdating: drinkUpdatingReducer,
    drinkDeleting: drinksDetailReducer,
    drinkFeatureAdding: drinkFeatureAddingReducer, //not yet implemented
    drinkFeatureRemoving: drinkFeatureRemovingReducer,//not yet implemented
    drinkFeatureRemovingAll: drinkFeatureRemovingAllReducer,//not yet implemented

    postCreating: postCreatingReducers,//streak #12 + quantity can be subtracted by ordering now, admin can confirm isPaid and isDelivered now, fixed several minor issues
    postList: postListReducers,
    postDetails: postDetailsReducers,
    postEditing: postEditingReducers,
    postDeleting: postDeletingReducers,
    postCommentPosting: postCommentPostingReducers,
    postComemntEditing: postCommentEditingReducers,
    postCommentDeleting: postDeletingReducers,
    postSearching: postSearchingReducers,
    postSorting: postSortingReducers,
    postFiltering: postFilteringReducers,
    paidOrderVerifying: paidOrderVerifyingReducer,
    deliveredOrderVerifying: deliveredOrderVerifyingReducer,

    //streak #13 + #14 + #15 impoving GUIs

})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;
