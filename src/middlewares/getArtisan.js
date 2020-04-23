import Artisan from '../models/artisan';
export default async (req, res, next) => {
    try {
        const artisan = await Artisan.findById(req.params.id);
        if (artisan === null) {
            return res.status(404).json({ error: 'Artisan not found' });
        }
        res.artisan = artisan;
    } catch (error) {
        next(error);
    }
    next();
};
