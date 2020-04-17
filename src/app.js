import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import routes from './api/index';
// import UserRouter from './api/user';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
routes(app);
app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: 'error',
        message: err.message,
    });
});

export default app;
