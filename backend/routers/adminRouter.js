import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Drink from '../models/Drink.js';
import Order from '../models/Order.js';
import { isAuth, isAdmin } from '../utils.js';


const adminRouter = express.Router(); //adminRouter for secured routes reserve for admin only, restrict users from using these routes on backend

adminRouter.put('/drink/tag/add/:id', expressAsyncHandler(async(req, res)=>{
    const drink = await Drink.findById(req.params.id);
    if(drink){
        //console.log(user);
        drink.tags.push(req.body.tagContent);
        
        await drink.save();
        res.send({message: "Đã thêm tag"});
    }else{
        res.status(404).send("404");
    }
}));

adminRouter.put('/drink/tag/remove/:id', expressAsyncHandler(async(req, res)=>{
    const drink = await Drink.findById(req.params.id);
    if(drink){
        //console.log(user);
        drink.tags.splice(drink.tags.indexOf(req.body.tagContent), 1);
        
        await drink.save();
        res.send({message: "Đã thêm tag"});
    }else{
        res.status(404).send("404");
    }
}));

adminRouter.get('/order/list/all', expressAsyncHandler(async(req, res)=>{
    const allOrders = await Order.find({});
    res.send(allOrders);
}));

adminRouter.get('/order/list/filter/:year/:month/:day', expressAsyncHandler(async(req, res)=>{
    if(req.params.month==="null" && req.params.day==="null"){
        const start = new Date(`${req.params.year}-01-01 23:00:00`);
        const end = new Date(`${parseInt(req.params.year)+1}-01-01 23:00:00`);
        const orders = await Order.find({createdAt: {$gte: start, $lt: end}}).sort({createdAt: -1});
        if(orders){
            res.send(orders);
        }else{
            res.status(404).send("Không tìm thấy hóa đơn nào");
        }
    }else if(req.params.month!=="null" && req.params.day==="null"){
        const start = new Date(`${req.params.year}-${parseInt(req.params.month)}-01 23:00:00`); //subtract month by 1 cuz somehow i picked May but it'll show June instead, weird
        var month = 0;
        var year = 0;
        if(req.params.month<12){
            month = parseInt(req.params.month)+1
        }else{
            month = 1;
            year = req.params.year+1;
        }
        const end = new Date(`${year}-${month}-01 23:00:00`);
        //console.log(start);
        //console.log(end);

        const orders = await Order.find({createdAt: {$gte: start, $lt: end}}).sort({createdAt: -1});
        if(orders){
            res.send(orders);
        }else{
            res.status(404).send("Không tìm thấy hóa đơn nào");
        }
    }else if(req.params.month!=="null" && req.params.day!=="null"){
        const start = new Date(`${req.params.year}-${req.params.month}-${req.params.day}`);
        const end = new Date(`${req.params.year}-${req.params.month}-${parseInt(req.params.day)+1}`);
        const orders = await Order.find({createdAt: {$gte: start, $lt: end}}).sort({createdAt: -1});
        if(orders){
            res.send(orders);
        }else{
            res.status(404).send("Không tìm thấy hóa đơn nào");
        }
    }
}));

adminRouter.get('/order/list/date/year', expressAsyncHandler(async(req, res)=>{

    const ordersDateYear = await Order.aggregate([
        { $group : { 
            _id : { year : { $year : "$createdAt" }}, 
        }}
    ]);
    if(ordersDateYear){
        //console.log(ordersDate);
        res.send(ordersDateYear);
    }else{
        res.status(404).send("Không tìm được năm");
    }
}));

adminRouter.get('/order/list/date/month/year/:year', expressAsyncHandler(async(req, res)=>{
    const start = new Date(`${req.params.year}-01-01 23:00:00`);
    const end = new Date(`${req.params.year}-12-31 23:00:00`);

    const ordersDateMonth = await Order.aggregate([
        {$match: {createdAt: {$gte: start, $lt: end}}},
        { $group : { 
            _id : { month : { $month : "$createdAt" }}, 
            // total : { $sum : 1 } 
        }}
    ]);
    if(ordersDateMonth){
        //console.log(ordersDate);
        res.send(ordersDateMonth);
    }else{
        res.status(404).send("Không tìm được tháng");
    }
}));

adminRouter.get('/order/list/date/day/month/:month/year/:year', expressAsyncHandler(async(req, res)=>{
    const start = new Date(`${req.params.year}-${req.params.month}-01 23:00:00`);
    const end = new Date(`${req.params.year}-${req.params.month}-31 23:00:00`);

    const ordersDateDay = await Order.aggregate([
        {$match: {createdAt: {$gte: start, $lt: end}}},
        { $group : { 
            _id : { day : { $dayOfMonth : "$createdAt" }}, 
            // total : { $sum : 1 } 
        }}
    ]).sort({_id: 1});


    if(ordersDateDay){
        //console.log(ordersDate);
        res.send(ordersDateDay);
    }else{
        res.status(404).send("Không tìm được ngày");
    }
}));


export default adminRouter;