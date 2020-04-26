import Service from '../models/service';
import Artisan from '../models/service';
import asyncHandler from '../utils/asyncWrapper';
import _ from 'lodash';
export default class ServiceController {
    createService = asyncHandler(async (req, res) => {
        req.body = _.pick(req.body, 'artisan');
        let artisan = await Artisan.findById(req.body.artisan);
        artisan.offers += 1;
        await artisan.save();
        req.body.customer = req.user.id;
        let newService = new Service(req.body);
        newService = await newService.save();
        res.json(newService);
    });

    getService = asyncHandler(async (req, res) => {
        const service = await res.service
            .populate('customer')
            .populate('artisan');
        res.json(service);
    });

    getMyServices = asyncHandler(async (req, res) => {
        let myServices = await Service.find({
            customer: req.user.id,
        })
            .populate('customer')
            .populate('artisan');
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
        if (req.user.id != res.service.customer && req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        if (req.body.status !== null) {
            res.service.status = req.body.status;
            if (res.service.status == 'done') {
                const artisan = await Artisan.findById(res.service.artisan);
                artisan.done += 1;
                await artisan.save();
            }
        }
        const patchedStatus = await res.service.save();
        res.json(patchedStatus);
    });

    deleteService = asyncHandler(async (req, res) => {
        if (req.user.id != res.service.customer && req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        await res.service.remove();
        res.json({ message: 'Service deleted successfully' });
    });
}
