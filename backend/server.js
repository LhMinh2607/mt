import express, { application } from 'express'
import mongoose from "mongoose"
import drinkRouter from './routers/drinkRouter.js'
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import commentRouter from './routers/commentRouter.js';

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


app.use('/api/drink', drinkRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/comment', commentRouter);

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


