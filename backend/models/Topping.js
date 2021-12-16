import mongoose from 'mongoose';
const {Schema} = mongoose;

const toppingSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    category: {type: String, required: false},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true, default: 0},
},
    {
        timestamps: true,
    },
);

const Topping = mongoose.model('Topping', toppingSchema);

export default Topping;