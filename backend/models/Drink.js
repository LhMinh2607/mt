import mongoose from 'mongoose';
const {Schema} = mongoose;

const drinkSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    category: {type: String, required: false},
    image: {type: String},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0},
    reviewNum: {type: Number, default: 0},
    description: {type: String, required: true},
    tags: [{type: String}],
    quantity: {type: Number, required: true, default: 0},
},
    {
        timestamps: true,
    },
);

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;