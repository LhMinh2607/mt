import React, { useEffect, useState } from 'react'
import { filterDrinkByPrice, filterDrinkByStar, listOfDrinks, searchDrink } from '../actions/drinkAction';
import DrinkPanel from '../components/DrinkPanel';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux'





export default function DrinkPage() {
    
    const dispatch = useDispatch();
    const drinkList = useSelector((state) => state.drinkList);
    const {loading, error, drinks} = drinkList;

    const drinkSearch = useSelector(state=>state.drinkSearch);
    const {loading: loadingResult, error: errorResult, result} = drinkSearch;

    const drinkFilterByPrice = useSelector(state=>state.drinkFilterByPrice);
    const {loading: loadingPriceResult, error: errorPriceResult, result: priceResult} = drinkFilterByPrice;

    const drinkFilterByRating = useSelector(state=>state.drinkFilterByRating);
    const {loading: loadingStarResult, error: errorStarResult, result: starResult} = drinkFilterByRating;

    const [keyword, setKeyword] = useState("");
    const [filteredStar, setFilteredStar] = useState("");
    const [priceRange, setPriceRange] = useState("");


    const filterStarBy = (e) => {
        setFilteredStar(e.target.value); //still need this to show value on the UI component
        setKeyword("");
        setPriceRange("");
        dispatch(filterDrinkByStar(e.target.value)); //shove the data into the action function
      }

    const setTheKeyword = (e) =>{
        setFilteredStar("");
        setPriceRange("");
        setKeyword(e.target.value);
        dispatch(searchDrink(e.target.value));
    }

    const setThePrice =(e) =>{
        setFilteredStar("");
        setKeyword("");
        if(parseInt(e.target.value)<0)
        {
            alert("GIÁ KHÔNG ÂM ĐƯỢC NHA");
        }else{
            setPriceRange(e.target.value);
            dispatch(filterDrinkByPrice(e.target.value));
        }
    }

    useEffect(()=>{
        window.scrollTo({
        top: 0, 
        });

        dispatch(listOfDrinks());
    }, [dispatch]);

    

    return (
        <div>
            <div className="row center">
                <div className="search-background row center">
                {/* <label htmlFor="searchField" className="fa fa-search"></label>
                <button type="button" className="searchBtn"></button> */}
                <div>
                    <div className='box'><select onChange={filterStarBy} value={filteredStar}> 
                    <option value="" hidden>Lọc theo đánh giá</option>
                    <option value="5">5 sao trở xuống ⭐⭐⭐⭐⭐</option>
                    <option value="4">4 sao trở xuống ⭐⭐⭐⭐</option>
                    <option value="3">3 sao trở xuống ⭐⭐⭐</option>
                    <option value="2">2 sao trở xuống ⭐⭐</option>
                    <option value="1">1 sao trở xuống ⭐</option>
                    <option value="0">0 sao trở xuống</option>
                    </select></div>
                    </div>
                    <div>
                    <input type="text" id="searchField" className="basic-slide" value={keyword} onChange={setTheKeyword} placeholder="🔍Tìm kiếm"></input>
                    <label for="searchField"></label>
                    </div>
                    <div>
                    <input className="basic-slide" pattern="[0-9]+" step="1" min="0" max="9999999999" type="number" id="priceField" value={priceRange} onChange={setThePrice} placeholder="Lọc giá <="></input>
                    
                    </div>
                </div>
            </div>
            {filteredStar==="" && keyword==="" && priceRange==="" &&(
            loading ? (
                <LoadingBox></LoadingBox>
            ) :
            error ? (
                <MessageBox variant="error">{error}</MessageBox>
            ) : (
                <div className="row center">
                {
                    drinks.map((d) => (
                    <DrinkPanel key={d._id} d = {d}>
                        
                    </DrinkPanel>
                    
                    ))}
                </div>))}
            
                {keyword!=="" && result && (result.length>0 ?(
          loadingResult ? (
            <LoadingBox></LoadingBox>
          ) :
          errorResult ? (
            <MessageBox variant="error">{errorResult}</MessageBox>
          ) : (
            <div className="row center">
              {
                result.map((d) => (
                  <DrinkPanel key={d._id} d = {d}>
                      
                  </DrinkPanel>
                  
                ))}
            </div>
            )) : (
              <MessageBox variant="error">{errorResult}</MessageBox>
            ))
          }
          { filteredStar &&(
            starResult ?(
          loadingStarResult ? (
            <LoadingBox></LoadingBox>
          ) :
          errorStarResult ? (
            <MessageBox variant="error">{errorStarResult}</MessageBox>
          ) : (
            <div className="row center">
              {
                starResult.map((d) => (
                  <DrinkPanel key={d._id} d = {d}>
                      
                  </DrinkPanel>
                  
                ))}
            </div>
            )) : (
              <MessageBox variant="error">{errorStarResult}</MessageBox>
            ))
          }
          {
          priceRange &&(
            priceResult ?( priceResult.length>0 &&(
          loadingPriceResult ? (
            <LoadingBox></LoadingBox>
          ) :
          errorPriceResult ? (
            <MessageBox variant="error">{errorPriceResult}</MessageBox>
          ) : (
            <div className="row center">
              {
                priceResult.map((d) => (
                  <DrinkPanel key={d._id} d = {d}>
                      
                  </DrinkPanel>
                  
                ))}
            </div>
            ))) : (
              <MessageBox variant="error">{errorPriceResult}</MessageBox>
            ))
          }
        </div>
    )
}
