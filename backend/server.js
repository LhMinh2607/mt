import express from 'express'
import mongoose from "mongoose"
import drinkRouter from './routers/drinkRouter.js'
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import commentRouter from './routers/commentRouter.js';
//import { isAuth, isAdmin } from './utils.js';
import adminRouter from './routers/adminRouter.js';
import forumRouter from './routers/forumRouter.js';

dotenv.config();
const app = express();
app.use(express.json()); //http
app.use(express.urlencoded({extended: true}));

//connect to mongodb database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/milkTea', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },
err => {
    if(err) throw err;
    console.log('connected to MongoDB')
});


app.use('/api/drink', drinkRouter); //manages route with db.drinks
app.use('/api/user', userRouter); //manages route with db.users
app.use('/api/order', orderRouter); //manages route with db.orders
app.use('/api/comment', commentRouter); //manages route with db.comments
app.use('/api/admin', adminRouter); //admin route manage routes with all dbs (only exclusive functions for admin ofc)
app.use('/api/forum', forumRouter);

app.get('/', (req, res) => {
    res.send('Server is ready!');
    
});


app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message});

});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});


