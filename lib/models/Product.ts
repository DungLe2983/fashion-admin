import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        image: [String],
        category_id: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        ],
        product_item_id: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'ProductItem' },
        ],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { toJSON: { getters: true } }
);

const Product =
    mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
