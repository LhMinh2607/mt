import React, { useState } from 'react'
import DateComponent from './DateComponent';
import { useDispatch, useSelector } from 'react-redux';
import { USER_COMMENT_RESET } from '../constants/commentConst';
import { deleteComment, editComment } from '../actions/commentAction';
import Linkify from 'react-linkify';
import Rating from './RatingComponent';

export default function CommentComponent(props){


    //ON HOLD

    
    const {comment, personnel} = props;
    
    // const date = new Date(comment.createdAt);
    // const commentPublishedHour = date.getHours();
    // const commentPublishedMin = date.getMinutes();
    // const commentPublishedDay = date.getDay()+1;
    // const commentPublishedDate = date.getDate();
    // const commentPublishedMonth = date.getMonth()+1;
    // const commentPublishedYear = date.getFullYear();
    const dispatch = useDispatch();
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    
    const [rating, setRating] = useState('');
    const [content, setCommentContent] = useState(comment.content);

    const [editCommentStatus, setEditCommentStatus] = useState(false);
    const editCommentHandler = () =>{
        setEditCommentStatus(!editCommentStatus);
    }

    const commentId = comment._id;

    const commentSubmitHandler =(e) =>{
        e.preventDefault();
        dispatch(editComment(commentId, content, rating));
        dispatch({type: USER_COMMENT_RESET});
        setEditCommentStatus(false);
        window.location.reload();
    }

    const deleteCommentHandler = () =>{
        if(window.confirm('CÓ CHẮC MUỐN XÓA BÌNH LUẬN KHÔNG?'))
        {
            dispatch(deleteComment(commentId));
            window.location.reload();

        };
    }

    return (
        <div>
            <div key={comment._id}>

                <div className="card displayComment">
                    <div className="card-body ">
                        <p className='user-name-display'>{personnel.role==='admin' === false && <font><i className="fa fa-user"></i></font>}{personnel.name}  
                        {/* {personnel.onlineStatus ? 
                        <i className="fas fa-circle online"> </i> : <i className="fas fa-circle offline"></i>} */}
                        
                        {personnel.role==='admin' && <font><i className="fa fa-check">Chủ bình luận</i></font>}
                        </p> 
                        {
                            userInfo ? (userInfo._id !== personnel._id &&( 
                                <div>
                                    <Rating rating={comment.rating} reviewNum = ""></Rating>
                                    <Linkify><p>{comment.content}</p></Linkify>
                                    

                                </div>
                            )) : (
                                <div>
                                    <Rating rating={comment.rating} reviewNum = ""></Rating>
                                    <Linkify><p>{comment.content}</p></Linkify>
                                    

                                </div>
                            )
                        }
                        {userInfo && (userInfo._id === personnel._id &&( 
                            editCommentStatus ? 
                            <textarea value={content} className="basic-slide" type="textarea" onChange={(e)=> setCommentContent(e.target.value)}>
                                                    </textarea>
                            : <Linkify><p>{comment.content}</p></Linkify>))}
                        {userInfo && (userInfo._id === personnel._id &&( 
                        editCommentStatus ? <div class="rating-css">
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
                            : <Rating rating={comment.rating} reviewNum = ""></Rating>))}
                            {userInfo && (userInfo._id === personnel._id &&( 
                                editCommentStatus && <div>
                                    <button type="submit" className="primary block" onClick={commentSubmitHandler}>OK</button>
                                </div>
                            ))}
                        <div className="price">
                            {/* {commentPublishedHour+":"}
                            {
                                commentPublishedMin < 10 ? <>0{commentPublishedMin}</> : commentPublishedMin
                            }
                                
                            {
                                commentPublishedDay === 2 ? <> Mon</> : 
                                commentPublishedDay === 3 ? <> Tue</> :
                                commentPublishedDay === 4 ? <> Wed</> :
                                commentPublishedDay === 5 ? <> Thu</> :
                                commentPublishedDay === 6 ? <> Fri</> :
                                commentPublishedDay === 7 ? <> Sat</> :
                                commentPublishedDay === 8 && <> Sun</>
                            }
                            
                            {", "+commentPublishedDate+"/"+commentPublishedMonth+"/"+commentPublishedYear} */}
                            {comment.createdAt === comment.updatedAt ? 
                                (<div style={{fontSize: '1rem'}}><DateComponent passedDate = {comment.createdAt}></DateComponent></div>) :
                                (<div>
                                    <div style={{fontSize: '1rem'}} className="row left">Ngày đăng: <DateComponent passedDate = {comment.createdAt}></DateComponent></div>
                                    <div style={{fontSize: '1rem'}} className="row left">Ngày sửa: <DateComponent passedDate = {comment.updatedAt}></DateComponent></div>
                                </div>)
                            }
                        </div>
                        {
                            userInfo && (
                                userInfo._id===personnel._id &&(
                                    <div className="row left">
                                        <div><button className="primary" onClick={editCommentHandler}>
                                            {editCommentStatus ?
                                                <label>Hủy</label> :
                                                <label>Edit<i className="fa fa-edit"></i></label> 
                                            }
                                            </button></div>
                                            <div><button className="primary" onClick={deleteCommentHandler}>Xóa <i className="fa fa-trash"></i></button></div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                
            </div>     
        </div>
    );
}