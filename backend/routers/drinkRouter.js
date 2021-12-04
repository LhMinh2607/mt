import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Drink from '../models/Drink.js'

const drinkRouter = express.Router();

drinkRouter.get('/list', expressAsyncHandler(async (req, res)=>{
    const drinks = await Drink.find({});
    res.send(drinks);
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