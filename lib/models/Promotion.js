import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        count: {
            type: Number,
        },
        percent: {
            type: Number,
        },
        price_promotion: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Promotion =
    mongoose.models.Promotion || mongoose.model('Promotion', promotionSchema);

export default Promotion;
