import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Category =
    mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
