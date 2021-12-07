import axios from 'axios'
import {DRINK_LIST_REQUEST, DRINK_LIST_SUCCESSFUL, DRINK_LIST_FAILED, DRINK_DETAIL_REQUEST, DRINK_DETAIL_SUCCESSFUL, DRINK_DETAIL_FAILED, SHOW_RELATED_DRINK_REQUEST, SHOW_RELATED_DRINK_SUCCESSFUL, SHOW_RELATED_DRINK_FAILED, DRINK_SEARCH_REQUEST, DRINK_SEARCH_SUCCESSFUL, DRINK_SEARCH_FAILED, DRINK_FILTER_BY_STAR_REQUEST, DRINK_FILTER_BY_STAR_SUCCESSFUL, DRINK_FILTER_BY_STAR_FAILED, DRINK_FILTER_BY_PRICE_REQUEST, DRINK_FILTER_BY_PRICE_SUCCESSFUL, DRINK_FILTER_BY_PRICE_FAILED, DRINK_RATING_REQUEST, DRINK_RATING_SUCCESSFUL, DRINK_RATING_FAILED, DRINK_ADD_TAG_REQUEST, DRINK_ADD_TAG_SUCCESSFUL, DRINK_ADD_TAG_FAILED, DRINK_REMOVE_TAG_REQUEST, DRINK_REMOVE_TAG_SUCCESSFUL, DRINK_REMOVE_TAG_FAILED} from '../constants/drinkConst'

export const listOfDrinks = () => async (dispatch) =>{
    dispatch({
        type: DRINK_LIST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/drink/list');
        dispatch({type: DRINK_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: DRINK_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};


export const detailsOfDrink = (drinkId) => async(dispatch) =>{
    dispatch({type: DRINK_DETAIL_REQUEST, payload: drinkId});
    try{
        const {data} = await axios.get(`/api/drink/${drinkId}`);
        dispatch({type: DRINK_DETAIL_SUCCESSFUL, payload: data});
    }catch(error)
    {
        dispatch({type: DRINK_DETAIL_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
            //payload: error.message
        });
    }
};

export const showRelatedDrinkList = (drinkId) => async(dispatch)=>{
    dispatch({
        type: SHOW_RELATED_DRINK_REQUEST, payload: drinkId
    });
    try {
        //alert(tag);
        const {data} = await axios.get(`/api/drink/related/${drinkId}`); 
        dispatch({type: SHOW_RELATED_DRINK_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: SHOW_RELATED_DRINK_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const searchDrink = (keyword) => async(dispatch)=>{
    dispatch({
        type: DRINK_SEARCH_REQUEST, payload: keyword
    });
    try {
        //alert(tag);
        //alert(keyword);
        const {data} = await axios.get(`/api/drink/search/${keyword}`);
        dispatch({type: DRINK_SEARCH_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: DRINK_SEARCH_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const filterDrinkByStar = (star) => async(dispatch)=>{
    dispatch({
        type: DRINK_FILTER_BY_STAR_REQUEST, payload: star
    });
    try {
        const {data} = await axios.get(`/api/drink/filter/star/${star}`);
        dispatch({type: DRINK_FILTER_BY_STAR_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: DRINK_FILTER_BY_STAR_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const filterDrinkByPrice = (price) => async(dispatch)=>{
    dispatch({
        type: DRINK_FILTER_BY_PRICE_REQUEST, payload: price
    });
    try {
        const {data} = await axios.get(`/api/drink/filter/price/${price}`);
        dispatch({type: DRINK_FILTER_BY_PRICE_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: DRINK_FILTER_BY_PRICE_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const getDrinkRating = (drinkId) => async(dispatch) =>{
    dispatch({type: DRINK_RATING_REQUEST, payload: drinkId});
    try{
        const {data} = await axios.get(`/api/drink/${drinkId}/rating`);
        dispatch({type: DRINK_RATING_SUCCESSFUL, payload: data});
    }catch(error)
    {
        dispatch({type: DRINK_RATING_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
            //payload: error.message
        });
    }
};

export const addTagToDrink = (drinkId, tagContent) =>async(dispatch) => {
    dispatch({
        type: DRINK_ADD_TAG_REQUEST, payload: {drinkId, tagContent}
    });
    try {
        const {data} = await axios.put(`/api/admin/drink/tag/add/${drinkId}`, {drinkId, tagContent});
        dispatch({type: DRINK_ADD_TAG_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: DRINK_ADD_TAG_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const removeTagFromDrink = (drinkId) =>async(dispatch) => {
    dispatch({
        type: DRINK_REMOVE_TAG_REQUEST, payload: drinkId
    });
    try {
        const {data} = await axios.put(`/api/admin/drink/tag/remove/${drinkId}`);
        dispatch({type: DRINK_REMOVE_TAG_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: DRINK_REMOVE_TAG_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}