import { DRINK_LIST_REQUEST, DRINK_LIST_SUCCESSFUL, DRINK_LIST_FAILED, DRINK_DETAIL_REQUEST, DRINK_DETAIL_SUCCESSFUL, DRINK_DETAIL_FAILED, SHOW_RELATED_DRINK_REQUEST, SHOW_RELATED_DRINK_SUCCESSFUL, SHOW_RELATED_DRINK_FAILED, DRINK_SEARCH_REQUEST, DRINK_SEARCH_SUCCESSFUL, DRINK_SEARCH_FAILED, DRINK_FILTER_BY_STAR_REQUEST, DRINK_FILTER_BY_STAR_SUCCESSFUL, DRINK_FILTER_BY_STAR_FAILED, DRINK_FILTER_BY_PRICE_REQUEST, DRINK_FILTER_BY_PRICE_SUCCESSFUL, DRINK_FILTER_BY_PRICE_FAILED, DRINK_RATING_REQUEST, DRINK_RATING_SUCCESSFUL, DRINK_RATING_FAILED, DRINK_ADD_TAG_REQUEST, DRINK_ADD_TAG_SUCCESSFUL, DRINK_ADD_TAG_FAILED, DRINK_EDIT_TAG_REQUEST, DRINK_EDIT_TAG_SUCCESSFUL, DRINK_EDIT_TAG_FAILED, DRINK_REMOVE_TAG_REQUEST, DRINK_REMOVE_TAG_SUCCESSFUL, DRINK_REMOVE_TAG_FAILED, DRINK_ADD_REQUEST, DRINK_ADD_SUCCESSFUL, DRINK_ADD_FAILED, DRINK_UPDATE_REQUEST, DRINK_UPDATE_SUCCESSFUL, DRINK_UPDATE_FAILED, DRINK_DELETE_REQUEST, DRINK_DELETE_SUCCESSFUL, DRINK_DELETE_FAILED, DRINK_ADD_FEATURE_REQUEST, DRINK_ADD_FEATURE_SUCCESSFUL, DRINK_ADD_FEATURE_FAILED, DRINK_REMOVE_FEATURE_REQUEST, DRINK_REMOVE_FEATURE_SUCCESSFUL, DRINK_REMOVE_FEATURE_FAILED, DRINK_REMOVE_ALL_FEATURE_REQUEST, DRINK_REMOVE_ALL_FEATURE_SUCCESSFUL, DRINK_REMOVE_ALL_FEATURE_FAILED } from "../constants/drinkConst";



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

export const drinkTagsAddingReducer = (state={}, action)=>{
    switch(action.type){
        case DRINK_ADD_TAG_REQUEST:
            return {loading: true};
        case DRINK_ADD_TAG_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_ADD_TAG_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const drinkTagsRemovingReducer = (state={}, action)=>{
    switch(action.type){
        case DRINK_REMOVE_TAG_REQUEST:
            return {loading: true};
        case DRINK_REMOVE_TAG_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_REMOVE_TAG_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const drinkAddingReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case DRINK_ADD_REQUEST:
            return {loading: true};
        case DRINK_ADD_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_ADD_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const drinkUpdatingReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case DRINK_UPDATE_REQUEST:
            return {loading: true};
        case DRINK_UPDATE_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_UPDATE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }    
};

export const drinkRemovingReducer = (state={}, action)=>{
    switch(action.type){
        case DRINK_DELETE_REQUEST:
            return {loading: true};
        case DRINK_DELETE_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_DELETE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const drinkFeatureAddingReducer = (state={}, action)=>{
    switch(action.type){
        case DRINK_ADD_FEATURE_REQUEST:
            return {loading: true};
        case DRINK_ADD_FEATURE_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_ADD_FEATURE_FAILED:    
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const drinkFeatureRemovingReducer = (state={}, action)=>{
    switch(action.type){
        case DRINK_REMOVE_FEATURE_REQUEST:
            return {loading: true};
        case DRINK_REMOVE_FEATURE_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_REMOVE_FEATURE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const drinkFeatureRemovingAllReducer = (state={}, action)=>{
    switch(action.type){
        case DRINK_REMOVE_ALL_FEATURE_REQUEST:
            return {loading: true};
        case DRINK_REMOVE_ALL_FEATURE_SUCCESSFUL:
            return {loading: false, success: true};
        case DRINK_REMOVE_ALL_FEATURE_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

