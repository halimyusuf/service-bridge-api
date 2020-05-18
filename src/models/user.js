import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config';
const userSchema = new mongoose.Schema(
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
