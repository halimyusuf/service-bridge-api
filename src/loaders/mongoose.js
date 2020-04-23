import mongoose from 'mongoose';
import config from '../config/index';

export default {
    initializeDb: async () => {
        await mongoose.connect(config.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        const db = mongoose.connection;
        db.on('error', (error) => console.log(error));
        db.once('open', () => console.log('Connected to database'));
    },
};
