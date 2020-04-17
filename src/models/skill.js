import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const skillSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
