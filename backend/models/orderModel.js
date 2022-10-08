import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {        
        orderItems: [
            {
                slug: {type: String, required: true, unique: true},
                gender: {type: String, required: true},
                category: {type: String, required: true},
                collectionSeason: {type: String, required: true},
                title: {type: String, required: true},
                price: {type: Number, required: true},
                color: {type: String, required: true},
                src: {type: String, required: true, unique: true},
                description: {type: String, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                }
            }
        ],

        shippingAddress: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            phNumber: { type: Number, required: true },
            add1: { type: Number, required: true },
            add2: { type: String, required: true },
            city: { type: String, required: true },
            postal: { type: String, required: true },
            province: { type: String, required: true },
        },

        paymentMethod: { type: String, required: true },

        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },

        itemsPrice: { type: Number, required: true },

        shippingPrice: { type: Number, required: true },

        taxPrice: { type: Number, required: true },

        totalPrice: { type: Number, required: true },

        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

        isPaid:{ type: Boolean, default: false },

        paidAt: { type: Date },

        isShipped: { type: Boolean, default: false},

        isDelivered: { type: Boolean, default: false},

        deliveredAt: { type: Date },

    },

    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;