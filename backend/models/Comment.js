import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true, unique: true},
    drink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drink', required: true,
    },
    content: {type: String, required: true, unique: false},
    rating: {type: Number, required: true},
},
    {
        timestamps: true,
    }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
