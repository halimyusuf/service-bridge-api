import Artisan from '../models/artisan';
export default async (req, res, next) => {
    try {
        const artisan = await Artisan.findById(req.params.id);
        if (artisan === null) {
            return res.json({ error: 'Artisan not found' });
        }
        res.artisan = astisan;
    } catch (error) {
        next(error);
    }
    next();
};
