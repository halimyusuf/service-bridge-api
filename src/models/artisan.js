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
        offers: Number,
        location: String,
        completed: Number,
    },
    { timestamps: true }
);

export default mongoose.model('Artisan', artisanSchema);
