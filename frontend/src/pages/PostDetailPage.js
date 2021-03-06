import React, { useEffect, useState } from 'react';
import Linkify from 'react-linkify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listOfUsers } from '../actions/userAction';
import { createPostComment, deletePost, detailsOfPost, editPost } from '../actions/postAction';
import DateComponent from '../components/DateComponent';
import DeletePostCommentButton from '../components/DeletePostCommentButton';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import TopicIcon from '../components/TopicIcon';
import Editor from "rich-markdown-editor";

export default function PostDetailPage() {

    const params = useParams();
    const postId = params.id;



    const postDetails = useSelector(state=>state.postDetails);
    const {loading, error, post} = postDetails;

    const postEditing = useSelector(state=>state.postEditing);
    const {loading: loadingEditing, error: errorEditing, success: successEditing} = postEditing;

    const [editPostStatus, setEditPostStatus] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setPostContent] = useState('');

    const postDeleting = useSelector(state=>state.postDeleting);
    const {loading: loadingDeleting, error: errorDeleting, success: successDeleting} = postDeleting;

    const postCommentPosting = useSelector(state=>state.postCommentPosting);
    const {loading: loadingCommentPosting, error: errorCommentPosting, success: successPostingComment} = postCommentPosting;

    const postCommentDeleting = useSelector(state=>state.postCommentDeleting);
    const {loading: loadingCommentDeleting, error: errorCommentDeleting, success: successDeletingComment} = postCommentDeleting;

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const userList = useSelector(state=>state.userList);
    const {loading: loadingUL, error: errorUL, users} = userList;

   

    const [replyContent, setReplyContent] = useState([]);
    const [editCommentStatus, setEditCommentStatus] = useState(false);

    const [commentId, setCommentId] = useState('');

    const editPostHandler = () =>{
        setTitle(post.postTitle);
        setPostContent(post.postContent);
        setEditPostStatus(!editPostStatus);
        //dispatch(editPost());
    }

    const postSubmitingHandler = () =>{
        //alert(title+" "+content);
        dispatch(editPost(postId, title, content));
    }

    const deleteHandler = () =>{
        if(window.confirm('ARE YOU SURE? IT CANNOT BE UNDONE'))
        {
            dispatch(deletePost(postId));
        };
    }

    const commentPostingHandler = () =>{
        dispatch(createPostComment(postId, userInfo._id, replyContent));
    }

    const deleteCommentHandler = () =>{
        //dispatch();
        alert(commentId);
        //dispatch(deletePostComment(postId, commentId))
    }

    const commentEditingHandler = () =>{
        //dispatch();
    }


    // const editCommentActivate = () =>{
    //     setEditCommentStatus(!editCommentStatus);
    // }

    // const setTheCommentId = () =>{
    //     setCommentId();
    // }

    const scrollToTopHandler = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }

    

    const dispatch = useDispatch();
    useEffect(()=>{

        window.scrollTo({
            top: 0, 
          });
        //alert(postId);
        //alert(editPost);
        dispatch(listOfUsers());
        dispatch(detailsOfPost(postId));
    }, [dispatch]);

    return (
        
        <div>
            <div className="row center cyan-background"> 
                <div>
                    <Link to="/forum" className="linkButton">Quay v??? trang ch??? di???n ????n</Link>
                </div>
            </div>
            <div className="floatingDiv">
                <button onClick={scrollToTopHandler}><i className="fa fa-arrow-up"></i></button>
            </div>
            {loadingUL ? <LoadingBox></LoadingBox> : errorUL ? <MessageBox variant="error">{errorUL}</MessageBox> : (
            loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : 
            post &&(
            <div>
                <div className="row ">
                    <div className="col-2">
                        {
                            loadingEditing ? <LoadingBox></LoadingBox> : errorEditing ? <MessageBox variant="error">{errorEditing}</MessageBox> : 
                            successEditing && <MessageBox>???? x??a b??i ????ng</MessageBox>
                        }
                        {
                            loadingDeleting ? <LoadingBox></LoadingBox> : errorDeleting ? <MessageBox variant="error">{errorDeleting}</MessageBox> : 
                            successDeleting && <MessageBox>???? x??a b??i ????ng</MessageBox>
                        }
                        <div className="card card-body">
                            <div><TopicIcon topicName = {post.topic}></TopicIcon></div>
                            {users.map(u=>(u._id===post.user && ( u.role==='admin' ? (<h1 className='glitch-div user-name-display' title={u.name}>{u.name}<i className="fa fa-check" title="???: Signature of Superiority/ Bi???u t?????ng c???a s??? th?????ng ?????ng"></i></h1>) : (<h1 className=' user-name-display'><i className="fa fa-user"></i>{u.name}</h1>))))}
                        <div className="row left">
                            {
                            userInfo && (userInfo._id === post.user && (
                                <div><button className="primary" onClick={editPostHandler}>{editPostStatus ? <><i className="fa fa-close"></i>????NG</> : <><i className="fa fa-edit"></i>S???A</>}</button>
                                <button className="primary" onClick={deleteHandler}><i className="fa fa-trash" ></i>X??A</button></div>))
                                
                            }
                            {
                            userInfo && (userInfo._id !== post.user && userInfo.role==='admin' && (
                                <div>
                                    <button className="admin" onClick={deleteHandler}><i className="fa fa-trash" ></i>X??A</button>
                                </div>))
                            }
                        </div>
                        {
                            editPostStatus && (<form className="editPostForm" onSubmit={postSubmitingHandler}>
                                            <div>
                                                <input placeholder="Ti??u ?????" className="basic-slide" required={true} type="text" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                                            </div>
                                            <div>
                                            <Editor
                                                defaultValue={post.postContent}
                                                onChange={(value) => setPostContent(value)}
                                                className='Editor'
                                                placeholder='N???i dung'
                                                required={true}
                                            /> 
                                            </div>
                                            <div><button className="primary">????NG</button></div>
                                        </form>)
                        }
                        {
                            !editPostStatus && (
                                <div className="postContent">
                                    <h1>{post.postTitle}</h1>
                                    <Editor
                                        defaultValue={post.postContent}
                                        className='Editor'
                                        placeholder='N???i dung'
                                        required={true}
                                        readOnly={true}
                                    /> 
                                </div>
                            )
                        }
                        {post.createdAt === post.updatedAt ? <DateComponent passedDate={post.updatedAt}>????ng v??o: </DateComponent>
                        : <div>
                            <DateComponent passedDate={post.createdAt}>????ng v??o: </DateComponent>
                            (???? s???a)
                        </div>}
                            
                        </div>
                    
                        
                    </div>
                    <div className="col-1">
                        {
                            loadingCommentPosting ? <LoadingBox></LoadingBox> : errorCommentPosting ? <MessageBox variant="error"></MessageBox> :
                            successPostingComment && <MessageBox>???? ????NG B??NH LU???N</MessageBox>
                        }
                        {userInfo ? (<form className="editPostForm" onSubmit={commentPostingHandler}>
                            <div className="row center">Ph???n h???i d?????i t??n <label className="bold-text">{userInfo.name}</label></div>
                            <div>
                            <Editor
                                defaultValue=""
                                onChange={(value) => setReplyContent(value)}
                                className='Editor'
                                placeholder='N???i dung'
                                required={true}
                            /> 
                            </div>
                            <div><button className="primary">PH???N H???I</button></div>
                        </form>) : (
                            <MessageBox><Link to={`/signin?redirect=forum/post/${postId}`}>????ng nh???p</Link>????? tham gia tr?? chuy???n</MessageBox>
                        )}
                    </div>     
                </div>
            <div className="row">
                <div className="col-2">
                {
                    loadingCommentDeleting ? <LoadingBox></LoadingBox> : errorCommentDeleting ? <MessageBox variant="error">{errorCommentDeleting}</MessageBox>
                    : successDeletingComment && <MessageBox>???? X??A B??NH LU???N</MessageBox>
                }
                {
                    <div className="card card-body">
                        <h1>
                            
                            {post.postComments.length>1 && <div><i className="fa fa-comment"></i>
                                {post.postComments.length} ph???n h???i
                            </div>}
                        </h1>
                    </div>
                }
                {
                    post.postComments.map(pc=>(
                        <div>
                            
                            {userInfo && userInfo._id===pc.commenter && (
                                <div className="card card-body ">
                                    {!editCommentStatus ? (
                                    <div className="row">
                                        <div className="col-0">
                                            <h1>{userInfo.name}</h1>
                                            <DateComponent passedDate={pc.createdAt}>Ph???n h???i v??o: </DateComponent>
                                        </div>
                                        <div className="col-2">
                                            <div className="postContent">
                                            <Editor
                                                defaultValue={pc.content}
                                                className='Editor'
                                                placeholder='N???i dung'
                                                required={true}
                                                readOnly={true}
                                            /> 
                                            </div>
                                        </div>
                                </div>) : 
                                    (
                                        <form className="editPostForm" onSubmit={commentEditingHandler}>
                                            <div>
                                            <Editor
                                                defaultValue=""
                                                onChange={(value) => setPostContent(value)}
                                                className='Editor'
                                                placeholder='N???i dung'
                                                required={true}
                                            /> 
                                            </div>
                                            <div><button className="primary">PH???N H???I</button></div>
                                        </form>
                                    )}
                                    {/* <button className="primary" onClick={editCommentActivate}>{editCommentStatus ? <>CLOSE</> : <>EDIT</>}</button> */}
                                    <DeletePostCommentButton postId = {postId} pc = {pc}></DeletePostCommentButton>
                                </div>)
                            }
                                
                            {
                                userInfo && userInfo._id !== pc.commenter && (
                                    <div className="card card-body ">
                                        {users.map(u=>(
                                            u._id===pc.commenter && (
                                            <div className="row">
                                                <div className="col-0">
                                                    <h1>{u.name}</h1>
                                                </div>
                                                <div className="col-2">
                                                    <div className="postContent">
                                                    <Editor
                                                        defaultValue={pc.content}
                                                        className='Editor'
                                                        placeholder='N???i dung'
                                                        required={true}
                                                        readOnly={true}
                                                    /> 
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
                                        <DateComponent passedDate={pc.createdAt}>Ph???n h???i v??o: </DateComponent>
                                    </div>
                                )
                            }
                            {
                                !userInfo && (
                                    <div className="card card-body ">
                                        {users.map(u=>(
                                            u._id===pc.commenter && (
                                            <div className="row">
                                                <div className="col-0">
                                                    <h1>{u.name}</h1>
                                                </div>
                                                <div className="col-2">
                                                    <div className="postContent">
                                                    <Editor
                                                        defaultValue={pc.content}
                                                        className='Editor'
                                                        placeholder='N???i dung'
                                                        required={true}
                                                        readOnly={true}
                                                    /> 
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
                                        
                                        
                                        <DateComponent passedDate={pc.createdAt}>Ph???n h???i v??o: </DateComponent>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }</div>
            </div>
            </div>
            
            ))}
            
        </div>
    )
}
