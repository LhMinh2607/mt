import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Post from '../models/Post.js';


const forumRouter = express.Router();


forumRouter.get('/', expressAsyncHandler(async (req, res)=>{
    const posts = await Post.find({}).sort({createdAt: -1});
    //console.log(posts);
    if(posts.length>0){
        res.send(posts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
    }
}));

forumRouter.get('/sort/filter/:topic', expressAsyncHandler(async (req, res)=>{
    //console.log(req.params.topic);
    if(req.params.topic==="none"){
        const sortedPosts = await Post.find({}).sort({createdAt: 1});
        //console.log(posts);
        if(sortedPosts.length>0){
            res.send(sortedPosts);
        }else{
            res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
        }
    }else if(req.params.topic!=="none"){
        const sortedPosts = await Post.find({topic: req.params.topic}).sort({createdAt: 1});
        //console.log(posts);
        if(sortedPosts.length>0){
            res.send(sortedPosts);
        }else{
            res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
        }
    }
    
}));

forumRouter.get('/filter/:topic/sort/:time', expressAsyncHandler(async (req, res)=>{
    const filteredPosts = await Post.find({topic: req.params.topic}).sort({createdAt: parseInt(req.params.time)});
    //console.log(posts);
    if(filteredPosts.length>0){
        res.send(filteredPosts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
    }
}));

forumRouter.get('/search/:key', expressAsyncHandler(async (req, res)=>{
    var splitStr = req.params.key.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    
    const searchedPosts = await Post.find({$or: [
        {postTitle: {$regex: req.params.key}},
        {postTitle: {$regex: req.params.key.toUpperCase()}},
        {postTitle: {$regex: req.params.key.charAt(0).toUpperCase() + req.params.key.slice(1)}},
        {postTitle: {$regex: splitStr.join(' ')}},
        {postContent: {$regex: req.params.key}},
        {postContent: {$regex: req.params.key.toUpperCase()}},
        {postContent: {$regex: req.params.key.charAt(0).toUpperCase() + req.params.key.slice(1)}},
        {postContent: {$regex: splitStr.join(' ')}},
    ]});
    if(searchedPosts.length>0){
        res.send(searchedPosts);
    }else{
        res.status(404).send({message: "KHÔNG CÓ BÀI ĐĂNG NÀO"});
    }
}));

forumRouter.get('/post/:id', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);
    //console.log(posts);
    if(post){
        res.send(post);
    }else{
        res.status(404).send({message: "404 NOT FOUND"});
    }
}));

forumRouter.post('/create_post', expressAsyncHandler(async (req, res)=>{
    const post = new Post({
        user: req.body.userId,
        postTitle: req.body.title,
        postContent: req.body.content,
        topic: req.body.topic,
    });
    const newPost = await post.save();
    res.send({
        _id: newPost._id,
        user: newPost.userId,
        postTitle: newPost. title,
        postContent: newPost.content,
        topic: newPost.topic,
    });
}));

forumRouter.put('/edit_post', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.body.postId);
    //console.log(post);
    if(post){
        post.postTitle = req.body.title;
        post.postContent = req.body.content;

        //console.log(post);
        const updatedPost =  await post.save();

        res.send({
            _id: updatedPost._id,
            user: updatedPost.userId,
            postTitle: updatedPost. title,
            postContent: updatedPost.content,
            topic: updatedPost.topic,
        });
    }else{
        res.status(404).send({
            message: "404 KHÔNG CÓ BÀI ĐĂNG NÀO"
        });
    }
}));

forumRouter.put('/delete_post/:id', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findByIdAndDelete(req.params.id);
    res.send({
        message: "POST DELETED"
    });
}));

forumRouter.post('/post/:id/reply', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);

    post.postComments.push({
        commenter: req.body.userId,
        content: req.body.replyContent,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const updatedPost = await post.save();
    res.send({
        comments: updatedPost.comments,
    });
}));

forumRouter.put('/post/:id/edit_reply', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);

    post.postComments.update({_id: req.body.commentId}, {$set:
        {
            content: req.body.replyContent,
            updatedAt: new Date(),
        }}
    );

    const updatedPost = await post.save();
    res.send({
        comments: updatedPost.comments,
    });
}));

forumRouter.put('/post/:id/delete_reply', expressAsyncHandler(async (req, res)=>{
    const post = await Post.findById(req.params.id);

    
    if(post){
        post.postComments.splice(post.postComments.indexOf({_id: req.body.commentId}), 1);

        const updatedPost = await post.save();
        res.send({
            comments: updatedPost.comments,
        });
    }else{
        res.status(404).send({message: "NO COMMENT FOUND"});
    }
    
}));

export default forumRouter;