import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Drink from '../models/Drink.js'
import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import mongoose from 'mongoose';

const drinkRouter = express.Router();

drinkRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const drinks = await Drink.find({});
    res.send(drinks);
}));

drinkRouter.get('/feature', expressAsyncHandler(async(req, res)=>{
    const user = await User.findOne({role: 'admin'});
    //console.log(user);
    //console.log(user.drinkIdList);
    const drinkFeatureList = [];
    for(var i=0; i<user.drinkIdList.length; i++)
    {
        drinkFeatureList.push(user.drinkIdList[i]);
    }
    if(drinkFeatureList){
        res.send(drinkFeatureList);
    }else{
        res.status(404).send({message: 'Không có admin'});
    }
}));

drinkRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const drink = await Drink.findById(req.params.id);
    if(drink){
        res.send(drink);
    }else{
        res.status(404).send({message: 'Không tìm thấy sản phẩm'});
    }
}));




drinkRouter.get('/related/:id', expressAsyncHandler(async(req, res)=>{

    const drink = await Drink.findById(req.params.id);
    const relatedDrinks = await Drink.find({tags: {$in: drink.tags}, _id: {$nin: req.params.id}}).sort({rating: 1, reviewNum: 1}).limit(4);
    
    if(relatedDrinks){
        res.send(relatedDrinks);
    }else{
        res.status(404).send({message: 'Không có sản phẩm liên quan'});
    }
}));

drinkRouter.get('/suggested/:id', expressAsyncHandler(async(req, res)=>{

    const order = await Order.find({user: mongoose.Types.ObjectId(req.params.id)});

    const drink = await Drink.findById(order[order.length-1].orderItems[order[order.length-1].orderItems.length-1].drink)

    const suggestedDrinks = await Drink.find({tags: {$in: drink.tags}, _id: {$nin: req.params.id}}).sort({rating: 1, reviewNum: 1}).limit(4);
    
    if(suggestedDrinks){
        res.send(suggestedDrinks);
    }else{
        res.status(404).send({message: 'Không có sản phẩm đề xuất'});
    }
}));





drinkRouter.get('/:id/rating', expressAsyncHandler(async(req, res)=>{
    const comment = await Comment.findOne({drink: mongoose.Types.ObjectId(req.params.id)});
    if(comment)
    {
        const overallRatingAndNumbers = await Comment.aggregate(
            [   
                {$match: {drink: mongoose.Types.ObjectId(req.params.id)}},
                {
                    $group: {
                        _id: "$drink",
                        overallRating: {$avg: "$rating"},
                        totalComments: {$sum: 1 }
                    },
                    
                }
            ]
        );
        //console.log(overallRatingAndNumbers);
        const drink = await Drink.findById(req.params.id);
        drink.rating = overallRatingAndNumbers[0].overallRating;
        drink.reviewNum = overallRatingAndNumbers[0].totalComments;
        
        await drink.save();
        //console.log(drink);
        if(overallRatingAndNumbers){
            res.send(overallRatingAndNumbers);
        }else{
            res.status(404).send({message: 'Không có đánh giá'});
        }
    }else{
        res.send({message: "Đánh giá bằng 0"});
    }
}));


drinkRouter.get('/search/:keyword', expressAsyncHandler(async(req, res)=>{
    var splitStr = req.params.keyword.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    
    const result = await Drink.find({$or: [
        {tags: {$regex: req.params.keyword}}, 
        {name: {$regex: req.params.keyword}},
        {tags: {$regex: req.params.keyword.toLowerCase()}}, 
        {name: {$regex: req.params.keyword.toUpperCase()}},
        {name: {$regex: req.params.keyword.charAt(0).toUpperCase() + req.params.keyword.slice(1)}},
        {name: {$regex: splitStr.join(' ')}},
    ]});

    if(result.length>0){
        res.send(result);
    }else{
        res.status(404).send({message: 'KHÔNG TÌM ĐƯỢC SẢN PHẨM NÀO'});
    }
}));

drinkRouter.get('/filter/star/:star', expressAsyncHandler(async(req, res)=>{
    //console.log(req.params.star);
    const result = await Drink.find({rating: {$lte: parseInt(req.params.star)}}).sort({rating: -1, reviewNum: -1});
    
    if(result.length>0){
        res.send(result);
        //console.log(result);
    }else{
        res.status(404).send({message: 'KHÔNG TÌM ĐƯỢC SẢN PHẨM VỚI ĐÁNH GIÁ NHƯ TRÊN'});
    }
}));

drinkRouter.get('/filter/price/:price', expressAsyncHandler(async(req, res)=>{
    //console.log(req.params.star);
    const result = await Drink.find({price: {$lte: parseInt(req.params.price)}}).sort({price: -1});

    
    if(result.length>0){
        res.send(result);
        //console.log(result);
    }else{
        res.status(404).send({message: 'KHÔNG TÌM ĐƯỢC SẢN PHẨM NÀO KHỚP VỚI GIÁ TIỀN YÊU CẦU'});
    }
}));




export default drinkRouter;