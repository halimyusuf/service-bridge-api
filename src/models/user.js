import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const Schema = mongoose.Schema;
import config from '../config';

const userSchema = Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
        },
        phone: String,
        imgUrl: String,
        password: String,
        artisan: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Artisan',
                unique: true,
            },
        ],
    },
    { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            id: this._id,
            isAdmin: this.isAdmin,
        },
        config.JwtKey,
        { expiresIn: '2 days' }
    );
    return token;
};

export default mongoose.model('User', userSchema);
