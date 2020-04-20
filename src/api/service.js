import express from 'express';
import auth from '../middlewares/validateUser';
import Service from '../controllers/service';
import getService from '../middlewares/getService';
const ServiceRouter = express.Router();
const service = new Service();

ServiceRouter.get('/', service.getServices);
ServiceRouter.get('/myservices', auth, service.getMyServices);
ServiceRouter.get('/:id', getService, service.getService);
ServiceRouter.patch('/:id', auth, getService, service.patchService);
ServiceRouter.post('/', auth, service.createService);
ServiceRouter.delete('/:id', auth, getService, service.deleteService);

export default ServiceRouter;
