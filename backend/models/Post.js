import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    postTitle: {type: String, required: true, },
    postContent: {type: String, required: true, },
    topic: {type: String, required: true},
    postComments: [
        {   
            commenter: {type: String}, //userId
            content: {type: String},
            createdAt: {type: Date},
            updatedAt: {type: Date},
        },
    ],
},
    {
        timestamps: true,
    },
);

const Post = mongoose.model('Post', postSchema);

export default Post;