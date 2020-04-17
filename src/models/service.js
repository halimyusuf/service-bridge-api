import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
    {
        artisan: {
            type: Schema.Types.ObjectId,
            ref: 'Artisan',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            default: 'pending approval',
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
