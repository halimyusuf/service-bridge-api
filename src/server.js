import app from './app';
import config from './config/';
import loaders from './loaders/mongoose.js';

loaders.initializeDb();
const port = process.env.PORT || config.port;
app.listen(config.port, console.log(`app running on port ${port}`));

export default app;
