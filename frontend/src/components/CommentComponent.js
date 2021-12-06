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
                        <h2>{personnel.isAdmin === false && <font><i className="fa fa-user"></i></font>}{personnel.name}  
                        {/* {personnel.onlineStatus ? 
                        <i className="fas fa-circle online"> </i> : <i className="fas fa-circle offline"></i>} */}
                        
                        {personnel.isAdmin && <font><i className="fa fa-check">Chủ bình luận</i></font>}
                        </h2> 
                        {
                            userInfo ? (userInfo._id !== personnel._id &&( 
                                <div>
                                    <Linkify><p>{comment.content}</p></Linkify>
                                    <Rating rating={comment.rating} reviewNum = ""></Rating>

                                </div>
                            )) : (
                                <div>
                                    <p>{comment.content}</p>
                                    <Rating rating={comment.rating} reviewNum = ""></Rating>

                                </div>
                            )
                        }
                        {userInfo && (userInfo._id === personnel._id &&( 
                            editCommentStatus ? 
                            <textarea value={content} className="editComment" type="textarea" onChange={(e)=> setCommentContent(e.target.value)}>
                                                    </textarea>
                            : <p>{comment.content}</p>))}
                        {userInfo && (userInfo._id === personnel._id &&( 
                        editCommentStatus ? <select onChange={(e)=>setRating(e.target.value)}>
                                            <option value="" hidden>rate</option>
                                            <option value="5">💯Excellent (5 stars)</option>
                                            <option value="4">👌Very good (4 stars)</option>
                                            <option value="3">👍Good (3 stars)</option>
                                            <option value="2">☹️Bad (2 stars)</option>
                                            <option value="1">😖Meh (1 star)</option>
                                            <option value="0">👎 (No star for this)</option> 
                                    </select>
                            : <Rating rating={comment.rating} reviewNum = ""></Rating>))}
                            {userInfo && (userInfo._id === personnel._id &&( 
                                editCommentStatus && <div>
                                    <button type="submit" className="primary block" onClick={commentSubmitHandler}>SUBMIT</button>
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
                                (<DateComponent passedDate = {comment.createdAt}></DateComponent>) :
                                (<div>
                                    <div className="row left">Ngày đăng: <DateComponent passedDate = {comment.createdAt}></DateComponent></div>
                                    <div className="row left">Ngày sửa: <DateComponent passedDate = {comment.updatedAt}></DateComponent></div>
                                </div>)
                            }
                        </div>
                        {
                            userInfo && (
                                userInfo._id===personnel._id &&(
                                    <div className="row">
                                        <button className="primary" onClick={editCommentHandler}>
                                            {editCommentStatus ?
                                                <label>Xong</label> :
                                                <label>Edit<i className="fa fa-edit"></i></label> 
                                            }
                                            </button>
                                        <button className="primary" onClick={deleteCommentHandler}>Xóa <i className="fa fa-trash"></i></button>
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