import { DRINK_LIST_REQUEST, DRINK_LIST_SUCCESSFUL, DRINK_LIST_FAILED, DRINK_DETAIL_REQUEST, DRINK_DETAIL_SUCCESSFUL, DRINK_DETAIL_FAILED, SHOW_RELATED_DRINK_REQUEST, SHOW_RELATED_DRINK_SUCCESSFUL, SHOW_RELATED_DRINK_FAILED, DRINK_SEARCH_REQUEST, DRINK_SEARCH_SUCCESSFUL, DRINK_SEARCH_FAILED, DRINK_FILTER_BY_STAR_REQUEST, DRINK_FILTER_BY_STAR_SUCCESSFUL, DRINK_FILTER_BY_STAR_FAILED, DRINK_FILTER_BY_PRICE_REQUEST, DRINK_FILTER_BY_PRICE_SUCCESSFUL, DRINK_FILTER_BY_PRICE_FAILED, DRINK_RATING_REQUEST, DRINK_RATING_SUCCESSFUL, DRINK_RATING_FAILED } from "../constants/drinkConst";



export const drinkListReducer = (state = {loading: true, drinks: []}, action) =>{
    switch(action.type){
        case DRINK_LIST_REQUEST: 
            return {loading: true};
        case DRINK_LIST_SUCCESSFUL:
            return {loading: false, drinks: action.payload};
        case DRINK_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const drinksDetailReducer = (
    state = { loading: true, drink: {}}, 
    action) => {
    switch (action.type){
        case DRINK_DETAIL_REQUEST:
            return {loading: true};
        case DRINK_DETAIL_SUCCESSFUL:
            return {loading: false, drink: action.payload};
        case DRINK_DETAIL_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const relatedDrinkListReducer = (state={}, action)=>{
    switch(action.type){
        case SHOW_RELATED_DRINK_REQUEST:
            return {loading: true};
        case SHOW_RELATED_DRINK_SUCCESSFUL:
            return {loading: false, relatedDrinks: action.payload};
        case SHOW_RELATED_DRINK_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const drinkSearchReducer = (state={loading: true, result: []}, action)=>{
    switch(action.type){
        case DRINK_SEARCH_REQUEST:
            return {loading: true};
        case DRINK_SEARCH_SUCCESSFUL:
            return {loading: false, result: action.payload};
        case DRINK_SEARCH_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const drinkFilterByStarReducer = (state={}, action)=>{
    switch(action.type){
        case DRINK_FILTER_BY_STAR_REQUEST:
            return {loading: true};
        case DRINK_FILTER_BY_STAR_SUCCESSFUL:
            return {loading: false, result: action.payload};
        case DRINK_FILTER_BY_STAR_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const drinkFilterByPriceReducer = (state={}, action)=>{
    switch(action.type){
        case DRINK_FILTER_BY_PRICE_REQUEST:
            return {loading: true};
        case DRINK_FILTER_BY_PRICE_SUCCESSFUL:
            return {loading: false, result: action.payload};
        case DRINK_FILTER_BY_PRICE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const drinkRatingReducer = ( state = {}, action) => {
    switch (action.type){
        case DRINK_RATING_REQUEST:
            return {loading: true};
        case DRINK_RATING_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_RATING_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};