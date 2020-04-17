import app from './app';
import config from './config/';
import loaders from './loaders/mongoose.js';

loaders.initializeDb();

app.listen(config.port, console.log(`app running on port ${config.port}`));
