import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Drink from '../models/Drink.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
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
        res.send({message: "Đã xóa tag"});
    }else{
        res.status(404).send("404");
    }
}));

adminRouter.get('/order/list/all', expressAsyncHandler(async(req, res)=>{
    const allOrders = await Order.find({});
    res.send(allOrders);
}));

adminRouter.get('/order/total/all', expressAsyncHandler(async(req, res)=>{
    const userSpendingsList = await Order.aggregate(
        [   
            {$match: {isPaid: true}},
            
            {
                $group: {
                    _id: "$user",
                    totalMoneySpent: {$sum: {$cond: [{ $eq: [{ $type: "$totalPrice" }, ""] }, 0, "$totalPrice"]}},
                    
                },
            },
            {$project: {
                totalMoneySpent: {$ifNull: ["$totalMoneySpent", 0]}
            },}
        ]
    )
    if(userSpendingsList.length == 0){
        res.send([{_id: null, totalMoneySpent: 0}]);}
    else{
        res.send(userSpendingsList);
    }
}));

adminRouter.get('/order/list/paid/:boo', expressAsyncHandler(async(req, res)=>{
    if(req.params.boo==='true'){
        const paidOrders = await Order.find({isPaid: true});
        res.send(paidOrders);
    }else{
        const paidOrders = await Order.find({isPaid: false});
        res.send(paidOrders);
    }
}));

adminRouter.get('/order/list/delivered/:boo', expressAsyncHandler(async(req, res)=>{
    if(req.params.boo==='true'){
        const deliveredOrders = await Order.find({isDelivered: true});
        res.send(deliveredOrders);
    }else{
        const deliveredOrders = await Order.find({isDelivered: false});
        res.send(deliveredOrders);
    }
}));

adminRouter.get('/order/list/sort/date/:boo', expressAsyncHandler(async(req, res)=>{
    if(req.params.boo==='date-asc'){
        const sortedOrdersByDate = await Order.find({}).sort({createdAt: 1});
        res.send(sortedOrdersByDate);
    }
    if(req.params.boo==='date-desc'){
        const sortedOrdersByDate = await Order.find({}).sort({createdAt: -1});
        res.send(sortedOrdersByDate);
    }
    
}));

adminRouter.get('/order/list/sort/total/:boo', expressAsyncHandler(async(req, res)=>{
    if(req.params.boo==='total-asc'){
        const sortedOrdersByTotal = await Order.find({}).sort({totalPrice: 1});
        res.send(sortedOrdersByTotal);
    }
    if(req.params.boo==='total-desc'){
        const sortedOrdersByTotal = await Order.find({}).sort({totalPrice: -1});
        res.send(sortedOrdersByTotal);
    }
}));

adminRouter.get('/order/list/total/max', expressAsyncHandler(async(req, res)=>{
    const maxTotalOrders = await Order.find({}).sort({totalPrice: -1}).limit(1);
    res.send(maxTotalOrders);
}));

adminRouter.get('/order/list/drink/most', expressAsyncHandler(async(req, res)=>{
    const mostOrderedDrink = await Order.aggregate([
        {$unwind: '$orderItems.drink'},
        {$project:{
            id: "$drink", count: "$drink"
        }},
        {$group: {
            _id: null, 
            max: { $max: "$count" }
        }}
    ]);
    res.send(mostOrderedDrink);
}));

adminRouter.get('/order/list/drink/least', expressAsyncHandler(async(req, res)=>{
    // const leastOrderedDrink = await Order.find({}).sort({totalPrice: -1}).limit(1);
    // res.send(leastOrderedDrink);
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
        const start = new Date(`${req.params.year}, ${parseInt(req.params.month)}, 1`); //subtract month by 1 cuz somehow i picked May but it'll show June instead, weird
        let month = 0;
        let year = req.params.year;
        if(req.params.month<12){
            month = parseInt(req.params.month)+1;
        }else{
            month = 1;
            year = Number(req.params.year)+1;
            console.log(year);
        }
        const end = new Date(`${year}, ${month}, 1`);
        console.log("start:"+start);
        console.log("end:"+end);

        const orders = await Order.find({createdAt: {$gte: start, $lt: end}}).sort({createdAt: -1});
        if(orders){
            res.send(orders);
        }else{
            res.status(404).send("Không tìm thấy hóa đơn nào");
        }
    }else if(req.params.month!=="null" && req.params.day!=="null"){
        const start = new Date(`${req.params.year}-${req.params.month}-${req.params.day}`);
        const end = new Date(`${req.params.year}-${req.params.month}-${parseInt(req.params.day)+1}`);
        // console.log(start);
        // console.log(end);

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

adminRouter.put('/order/verify/paid/:id', expressAsyncHandler(async(req, res)=>{
    //console.log(req.params.id);

    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = new Date();
        order.save();
        
        res.send({
        message: "Đã xác nhận đã thanh toán"
    })};
}));

adminRouter.put('/order/verify/delivered/:id', expressAsyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelivered = true;
        order.deliveredAt = new Date();
        order.save();
        
        res.send({
        message: "Đã xác nhận đã giao hàng"
    })};
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

adminRouter.get('/user/tag/add/:id', expressAsyncHandler(async(req, res)=>{
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

adminRouter.get('/user/search/:keyword', expressAsyncHandler(async(req, res)=>{
    //const totalPrice = await Order.findById({user: req.params.id}, {totalPrice: 1});
    var splitStr = req.params.keyword.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    
    const userResult = await User.find({$or: [ 
        {name: {$regex: req.params.keyword.toUpperCase()}},
        {name: {$regex: req.params.keyword.charAt(0).toUpperCase() + req.params.keyword.slice(1)}},
        {name: {$regex: splitStr.join(' ')}},
        {email: {$regex: req.params.keyword.toLowerCase()}},
        {email: {$regex: req.params.keyword}},
        {email: {$regex: req.params.keyword.toUpperCase()}},

    ]});
 
    if(userResult.length>0){
        res.send(userResult);
    }else{
        res.status(404).send({message: '404 Không tìm thấy'});
    }
}));

adminRouter.get('/user/spending/most', expressAsyncHandler(async(req, res)=>{
    
    const mostSpendingUser = await Order.aggregate(
        [   
            {$match: {isPaid: true}}, 
            {
                $group: {
                    _id: "$user",
                    totalMoneySpent: {$sum: "$totalPrice"}
                },
            },
            {$sort: {totalMoneySpent: -1}},
            {$limit: 1},
        ]
    );
    if(mostSpendingUser.length>0){
        res.send(mostSpendingUser);
    }else{
        res.status(404).send({message: '404 Không tìm thấy'});
    }
}));

adminRouter.get('/user/list/sort/spending/:boo', expressAsyncHandler(async(req, res)=>{
    
    if(req.params.boo==='spending-asc'){
        const sortedUsersBySpending = await Order.aggregate(
            [   
                {$match: {isPaid: true}}, 
                {
                    $group: {
                        _id: "$user",
                        totalMoneySpent: {$sum: "$totalPrice"}
                    },
                },
                {$sort: {totalMoneySpent: 1}},
            ]
        );
        if(sortedUsersBySpending.length>0){
            res.send(sortedUsersBySpending);
        }else{
            res.status(404).send({message: '404 Không tìm thấy'});
        }
    }
    if(req.params.boo==='spending-desc'){
        const sortedUsersBySpending = await Order.aggregate(
            [   
                {$match: {isPaid: true}}, 
                {
                    $group: {
                        _id: "$user",
                        totalMoneySpent: {$sum: "$totalPrice"}
                    },
                },
                {$sort: {totalMoneySpent: -1}},
            ]
        );
        if(sortedUsersBySpending.length>0){
            res.send(sortedUsersBySpending);
        }else{
            res.status(404).send({message: '404 Không tìm thấy'});
        }
    }
    
    
}));

adminRouter.get('/user/list/sort/order/:boo', expressAsyncHandler(async(req, res)=>{
    
    if(req.params.boo==='order-asc'){
    const sortedUsersByOrder = await Order.aggregate(
        [   
            {$match: {isPaid: true}}, 
            {
                $group: {
                    _id: "$user",
                    orderCount: {$sum: 1} //changed from $count to $sum: 1
                },
            },
            {$sort: {orderCount: 1}},
        ]
    );
        if(sortedUsersByOrder.length>0){
            res.send(sortedUsersByOrder);
        }else{
            res.status(404).send({message: '404 Không tìm thấy'});
        }
    }
    if(req.params.boo==='order-desc'){
        const sortedUsersByOrder = await Order.aggregate(
            [   
                {$match: {isPaid: true}}, 
                {
                    $group: {
                        _id: "$user",
                        orderCount: {$sum: 1}
                    },
                },
                {$sort: {orderCount: -1}},
            ]
        );
            if(sortedUsersByOrder.length>0){
                res.send(sortedUsersByOrder);
            }else{
                res.status(404).send({message: '404 Không tìm thấy'});
            }
        }
}));

adminRouter.get('/user/list/sort/name/:boo', expressAsyncHandler(async(req, res)=>{
    if(req.params.boo==='name-asc'){

        const sortedUsersByName = await User.find().sort({name: 1});
        if(sortedUsersByName.length>0){
            res.send(sortedUsersByName);
        }else{
            res.status(404).send({message: '404 Không tìm thấy'});
        }
    }
    if(req.params.boo==='name-desc'){

        const sortedUsersByName = await User.find().sort({name: -1});
        if(sortedUsersByName.length>0){
            res.send(sortedUsersByName);
        }else{
            res.status(404).send({message: '404 Không tìm thấy'});
        }
    }
}));

adminRouter.get('/user/list/sort/date/:boo', expressAsyncHandler(async(req, res)=>{
    if(req.params.boo==='date-asc'){
        const sortedUsersByDate = await User.find().sort({createdAt: 1});
        if(sortedUsersByDate.length>0){
            res.send(sortedUsersByDate);
        }else{
            res.status(404).send({message: '404 Không tìm thấy'});
        }
    }
    if(req.params.boo==='date-desc'){
        const sortedUsersByDate = await User.find().sort({createdAt: -1});
        if(sortedUsersByDate.length>0){
            res.send(sortedUsersByDate);
        }else{
            res.status(404).send({message: '404 Không tìm thấy'});
        }
    }
}));

adminRouter.post('/drink/add', expressAsyncHandler(async(req, res)=>{
    const drink = new Drink({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
    });
    const newDrink = await drink.save();
    res.send({
        _id: newDrink._id,
        name: newDrink.name,
        category: newDrink.category,
        image: newDrink.image,
        price: newDrink.price,
        description: newDrink.description,
    });
}));

adminRouter.put('/drink/update/:id', expressAsyncHandler(async(req, res)=>{
    const drink = await Drink.findById(req.params.id);
    if(drink){
        drink.name = req.body.name || drink.name;
        drink.category = req.body.category || drink.category;
        drink.image = req.body.image || drink.image;
        drink.price = req.body.price || drink.price;
        drink.description = req.body.description || drink.description;
        drink.quantity = req.body.quantity || drink.quantity;

        const updatedDrink = await drink.save();
        res.send({
            _id: updatedDrink._id,
            name: updatedDrink.name,
            category: updatedDrink.category,
            image: updatedDrink.image,
            price: updatedDrink.price,
            description: updatedDrink.description,
            quantity: updatedDrink.quantity,
            updatedAt: Date.now(),
        });
    }
    
}));

adminRouter.put('/drink/delete/:id', expressAsyncHandler(async(req, res)=>{
    const drink = await Drink.findById(req.params.id);
    if(drink){
        await Drink.findByIdAndDelete(req.params.id);
    }
    res.send({message: "ĐÃ XÓA SẢN PHẨM"});
}));

adminRouter.put('/feature/add_drink/:id', expressAsyncHandler(async(req, res)=>{
    const user = await User.findOne({role: 'admin'});
    if(user){
        user.drinkIdList.push(req.params.id);
        await user.save();
        res.send({message: "ĐÃ THÊM SẢN PHẨM VÀO PHẦN TRƯNG BÀY"});
    }else{
        res.status(404).send("KHÔNG TÌM THẤY QUẢN TRỊ VIÊN");
    }
}));

adminRouter.put('/feature/delete_drink/:id', expressAsyncHandler(async(req, res)=>{
    const user = await User.findOne({role: 'admin'});
    if(user){
        user.drinkIdList.splice(user.drinkIdList.indexOf(req.params.id), 1);
        
        await user.save();
        res.send({message: "ĐÃ GỠ SẢN PHẨM KHỎI PHẦN TRƯNG BÀY"});
    }else{
        res.status(404).send("KHÔNG TÌM THẤY QUẢN TRỊ VIÊN");
    }
}));

adminRouter.put('/feature/delete_drinks/', expressAsyncHandler(async(req, res)=>{
    const user = await User.findOne({role: 'admin'});
    if(user){
        user.drinkIdList = [];
        
        await user.save();
        res.send({message: "ĐÃ GỠ HẾT SẢN PHẨM KHỎI PHẦN TRƯNG BÀY"});
    }else{
        res.status(404).send("KHÔNG TÌM THẤY QUẢN TRỊ VIÊN");
    }
}));

adminRouter.get('/order/permonth/:year', expressAsyncHandler(async(req, res)=>{

    // console.log(new Date(`${req.params.year}, 1, 1`))

    if(req.params.year !== "all"){
        const ordersIncomePerMonthList = await Order.aggregate(
            [   
                {$match: {isPaid: true, 
                createdAt: {$gte: new Date(`${req.params.year}, 1, 1`), $lt: new Date(`${Number(req.params.year)}, 12, 31`)}}},
                
                {
                    $group: {
                        _id: {$month : "$createdAt"}, 
                        totalPrice: {$sum: {$cond: [{ $eq: [{ $type: "$totalPrice" }, ""] }, 0, "$totalPrice"]}},
                    },
                },
                {$project: {
                    monthlyIncome: {$ifNull: ["$totalPrice", 0]}
                },
                }, {$sort: {createdAt: 1}},
                
            ]
        )
        if(ordersIncomePerMonthList.length == 0){
            res.send([{_id: null, ordersIncomePerMonthList: 0}]);}
        else{
            res.send(ordersIncomePerMonthList);
        }
    }else if(req.params.year==='all'){
        const ordersIncomePerMonthList = await Order.aggregate(
            [   
                {$match: {isPaid: true}},
                
                {
                    $group: { //took me a whole ass day (morning to afternoon)
                        _id: {year: {$year: "$createdAt"}, month: {$month : "$createdAt"}}, 
                        totalPrice: {$sum: {$cond: [{ $eq: [{ $type: "$totalPrice" }, ""] }, 0, "$totalPrice"]}},
                        
                    },
                },
                {$sort: {_id: 1}},
                {$project: {
                    monthlyIncome: {$ifNull: ["$totalPrice", 0]},
                    
                },},
                
            ]
        )
        if(ordersIncomePerMonthList.length == 0){
            res.send([{_id: null, ordersIncomePerMonthList: 0}]);}
        else{
            res.send(ordersIncomePerMonthList);
        }
    }

    
}));




export default adminRouter;