import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const artisanSchema = new Schema(
    {
        skill: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Skill',
            },
        ],

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        experience: String,
        offers: {
            type: Number,
            default: 0,
        },
        location: String,
        done: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Artisan', artisanSchema);
