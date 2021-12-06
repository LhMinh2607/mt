import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utils.js';
import Comment from '../models/Comment.js';


const commentRouter = express.Router();

commentRouter.get('/list/:id/filter/:star/sort/:time', expressAsyncHandler(async(req, res)=>{
    //console.log(`${req.params.id}+${req.params.star}`);
    if(req.params.time==="-1"){
        const comments = await Comment.find({product: req.params.id, rating: parseInt(req.params.star)}).sort({createdAt: -1, updatedAt: -1});
        if(comments.length>0){
            res.send(comments);
        }else{
            res.status(404).send({message: "No Comment"});
        }
    }else if(req.params.time==="1"){
        const comments = await Comment.find({product: req.params.id, rating: parseInt(req.params.star)}).sort({createdAt: 1, updatedAt: 1});
        if(comments.length>0){
            res.send(comments);
        }else{
            res.status(404).send({message: "No Comment"});
        }
    }
}));

commentRouter.get('/list/:id/sort/:time', expressAsyncHandler(async(req, res)=>{
    //console.log(`${req.params.id}+${req.params.star}`);
    if(req.params.time==="-1"){
        const comments = await Comment.find({product: req.params.id}).sort({updatedAt: -1});
        if(comments.length>0){
            res.send(comments);
            }else{
                res.status(404).send({message: "No Comment"});
            }
    }else if(req.params.time==="1"){
        const comments = await Comment.find({product: req.params.id}).sort({updatedAt: 1});
        if(comments.length>0){
        res.send(comments);
        }else{
            res.status(404).send({message: "No Comment"});
        }
    }
}));

commentRouter.get('/list/:id', expressAsyncHandler(async(req, res)=>{
    const comments = await Comment.find({product: req.params.id}).sort({updatedAt: -1});
    if(comments){
        res.send(comments);
    }else{
        res.status(404).send({message: "No Comment"});
    }
}));

commentRouter.post('/commit_comment', expressAsyncHandler(async(req, res)=>{
    const postingComment = new Comment({
        user: req.body.user,
        drink: req.body.drink,
        content: req.body.content,
        rating: req.body.rating,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    const newComment = await postingComment.save();
    res.send({
        _id: newComment._id,
        user: newComment.user,
        drink: newComment.drink,
        content: newComment.content,
        rating: newComment.rating,
        
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });
}));

commentRouter.put('/edit', expressAsyncHandler(async(req, res)=>{


    const fcomment = await Comment.findById(req.body.commentId); //i forgot "await" and gone mad, this seriously took me hours, fxxx this shit
    //console.log(`id: ${req.body.commentId}`);
    //console.log(fcomment); 
    if(fcomment){
        fcomment.content = req.body.content;
        //console.log(req.body.content);
        fcomment.rating = req.body.rating;
        //console.log(req.body.rating);

        const updatedComment = await fcomment.save();
        //console.log(comment);
        res.send(
            {
                message: "Comment Updated",
                _id: updatedComment._id,
                user: updatedComment.user,
                drink: updatedComment.drink,
                content: updatedComment.content,
                rating: updatedComment.rating,
            }
        )
    }
}));

commentRouter.put('/delete/:commentId', expressAsyncHandler(async(req, res)=>{


    const comment = await Comment.findByIdAndDelete(req.params.commentId); 
    if(comment){
        res.send(
            {
                message: "Đã xóa bình luận"
            }
        )
    }else{
        res.status(404).send(
            {
                message: "404"
            }
        )
    }
    
}));



export default commentRouter;