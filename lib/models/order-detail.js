import mongoose, { Schema, model, models } from 'mongoose';

const OrderDetailSchema = new Schema(
    {
        product_item_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductItem',
            required: true,
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
    },
    { timestamps: true }
);

const OrderDetail =
    models?.OrderDetail || model('OrderDetail', OrderDetailSchema);
export default OrderDetail;
