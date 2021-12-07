import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderItems: [{
            name: {type: String, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            drink: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Drink', required: true,
            },
            quantity: {type: Number, required: true},
        }],
        paymentMethod: {type: String, required: true},
        paymentResult: {
            id: String, 
            status: String, 
            update_time: String,  
            email_address: String, 
        },
        shippingInfo: {
            username: {type: String, required: true},
            fullName: {type: String, required: true},
            shippingAddress: {type: String, required: true},
            email: {type: String, required: true},
            phoneNumber: {type: String, required: true},
            lat: Number,
            lng: Number,
        },
        itemsPrice: {type: Number, required: true},
        totalPrice: {type: Number, required: true},
        shippingPrice: { type: Number, required: true },
        user: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true},
        isPaid: { type: Boolean, default: false },
        paidAt: {type: Date},
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;