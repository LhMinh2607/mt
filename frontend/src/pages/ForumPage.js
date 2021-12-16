import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOfUsers } from '../actions/userAction';
import { createPost, listOfFilteredPosts, listOfPosts, listOfSearchedPosts, listOfSortedPosts } from '../actions/postAction';
import DateComponent from '../components/DateComponent';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import TopicIcon from '../components/TopicIcon';

export default function ForumPage() {

    const userSignin  = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [topic, setTopic] = useState('');
    const [keyword, setKeyword] = useState('');
    //const [isPublic, setIsPublic] = useState('');

    const topicArray = [{en: 'Support', vi: 'Hỗ trợ'}, {en: 'General', vi: 'Chung'}, {en: 'OffTopic', vi: 'Lạc đề'}, {en: 'News', vi: 'Tin tức'}];




    const dispatch = useDispatch();
    const postCreating = useSelector(state=>state.postCreating);
    const {loading, error, success} = postCreating;

    const postList = useSelector(state=>state.postList);
    const {loading: loadingPost, error: errorPost, posts} = postList;

    
    const userList = useSelector((state) => state.userList);
    const {loading: loadingUser, error: errorUser, users} = userList;
    
    const [sorting, setSorting] = useState('-1');

    const postSorting = useSelector(state=>state.postSorting);
    const {loading: loadingSort, error: errorSort, sortedPosts} = postSorting;

    const [createAPost, setCreateAPost] = useState(false);
    const [filter, setFilter] = useState('');

    const postFiltering = useSelector(state=>state.postFiltering);
    const {loading: loadingFilter, error: errorFilter, filteredPosts} = postFiltering;

    const postSearching = useSelector(state=>state.postSearching);
    const {loading: loadingSearch, error: errorSearch, searchedPosts} = postSearching;

    const enablePosting = () =>{
        setCreateAPost(!createAPost);
    }

    const setTheKeyword = (e) =>{
        setFilter("");
        setSorting("");
        setKeyword(e.target.value);
       dispatch(listOfSearchedPosts(e.target.value));
      }

    const postHandler = () =>{
        // alert(userInfo._id);
        // alert(postTitle);
        // alert(postContent);
        // alert(topic);
        dispatch(createPost(userInfo._id, postTitle, postContent, topic));
    }

    const scrollToTopHandler = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
    }

    const sortThePosts = (e) =>{
        setSorting(e.target.value);
        if(e.target.value==="1"){
            //alert("1");
            if(filter===""){
                //alert("none");
                dispatch(listOfSortedPosts("none"));
            }
            else if(filter!==""){
                //alert(filter);
                dispatch(listOfSortedPosts(filter));
            }
        }else if(e.target.value==="-1"){
            //alert("-1");
            dispatch(listOfPosts());
        }
    }

    const filterThePosts = (e)=>{
        setFilter(e.target.value);
        setSorting("-1");
        dispatch(listOfFilteredPosts(e.target.value, sorting));
    }

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch(listOfUsers());
        dispatch(listOfPosts());        
    }, [dispatch])

    return (
        <div>
            <div className="floatingDiv">
                <button onClick={scrollToTopHandler}><i className="fa fa-arrow-up"></i></button>
            </div>
            <div className="row center cyan-background">
                <div className="row center search-background"> 
                    <div> 
                        <div className='box'><select onChange={sortThePosts} className="" value={sorting}>
                            <option value="-1">Mới nhất</option>
                            <option value="1">Cũ nhất</option>
                        </select></div>
                    </div>
                    <div> 
                        <div className='box'><select onChange={filterThePosts} className="">
                            <option value="">Tất cả</option>
                            { 
                                topicArray.map(top=>(
                                    <option value={top.vi}>{top.vi}</option>
                                ))
                            }
                        </select></div>
                    </div>
                    <div>
                        <input type="text" id="searchField" className="basic-slide" value={keyword} onChange={setTheKeyword} placeholder="🔍Tìm bài đăng"></input>
                    </div>
                    
                    {userInfo && <div><button className="primary" onClick={enablePosting}>{createAPost ? <>ĐÓNG</> : <>TẠO BÀI ĐĂNG</>}</button></div>}

                </div>
            </div>
            
            {
                loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="error">{error}</MessageBox> : 
                success && <MessageBox>Posted</MessageBox>
            }
            {userInfo ? (createAPost && (
            <form onSubmit={postHandler}>
                <div className="row center">Tạo 1 bài đăng dưới tên ‎<label className="bold-text">{userInfo.name}</label></div>
                <div>
                    <div className='box'><select className="topic" required={true} onChange={(e)=> setTopic(e.target.value)}>
                        <option value="" hidden>Chọn chủ đề</option>
                        {   userInfo.role==='admin' ?
                            topicArray.map(top=>(
                                <option value={top.vi}>{top.vi}</option>
                            )) :
                            topicArray.map(top=>(
                                top.en !== "News" &&
                                <option value={top.vi}>{top.vi}</option>
                            ))
                        }
                    </select></div>
                </div>
                {/* <div className="row center">
                    <div className='box'><select required={true} onChange={(e)=> setIsPublic(e.target.value)}>
                        <option value="true">Public</option>
                        <option value="false">Admin only</option>
                    </select>
                </div> */}
                <div>
                    <input className="postTitle" required={true} placeholder="Tiêu đề" value={postTitle} className="basic-slide" type="text" onChange={(e)=> setPostTitle(e.target.value)}>
                    </input>
                </div><div>
                    <textarea className="postContent" required={true} placeholder="Nội dung" value={postContent} className="basic-slide" type="textarea" onChange={(e)=> setPostContent(e.target.value)}>
                    </textarea>
                </div>
                    <button type="submit" className="primary block">ĐĂNG</button>
            </form>))
            : (<div>
                        <div className="row center">
                            <MessageBox variant="info">ĐĂNG NHẬP ĐỂ THAM GIA TRÒ CHUYỆN</MessageBox> 
                        </div>
                        <div className="row center">
                            <Link to={`/signin?redirect=forum`}>Đăng nhập</Link>
                        </div>
                    
                    </div>)}
            {sorting==="-1" && filter === "" &&(
                loadingPost ? <LoadingBox></LoadingBox> : errorPost ? <MessageBox variant="error">{errorPost}</MessageBox> :
                posts && (
                    posts.map(p=>(
                        <div>
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div className="card card-body postBasic" key={p._id}>
                                        <label className="bold-text">{u.role==='admin' ? (<h3 title={u.name} className='glitch-div'>{u.name}<i className="fa fa-check" title="✓: Signature of Superiority/ Biểu tượng của sự thượng đẳng"></i></h3>) :   u.name}</label>
                                        <div className="row left">
                                            <TopicIcon topicName = {p.topic}></TopicIcon>
                                        </div>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><p>{p.postTitle}</p></Link>
                                        </div>
                                        {p.postComments && <div><i className="fa fa-comment"></i>
                                            {p.postComments.length} phản hồi
                                        </div>}   
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                        
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
            {keyword === "" && sorting==="1" && (
                loadingSort ? <LoadingBox></LoadingBox> : errorSort ? <MessageBox variant="error">{errorSort}</MessageBox> :
                sortedPosts && (
                    sortedPosts.map(p=>(
                        <div>
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div className="card card-body postBasic" key={p._id}>
                                        <label className="bold-text">{u.name}</label>
                                        <div className="row left">
                                            <TopicIcon topicName = {p.topic}></TopicIcon>
                                        </div>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><p>{p.postTitle}</p></Link>
                                        </div>
                                        {/* <div className="link-to-details">
                                            <Link to={`/post/${posts._id}`}>Check it out</Link>
                                        </div> */}
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
            {keyword === "" && sorting==="-1" && filter!=="" && (
                loadingFilter ? <LoadingBox></LoadingBox> : errorFilter ? <MessageBox variant="error">{errorFilter}</MessageBox> :
                filteredPosts && (
                    filteredPosts.map(p=>(
                        <div>
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div className="card card-body postBasic" key={p._id}>
                                        <label className="bold-text">{u.name}</label>
                                        <div className="row left">
                                            <TopicIcon topicName = {p.topic}></TopicIcon>
                                        </div>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><p>{p.postTitle}</p></Link>
                                        </div>
                                        {/* <div className="link-to-details">
                                            <Link to={`/post/${posts._id}`}>Check it out</Link>
                                        </div> */}
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
            {filter==="" && sorting==="" && keyword && (
                loadingSearch ? <LoadingBox></LoadingBox> : errorSearch ? <MessageBox variant="error">{errorSearch}</MessageBox> :
                searchedPosts && (
                    searchedPosts.map(p=>(
                        <div>
                            {
                                loadingUser ? <LoadingBox></LoadingBox> : errorUser ? <MessageBox variant="error">{errorUser}</MessageBox> : 
                                users && (users.map(u=>(
                                    p.user === u._id && 
                                    <Link to={`/forum/post/${p._id}`}><div className="card card-body postBasic" key={p._id}>
                                        <label className="bold-text">{u.name}</label>
                                        <div className="row left">
                                            <TopicIcon topicName = {p.topic}></TopicIcon>
                                        </div>
                                        <div className="row left">
                                            <Link to={`/forum/post/${p._id}`}><p>{p.postTitle}</p></Link>
                                        </div>
                                        {/* <div className="link-to-details">
                                            <Link to={`/post/${posts._id}`}>Check it out</Link>
                                        </div> */}
                                        <div>
                                            <DateComponent passedDate={p.createdAt}>Đăng vào: </DateComponent>
                                        </div>
                                    </div></Link>
                                )))
                            }
                        </div>
                        
                    )
                )))
            }
        </div>
    )
}
