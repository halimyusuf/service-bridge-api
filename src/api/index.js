import UserRouter from './user';
import SkillRouter from './skill';
import ServiceRouter from './service';
import ReviewRouter from './review';
import ArtisanRouter from './artisan';
export default (app) => {
    app.use('/auth', UserRouter);
    app.use('/skill', SkillRouter);
    app.use('/artisan', ArtisanRouter);
    app.use('/service', ServiceRouter);
    app.use('/review', ReviewRouter);
};
