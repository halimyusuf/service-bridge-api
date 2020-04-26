import app from './app';
import config from './config/';
import loaders from './loaders/mongoose.js';

loaders.initializeDb();
const port = process.env.PORT || config.port;
if (config.NODE_ENV !== 'test') {
    app.listen(config.port, console.log(`app running on port ${port}`));
}

export default app;
