import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { listOfDrinks, removeAllDrinkFromFeatureList, removeDrinkFromFeatureList, showFeatureList, showSuggestedDrinkList } from '../actions/drinkAction';
import { Slide } from 'react-slideshow-image';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import DrinkPanel from '../components/DrinkPanel';

export default function HomePage() {

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userDetail = useSelector(state => state.userDetail);
    const {loading: loadingDetail, error: errorDetail, user} = userDetail;

    const drinkFeatureList = useSelector(state => state.drinkFeatureList);
    const {loading, error, drinkIds} = drinkFeatureList;

    const drinkList = useSelector((state) => state.drinkList);
    const {loading: loadingList, error: errorList, drinks} = drinkList;

    // const relatedDrinkList = useSelector(state=>state.relatedDrinkList);
    // const {loading: loadingRelated, error: errorRelated, relatedDrinks} = relatedDrinkList;

    const suggestedDrinkList = useSelector(state=>state.suggestedDrinkList);
    const {loading: loadingRelated, error: errorRelated, suggestedDrinks} = suggestedDrinkList;


    const removeAllFeatureListHandler = () =>{
        dispatch(removeAllDrinkFromFeatureList());
        window.location.reload();
    }
    const removeFromFeature = (d) =>{
        //alert(d);
        dispatch(removeDrinkFromFeatureList(d));
    }

    const slideImages = [
        {
          url: 'https://styles.redditmedia.com/t5_2b5e2g/styles/profileIcon_snoob208c0c6-0f5e-4fab-bc85-36f4f41d2d06-headshot-f.png?width=256&height=256&crop=256:256,smart&s=c76d8073f4d60216a43e7237131be15538578c67',
          caption: 'Slide 1'
        },
        {
          url: 'https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.15752-9/250771644_410615750559520_2201615669129828114_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=PLvdzfvFGPUAX8t2Jxs&_nc_ht=scontent.fsgn6-1.fna&oh=03_AVLU4ZmRntPyGiqIdeBXBaSY7og0W3kBMW4GtZdHf8I-6A&oe=61DCF5F7',
          caption: 'Slide 2'
        },
        {
          url: 'https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.15752-9/250771644_410615750559520_2201615669129828114_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=PLvdzfvFGPUAX8t2Jxs&_nc_ht=scontent.fsgn6-1.fna&oh=03_AVLU4ZmRntPyGiqIdeBXBaSY7og0W3kBMW4GtZdHf8I-6A&oe=61DCF5F7',
          caption: 'Slide 3'
        },
      ];

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(showFeatureList());
        dispatch(listOfDrinks());
        if(userInfo){
            dispatch(showSuggestedDrinkList(userInfo._id));
        }
        
        //dispatch(detailsOfUser(userInfo._id));
    }, [dispatch]);

    return (
        <div>
            <div>
                <Link className="linkButton" to="/drink">MUA LIỀN!!!</Link>
            </div>
            <div className="slide-container card">
                <div className="row center">
                    <label className="bold-text drink-Title">MÓN TRƯNG BÀY</label>
                </div>
                    <Slide>
                        {
                            loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="error">{error}</MessageBox>) :
                            drinkIds && (drinkIds.map(d=>(
                                loadingList ? (<LoadingBox></LoadingBox>) : errorList ? (<MessageBox variant="error">{errorList}</MessageBox>) : drinks &&
                                drinks.map(drink=>(
                                    d === drink._id  && (
                                    <div className="each-slide" key={drink._id}>
                                        <div className="card-body">
                                            <Link to={`/drink/${drink._id}`}><div className='effect effect-glitch' style={{backgroundImage: `url(${drink.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}>
                                                <img src={drink.image} className="slide-image effect-img"></img>
                                                </div></Link>
                                            <div className="row center">
                                                <Link to={`/drink/${drink._id}`}>{drink.name}</Link>
                                            </div>
                                            { userInfo &&
                                                userInfo.role==='admin' && (
                                                    <div style={{maxWidth: '40rem'}}><button className="admin block" onClick={(d)=>{
                                                        removeFromFeature(d);
                                                        window.location.reload();
                                                    }}>GỠ KHỎI TRƯNG BÀY</button></div>
                                                )
                                            }
                                        </div>
                                        
                                    </div>
                                            
                                    )
                                ))
                            )))
                        }
                        <div className="each-slide" key={1}>
                            <div className="card-body">
                            </div>
                        </div>
                    </Slide>
                {
                    userInfo &&
                    userInfo.role==='admin' && (
                    <div className="row">
                        <button className="admin block" onClick={removeAllFeatureListHandler}>GỠ HẾT</button>
                    </div>)
                }
                
            </div>
            

            {suggestedDrinks && <h2 className="row center">SẢN PHẨM ĐỀ XUẤT</h2>}
            {
                loadingRelated ? (
                    <LoadingBox></LoadingBox>
                ) :
                errorRelated ? (
                    <MessageBox variant="error">{errorRelated}</MessageBox>
                ) : (
                    
                    <div className="row center">
                        
                    {
                        suggestedDrinks && suggestedDrinks.map((d) => (
                        <DrinkPanel key={d._id} d = {d}>
                            
                        </DrinkPanel>
                        
                        ))}
                    </div>)}
        </div>
    )
}
