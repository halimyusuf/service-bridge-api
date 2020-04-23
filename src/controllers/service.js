import Service from '../models/service';
import asyncHandler from '../utils/asyncWrapper';
import _ from 'lodash';
export default class ServiceController {
    createService = asyncHandler(async (req, res) => {
        req.body = _.pick(req.body, 'artisan');
        req.body.user = req.user.id;
        let newService = new Service(req.body);
        newService = await newService.save();
        res.json(newService);
    });

    getService = asyncHandler(async (req, res) => {
        const service = await res.service.populate();
        res.json(service);
    });

    getMyServices = asyncHandler(async (req, res) => {
        let myServices = await Service.find({
            user: req.user.id,
        });
        res.json(myServices);
    });

    getArtisanServices = asyncHandler(async (req, res) => {
        let myServices = await Service.find({
            artisan: req.user.id,
        });
        res.json(myServices);
    });

    getServices = asyncHandler(async (req, res) => {
        const Services = await Service.find().populate();
        res.json(Services);
    });

    patchService = asyncHandler(async (req, res) => {
        if (req.user.id !== res.service.user._id || req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        if (req.body.status !== null) {
            res.service.status = req.body.status;
        }
        const patchedStatus = await res.service.save();
        res.json(patchedStatus);
    });

    deleteService = asyncHandler(async (req, res) => {
        if (req.user.id !== res.service.user._id || req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        await res.service.remove();
        res.json({ message: 'Service deleted successfully' });
    });
}
