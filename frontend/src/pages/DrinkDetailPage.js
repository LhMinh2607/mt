import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { commitCommenting, filterCommentByStar, listOfComments, sortComment } from '../actions/commentAction';
import { addDrinkToFeatureList, addTagToDrink, deleteDrink, detailsOfDrink, getDrinkRating, removeTagFromDrink, showRelatedDrinkList } from '../actions/drinkAction';
import { listOfOrders } from '../actions/orderAction';
import { listOfUsers } from '../actions/userAction';
import CommentComponent from '../components/CommentComponent';
import DrinkPanel from '../components/DrinkPanel';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/RatingComponent';
import { USER_COMMENT_RESET } from '../constants/commentConst';
import Editor from "rich-markdown-editor";

export default function DrinkDetailPage() {

    const params = useParams();
    const id = params.drinkId;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const scrollToTopHandler = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const drinkDetail = useSelector((state)=> state.drinkDetail);
    const {loading, error, drink} = drinkDetail;

    const relatedDrinkList = useSelector(state=>state.relatedDrinkList);
    const {loading: loadingRelated, error: errorRelated, relatedDrinks} = relatedDrinkList;

    const userComment = useSelector(state => state.userComment);
    const {loading: loadingCommitComment, error: errorCommitError, success} = userComment;

    const userCommentList = useSelector(state => state.userCommentList);
    const {loading: loadingCommentList, error: errorCommentList, comments} = userCommentList;

    const orderList = useSelector(state => state.orderList);
    const {loading: loadingOrder, error: errorOrder, orders} = orderList;

    const userFilterCommentByStar = useSelector(state=>state.userFilterCommentByStar);
    const {loading: loadingStarFilter, error: errorStarFilter, comments: starComment} = userFilterCommentByStar;

    const userSortComment = useSelector(state=>state.userSortComment);
    const {loading: loadingSort, error: errorSort, comments: sortedComments} = userSortComment;

    const userList = useSelector((state) => state.userList);
    const {loading: loadingUserList, error: errorUserList, users} = userList;

    const drinkRating = useSelector(state=>state.drinkRating);
    const {loading: loadingRating, error: errorRating, success: successRating} = drinkRating;

    const drinkDeleting = useSelector(state=>state.drinkDeleting);
    const {loading: loadingDeleting, error: errorDeleting, success: successDeleting} = drinkDeleting;

    const drinkFeatureAdding = useSelector(state=>state.drinkFeatureAdding);
    const {loading: loadingFeature, error: errorFeature, success: successFeature} = drinkFeatureAdding;


    const [commentContent, setCommentContent] = useState('');
    const [rating, setRating] = useState('');
    const [star, setStar] = useState("");
    const [time, setTime] = useState("");
    const [tagEditBox, showTagEditBox] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const [commentBox, setCommentBox] = useState(false);

    const addToCartHandler = () =>{
        navigate(`/shopping_cart/${id}/topping=${topping}/quantity=${quantity}`);
    }

    const [quantity, setquantity] = useState(1);
    const [topping, setTopping] = useState("M???c ?????nh"); //default name of topping

    const enableTagEditBox = () => {
        showTagEditBox(!tagEditBox);
    }
    const [tagContent, setTagContent] = useState('');
    const addTag = () =>{
        if(tagContent===""){
            alert('CH??A NH???P G?? K??A!');
        }else{
            dispatch(addTagToDrink(drink._id, tagContent));
            enableTagEditBox();
            window.location.reload();
        }
    }
    const removeTag = () => {
        dispatch(removeTagFromDrink(drink._id));
        window.location.reload()
    }

    const commentSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(commitCommenting(userInfo._id, id, commentContent, rating));
        dispatch({type: USER_COMMENT_RESET});
        window.location.reload();
    }

    const filterCommentByRating = (e) =>{
        //alert(e.target.value);
        setTime("");
        setStar(e.target.value);
        dispatch(filterCommentByStar(id, e.target.value, "-1"));
    }

    const sortCommentByTime = (e) =>{
        
        if(star!=="")
        {
            dispatch(filterCommentByStar(id, star, e.target.value));
        }else if(star===""){
            setTime(e.target.value);
            dispatch(sortComment(id, e.target.value));
        }
        
    }

    const changeCommentBoxStatus = () =>{
        setCommentBox(!commentBox);
    }

    const deleteHandler = (e) =>{
        e.preventDefault();
        if(window.confirm('CH???C CH??A?'))
        {
            dispatch(deleteDrink(id));
        };
        
    }

    const addToFeatureHandler =(e)=>{
        e.preventDefault();
        //add to feature list to be displayed in HomePage.js
        dispatch(addDrinkToFeatureList(id));
    }

    useEffect(()=>{
        // dispatch({type: USER_FILTER_COMMENT_BY_STAR_RESET});
        // dispatch(getdrinkRating(drinkId));
        // if(userInfo)
        // {
        //     dispatch(detailsOfUser(userInfo._id));
        // }
        // setTimeout(()=>
        // {
        //     dispatch(detailsOfdrink(drinkId));
        //     dispatch(listOfComments(drinkId));
        //     dispatch(listOfUsers());
            
            
        //     dispatch(showRelateddrinkList(drinkId));
        // }, 50); //time to delay so that i can execute the getdrinkRating first (update the rating field in drink) before getting drinkDetails
        
        dispatch(getDrinkRating(id));
        dispatch(listOfUsers());
        dispatch(listOfComments(id));
        dispatch(detailsOfDrink(id));
        dispatch(showRelatedDrinkList(id));
        if(userInfo){
            dispatch(listOfOrders(userInfo._id));
        }
    }, [dispatch, id, userInfo]);
    return (
        <div className="row top">
            {
                loading ? (
                <LoadingBox></LoadingBox>
            ) :
            error ? (
                <MessageBox variant="error">{error}</MessageBox>
            ) : (
            <div>
            <div>
                <p id="top"><Link to="/drink"  className="linkButton">Quay v??? browse</Link></p>
                <div className="floatingDiv">
                    <button onClick={scrollToTopHandler}><i className="fa fa-arrow-up"></i></button>
                </div>
            </div>
            <div className="row top">
                <div className="col-2">
                    <img class="detailImage" src={drink.image} alt={drink.name}></img>
                    
                </div>
            
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{drink.name}</h1>
                        </li>
                        <Rating rating={drink.rating} reviewNum = {drink.reviewNum}></Rating>
                        {/* <li>
                            <Rating
                                rating={drink.rating}
                                reviewNum={drink.reviewNum}></Rating>
                        </li> */}
                        <li>
                        {/* {
                            loadingRating ? (<LoadingBox></LoadingBox>) : errorRating ? (<MessageBox variant="error">{errorRating}</MessageBox>) : 
                                successRating===true}
                            <Rating
                                rating={drink.rating}
                                reviewNum={drink.reviewNum}></Rating> */}

                        </li>
                        <li>
                            <label className="bold-text">Gi??:</label> {drink.price} ?????ng
                        </li>
                        <li>
                            <h1>M?? t???:</h1> 
                            <Editor
                                defaultValue={drink.description}
                                className='Editor'
                                readOnly={true}
                            />  
                            {/* <p><Linkify>{drink.description}</Linkify></p> */}
                        </li>
                        <li>
                            <label className="bold-text">Lo???i:</label> {drink.type}
                        </li>
                        <li>
                        
                        </li>
                    </ul>
                <div className="card card-body">
                    <ul>
                        <li>
                            <div className="row">
                                <div>Gi??</div>
                                <div className="price">
                                    {drink.price} ?????ng
                                </div>
                            </div>
                        </li>
                        <li>
                        {userInfo && (userInfo.role==='user' ?
                            (
                                <div>
                                    <button onClick={addToCartHandler} className="primary block">TH??M V??O GI??? H??NG</button>
                                    <div className='box'><select onChange={(e) => setTopping(e.target.value)} value={topping}>
                                        <option value="M???c ?????nh" >M???c ?????nh</option> {/*default topping, whether the drink has topping by default or not. It says clearly in the name so....*/}
                                        <option value="Tr??n ch??u ??en">Tr??n ch??u ??en</option> {/*black bubble or black pearl*/}
                                        <option value="Th???ch ph?? mai">Th???ch ph?? mai</option>
                                    </select></div>
                                    <div className="row">
                                    <div>S??? l?????ng</div>
                                        <div className='box'><select
                                            value={quantity}
                                            onChange={(e) => setquantity(e.target.value)}
                                            >
                                            {drink && [...Array(drink.quantity).keys()].map(
                                                (x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                                )
                                            )}
                                            </select></div>
                                        </div>
                                </div>
                            ) : userInfo.role==='admin' &&
                            (
                                <div className="row">
                                    <div><Link to={`/admin/drink/update/${drink._id}`}>
                                        <button className="admin">S???A</button>
                                    </Link></div>
                                    <div><button className="admin" onClick={deleteHandler}>X??A</button></div>
                                    <div>
                                    <button className="admin block" onClick={addToFeatureHandler}>TH??M V??O TR??NG B??Y</button>
                                    </div>
                                    {
                                        loadingFeature ? (<LoadingBox></LoadingBox>) : errorFeature ? (<MessageBox variant="error">{errorFeature}</MessageBox>) : 
                                        (
                                            successFeature &&
                                            (<div>
                                                <MessageBox variant="info">???? th??m v??o tr??ng b??y</MessageBox>
                                            </div>)
                                        )
                                    }
                                </div>

                            ) )
                        }
                        {!userInfo && 
                            (
                                <div>
                                    <button onClick={addToCartHandler} className="primary block">TH??M V??O GI??? H??NG</button>
                                    <div className="row">
                                    <div>S??? l?????ng</div>
                                        <div>
                                        <div className='box'><select
                                            value={quantity}
                                            onChange={(e) => setquantity(e.target.value)}
                                            >
                                            {drink && [...Array(drink.quantity).keys()].map(
                                                (x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                                )
                                            )}
                                            </select></div>
                                        </div>
                                    </div>
                                </div>
                            ) 
                        }
                        
                        </li>
                    </ul>
                    
                </div>                    
                </div>
                
            
                <div className="row center">
                    {
                        loadingRelated ? (<LoadingBox></LoadingBox>) : errorRelated ? (<MessageBox variant="error">{errorRelated}</MessageBox>)
                    :
                    relatedDrinks && (
                            relatedDrinks.length>0 ? (
                                <div>
                                    <MessageBox variant="info">S???N PH???M T????NG T???</MessageBox>
                                    {relatedDrinks.map(d=>(
                                        <DrinkPanel d = {d}></DrinkPanel>
                                    ))}
                                </div>
                            ) : <MessageBox variant="info">KH??NG C?? S???N PH???M T????NG T???</MessageBox>
                        )
                    }
                </div>
                <div className="col-1">
                    
                    {userInfo && userInfo.role==='user' && comments && comments.length>0 && (
                    <div>
                        <h1>B??nh lu???n ??i</h1>
                        <div className='box'><select className="filterSelect" onChange={filterCommentByRating} value={star}> 
                            <option value="" hidden>L???c theo ????nh gi??</option>
                            <option value="5">5 sao ???????????????</option>
                            <option value="4">4 sao ????????????</option>
                            <option value="3">3 sao ?????????</option>
                            <option value="2">2 sao ??????</option>
                            <option value="1">1 sao ???</option>
                            <option value="0">0 sao</option>
                            <option value="">B??? l???c</option>
                        </select></div>
                        <div className='box'><select className="filterSelect" onChange={sortCommentByTime} value={time}>
                            <option value="" hidden>S???p x???p</option>
                            <option value="-1">M???i nh???t</option>
                            <option value="1">C?? nh???t</option>
                        </select></div>
                        
                    </div>) 
                    }
                    {
                        loadingCommitComment ? (<LoadingBox></LoadingBox>) : errorCommitError && errorCommitError.includes("E11000") ? (<MessageBox variant="error">B???n ???? b??nh lu???n r???i. B???n c?? th??? s???a b??nh lu???n</MessageBox>) : 
                        (
                            success && (
                                <MessageBox variant="info">???? ????ng b??nh lu???n</MessageBox>
                            )
                        )
                    }
                    {
                        userInfo ? ( userInfo.role==='user' && commentBox===true ? (
                            loadingOrder ? (<LoadingBox></LoadingBox>) :
                            errorOrder ? (<MessageBox variant="error">{errorOrder}</MessageBox>) :
                            (orders.map(order=>( order.isPaid &&
                                order.orderItems.map(item=>(
                                    item.drink === id && (
                                    <div>
                                        <label htmlFor="content">
                                            B??nh lu???n v???i t??n {userInfo.name}
                                        </label>
                                        <button className="primary block" onClick={changeCommentBoxStatus}>????NG</button>
                                        <form onSubmit={commentSubmitHandler} disabled={disabled}>
                                            {/* <div className='box'><select onChange={(e)=>setRating(e.target.value)} required={true}>
                                                <option value="" hidden>rate</option>
                                                <option value="5">(???????????????)????</option>
                                                <option value="4">(????????????)????</option>
                                                <option value="3">(?????????)????</option>
                                                <option value="2">(??????)??????</option>
                                                <option value="1">(???)????</option>
                                                <option value="0">(Kh??ng sao lu??n)???? </option>
                                            </select></div> */}
                                            <div class="rating-css">
                                                <div class="star-icon">
                                                    <input value="1" type="radio" name="rating1" id="rating1" onChange={(e)=>setRating(e.target.value)} required={true}/>
                                                    <label for="rating1" class="fa fa-star"></label>
                                                    <input value="2" type="radio" name="rating1" id="rating2" onChange={(e)=>setRating(e.target.value)} required={true}/>
                                                    <label for="rating2" class="fa fa-star"></label>
                                                    <input value="3" type="radio" name="rating1" id="rating3" onChange={(e)=>setRating(e.target.value)} required={true}/>
                                                    <label for="rating3" class="fa fa-star"></label>
                                                    <input value="4" type="radio" name="rating1" id="rating4" onChange={(e)=>setRating(e.target.value)} required={true}/>
                                                    <label for="rating4" class="fa fa-star"></label>
                                                    <input value="5" type="radio" name="rating1" id="rating5" onChange={(e)=>setRating(e.target.value)} required={true}/>
                                                    <label for="rating5" class="fa fa-star"></label>
                                                </div>
                                            </div>
                                            <div>
                                                
                                            </div>
                                            <div className='card'><textarea required={true} disabled={disabled} className="basic-slide" id="content" type="textarea" placeholder="B??nh lu???n ??? ????y" onChange={(e)=> setCommentContent(e.target.value)}>
                                            </textarea></div>
                                            <button type="submit" className="primary block" disabled={disabled}>????NG</button>
                                            
                                        </form>
                                    </div>
                            ))))
                            ))
                                // <div>{user.drinkIdList}</div>
                            
                        ): (userInfo.role==='user' && <button className="primary block" onClick={changeCommentBoxStatus}>B???T ?????U B??NH LU???N</button>)) : <Link to={`/signin?redirect=drink/${id}`}>????ng nh???p ????? b??nh lu???n</Link>
                    }
                    {userInfo &&
                        (userInfo.role==='admin' &&
                            (<div className="card card-body" style={{maxWidth: '50rem'}}>
                                <input required={true} placeholder='Nh???p tag ??? ????y' required={true} type="text" hidden={tagEditBox} className="tagInput basic-slide" onChange={(e)=>setTagContent(e.target.value)}></input>
                                <button className="admin block" onClick={addTag} hidden={tagEditBox}>TH??M</button>
                                <button className="admin block" onClick={enableTagEditBox}>
                                    {tagEditBox ? <label>TH??M TAG</label> : <label>????NG</label>}
                                </button>
                            </div>))
                    }
                    {userInfo && (userInfo.role==='admin' ? 
                                (<div className="row">
                                    <label className="bold-text">Tags:</label> {drink.tags.map(tag=>(
                                <div className="card"><div>{tag}<button style={{width: '50px', height: '50px', textAlign: 'center'}} onClick={removeTag} className="admin">x</button></div></div>
                                    ))}
                                </div>) : (
                                    <div>
                                        <label className="bold-text">Tags:</label>  {drink.tags.map(tag=>(
                                                    <label>{tag}, </label>
                                                ))}
                                    </div>
                                ))}
                    {!userInfo &&  (<div>
                        <label className="bold-text">Tags:</label>  {drink.tags.map(tag=>(
                                        <label>{tag}, </label>
                                    ))}
                        </div>)
                    
                    }
                        {
                            star==="" && time==="" && comments &&(
                            loadingCommentList ? (<LoadingBox></LoadingBox>) : errorCommentList ? (<MessageBox variant="error">{errorCommentList}</MessageBox>) : 
                            (
                                
                                <div>
                                    {comments.length>1 ? <p> <i className="fa fa-comment"></i>{comments.length} b??nh lu???n</p> :
                                    <p> <i className="fa fa-comment"></i>{comments.length} b??nh lu???n</p>}
                                    {
                                        comments.map(comment => (
                                        <div>
                                            {  
                                                loadingUserList ? (<LoadingBox></LoadingBox>) : errorUserList ? (<MessageBox variant="error">{errorUserList}</MessageBox>) : users &&
                                                (users.map(personnel=>
                                                    personnel._id === comment.user  &&
                                                    (
                                                        <div>
                                                            <CommentComponent key={comment._id} comment = {comment} personnel = {personnel}></CommentComponent>
                                                        </div>
                                                    )
                                                ))
                                            }
                                        </div>
                                        
                                    ))}
                                    
                                </div>
                            )
                            )
                        }
                        {
                            star!=="" && (starComment ?(
                            loadingStarFilter ? (<LoadingBox></LoadingBox>) : errorStarFilter ? (<MessageBox variant="error">{errorStarFilter}</MessageBox>) : 
                            (
                                
                                <div>
                                    <p>B??nh lu???n ({starComment.length}):</p>
                                    {
                                        starComment.map(comment => (
                                        <div>
                                            {  
                                                loadingUserList ? (<LoadingBox></LoadingBox>) : errorUserList ? (<MessageBox variant="error">{errorUserList}</MessageBox>) : 
                                                (users.map(personnel=>
                                                    personnel._id === comment.user  &&
                                                    (
                                                        <div>
                                                            <CommentComponent key={comment._id} comment = {comment} personnel = {personnel}></CommentComponent>
                                                        </div>
                                                    )
                                                ))
                                            }
                                        </div>
                                        
                                    ))}
                                    
                                </div>
                            )
                            ) : (
                                <MessageBox variant="error">{errorStarFilter}</MessageBox>
                            ))
                        }
                        {
                            time!=="" && (sortedComments &&(
                            loadingSort ? (<LoadingBox></LoadingBox>) : errorSort ? (<MessageBox variant="error">{errorSort}</MessageBox>) : 
                            (
                                
                                <div>
                                    <p>B??nh lu???n ({sortedComments.length}):</p>
                                    {
                                        sortedComments.map(comment => (
                                        <div>
                                            {  
                                                loadingUserList ? (<LoadingBox></LoadingBox>) : errorUserList ? (<MessageBox variant="error">{errorUserList}</MessageBox>) : 
                                                (users.map(personnel=>
                                                    personnel._id === comment.user  &&
                                                    (
                                                        <div>
                                                            <CommentComponent key={comment._id} comment = {comment} personnel = {personnel}></CommentComponent>
                                                        </div>
                                                    )
                                                ))
                                            }
                                        </div>
                                        
                                    ))}
                                    
                                </div>
                            )
                            ))
                        }
                    
                </div>
            </div>
            </div>
            
            )}

        </div>
    )
}
