import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = Schema(
    {
        message: String,
        rating: Number,
        service: {
            type: Schema.Types.ObjectId,
            ref: 'Service',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
