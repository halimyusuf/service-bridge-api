import UserRouter from './user';
import SkillRouter from './skill';
import ServiceRouter from './service';
import ReviewRouter from './review';
import ArtisanRouter from './artisan';
export default (app) => {
    app.use('/api/v1/auth', UserRouter);
    app.use('/api/v1/skill', SkillRouter);
    app.use('/api/v1/artisan', ArtisanRouter);
    app.use('/api/v1/service', ServiceRouter);
    app.use('/api/v1/review', ReviewRouter);
};
