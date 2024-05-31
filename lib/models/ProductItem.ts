import mongoose from 'mongoose';

const productItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    size_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size',
    },
    color_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    status: {
        type: String,
        default: '1',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const ProductItem =
    mongoose.models.ProductItem ||
    mongoose.model('ProductItem', productItemSchema);

export default ProductItem;
