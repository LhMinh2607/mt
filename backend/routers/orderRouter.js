import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import Order from '../models/Order.js';
//import User from '../models/User.js';
import mongoose from 'mongoose';

const orderRouter = express.Router();

orderRouter.get('/list', isAuth, expressAsyncHandler(async(req, res)=>{
    //console.log(req.user._id);
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}));

orderRouter.get('/total/:userId', expressAsyncHandler(async(req, res)=>{
    //const totalPrice = await Order.findById({user: req.params.id}, {totalPrice: 1});
    //console.log(req.params.userId);
    const userSpendings = await Order.aggregate(
        [   
            {$match: {isPaid: true, user: mongoose.Types.ObjectId(req.params.userId)}}, //have to use mongoose.Type.ObjectId here cuz it's not a main _id so mongoose won't automatically convert it to ObjectId("")
            {
                $group: {
                    _id: req.params.userId,
                    totalMoneySpent: {$sum: "$totalPrice"}
                }
            }
        ]
    )
    if(userSpendings.length == 0){
        res.send([{_id: req.params.userId, totalMoneySpent: 0}]);}
    else{
        res.send(userSpendings);
    }
}));

orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res)=>{
    console.log(req.body.orderItems.length);
    if(Number(req.body.orderItems.length) == 0){
        res.status(400).send({message: 'Giỏ hàng trống'});
    }else{
        const order = new Order({
            orderItems: req.body.orderItems,
            paymentMethod: req.body.paymentMethod,
            user: req.user._id,
            shippingInfo: req.body.shippingInfo,
            itemsPrice: req.body.itemsPrice,
            totalPrice: req.body.totalPrice,
            shippingPrice: req.body.shippingPrice,
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'Tạo thành công 1 đơn hàng', order: createdOrder});
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res)=>{
    //console.log(req.params.id);
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: 'Không tìm được đơn hàng này'});
    }
}));



export default orderRouter;