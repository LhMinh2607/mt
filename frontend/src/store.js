import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {drinkFilterByPriceReducer, drinkFilterByStarReducer, drinkListReducer, drinksDetailReducer, drinkSearchReducer, relatedDrinkListReducer} from './reducers/drinkReducer';
import { userDetailReducer, userListReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer';
import { createOrderReducer, OrderDetailReducer } from './reducers/orderReducer';
import { detailsOfOrder } from './actions/orderAction';

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

const reducer = combineReducers({
    drinkList: drinkListReducer,
    userSignup: userSignupReducer,
    userSignin: userSigninReducer,
    userList: userListReducer,
    cart: cartReducer,
    drinkDetail: drinksDetailReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    relatedDrinkList: relatedDrinkListReducer,
    drinkSearch: drinkSearchReducer,
    drinkFilterByRating: drinkFilterByStarReducer,
    drinkFilterByPrice: drinkFilterByPriceReducer,
    orderCreate: createOrderReducer,
    orderDetail: OrderDetailReducer,

})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;
