import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
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

const Color =
    mongoose.models.Color || mongoose.model('Color', colorSchema);

export default Color;
