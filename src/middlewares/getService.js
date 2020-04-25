import Service from '../models/service';

export default async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id).populate(
            'artisan'
        );
        if (service === null) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.service = service;
    } catch (error) {
        next(error);
    }
    next();
};
