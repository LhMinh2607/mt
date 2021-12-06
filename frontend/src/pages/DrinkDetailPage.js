import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { commitCommenting, filterCommentByStar, listOfComments, sortComment } from '../actions/commentAction';
import { detailsOfDrink, showRelatedDrinkList } from '../actions/drinkAction';
import { listOfUsers } from '../actions/userAction';
import CommentComponent from '../components/CommentComponent';
import DrinkPanel from '../components/DrinkPanel';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/RatingComponent';
import { USER_COMMENT_RESET } from '../constants/commentConst';

export default function DrinkDetailPage(props) {

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



    const [commentContent, setCommentContent] = useState('');
    const [rating, setRating] = useState('');
    const [star, setStar] = useState("");
    const [time, setTime] = useState("");
    const [tagEditBox, showTagEditBox] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const addToCartHandler = () =>{
        navigate(`/shopping_cart/${drink._id}/1`);
    }

    const enableTagEditBox = () => {
        showTagEditBox(!tagEditBox);
    }

    const commentSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(commitCommenting(userInfo._id, id, commentContent, rating));
        dispatch({type: USER_COMMENT_RESET});
        enableTagEditBox(); 
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
        dispatch(listOfUsers());
        dispatch(listOfComments(id));
        dispatch(detailsOfDrink(id));
        dispatch(showRelatedDrinkList(id));
    }, [dispatch, id]);
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
                <p id="top"><Link to="/drink"  className="linkButton">Quay về browse</Link></p>
                <div className="row center">
                    <label className="drink-Title">{drink.name}</label>
                </div>
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
                            <label className="bold-text">Giá:</label> {drink.price} đồng
                        </li>
                        <li>
                            <h1>Mô tả:</h1> <p>{drink.description}</p> 
                            {/* <p><Linkify>{drink.description}</Linkify></p> */}
                        </li>
                        <li>
                            <label className="bold-text">Loại:</label> {drink.type}
                        </li>
                        <li>
                        {/* {userInfo &&
                            (userInfo.isAdmin===true &&
                                (<div className="card card-body">
                                    <input type="text" hidden={tagEditBox} className="tagInput" onChange={(e)=>setTagContent(e.target.value)}></input>
                                    <button className="admin block" onClick={addTag} hidden={tagEditBox}>THÊM</button>
                                    <button className="admin block" onClick={enableTagEditBox}>
                                        {tagEditBox ? <label>THÊM TAG</label> : <label>ĐÓNG</label>}
                                    </button>
                                </div>))
                        } */}
                        </li>
                    </ul>
                </div>
                <div className="card card-body">
                    <ul>
                        <li>
                            <div className="row">
                                <div>Giá</div>
                                <div className="price">
                                    {drink.price} đồng
                                </div>
                            </div>
                        </li>
                        <li>
                        {
                            (
                                <button onClick={addToCartHandler} className="primary block">THÊM VÀO GIỎ HÀNG</button>
                            )
                        }
                        </li>
                    </ul>
                    
                </div>
            
                <div className="row center">
                    {
                        loadingRelated ? (<LoadingBox></LoadingBox>) : errorRelated ? (<MessageBox variant="error">{errorRelated}</MessageBox>)
                    :
                    relatedDrinks && (
                            relatedDrinks.length>0 ? (
                                <div>
                                    <MessageBox variant="info">SẢN PHẨM TƯƠNG TỰ</MessageBox>
                                    {relatedDrinks.map(d=>(
                                        <DrinkPanel d = {d}></DrinkPanel>
                                    ))}
                                </div>
                            ) : <MessageBox variant="info">KHÔNG CÓ SẢN PHẨM TƯƠNG TỰ</MessageBox>
                        )
                    }
                </div>
                <div className="col-1">
                    <h1>Bình luận đi</h1>
                    {comments && comments.length>0 && 
                    <div>
                        <select className="filterSelect" onChange={filterCommentByRating} value={star}> 
                            <option value="" hidden>Filter by rating</option>
                            <option value="5">5 stars ⭐⭐⭐⭐⭐</option>
                            <option value="4">4 stars ⭐⭐⭐⭐</option>
                            <option value="3">3 stars ⭐⭐⭐</option>
                            <option value="2">2 stars ⭐⭐</option>
                            <option value="1">1 star ⭐</option>
                            <option value="0">0 star</option>
                            <option value="">All comments</option>
                        </select>
                            <select className="filterSelect" onChange={sortCommentByTime} value={time}>
                                <option value="" hidden>Sort</option>
                                <option value="-1">Latest</option>
                                <option value="1">Oldest</option>
                            </select>
                    </div>
                    }
                    {
                        loadingCommitComment ? (<LoadingBox></LoadingBox>) : errorCommitError ? (<MessageBox variant="error">{errorCommitError}</MessageBox>) : 
                        (
                            success && (
                                <MessageBox variant="info">Đã đăng bình luận</MessageBox>
                            )
                        )
                    }
                    {
                        userInfo && orders ? ( userInfo.role==='user' && (
                            loadingOrder ? (<LoadingBox></LoadingBox>) :
                            errorOrder ? (<MessageBox variant="error">{errorOrder}</MessageBox>) :
                            (orders.map(order=>( order.isPaid &&
                                order.orderItems.map(item=>(
                                    item.drink === id && (
                                    <div>
                                        <label htmlFor="content">
                                            Bình luận với tên {userInfo.name}
                                        </label>
                                        <form onSubmit={commentSubmitHandler} disabled={disabled}>
                                            <select onChange={(e)=>setRating(e.target.value)} required={true}>
                                                <option value="" hidden>rate</option>
                                                <option value="5">💯Excellent (⭐⭐⭐⭐⭐</option>
                                                <option value="4">👌Very good (⭐⭐⭐⭐)</option>
                                                <option value="3">👍Good (⭐⭐⭐)</option>
                                                <option value="2">☹️Bad (⭐⭐)</option>
                                                <option value="1">😖Meh (⭐)</option>
                                                <option value="0">👎 (No star for this)</option>
                                            </select>
                                            <div>
                                                
                                            </div>
                                            <textarea required={true} disabled={disabled} className="comment" id="content" type="textarea" placeholder="Comments are welcomed... to those who bought this product only" onChange={(e)=> setCommentContent(e.target.value)}>
                                            </textarea>
                                            <button type="submit" className="primary block" disabled={disabled}>ĐĂNG</button>
                                        </form>
                                    </div>
                            ))))
                            ))
                                // <div>{user.productIdList}</div>
                            
                        )) : <Link to={`/signin?redirect=drink/${id}`}>Đăng nhập để bình luận</Link>
                    }
                </div>
                <div>
                        {
                            star==="" && time==="" && comments &&(
                            loadingCommentList ? (<LoadingBox></LoadingBox>) : errorCommentList ? (<MessageBox variant="error">{errorCommentList}</MessageBox>) : 
                            (
                                
                                <div>
                                    {comments.length>1 ? <p> <i className="fa fa-comment"></i>{comments.length} bình luận</p> :
                                    <p> <i className="fa fa-comment"></i>{comments.length} bình luận</p>}
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
                                    <p>Bình luận ({starComment.length}):</p>
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
                                <MessageBox variant="error">NO COMMENT WITH THIS RATING</MessageBox>
                            ))
                        }
                        {
                            time!=="" && (sortedComments &&(
                            loadingSort ? (<LoadingBox></LoadingBox>) : errorSort ? (<MessageBox variant="error">{errorSort}</MessageBox>) : 
                            (
                                
                                <div>
                                    <p>Bình luận ({sortedComments.length}):</p>
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
