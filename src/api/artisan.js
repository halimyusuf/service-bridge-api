import express from 'express';
import auth from '../middlewares/validateUser';
import validate from '../middlewares/validators/artisanValidator';
import getArtisan from '../middlewares/getArtisan';
import Artisan from '../controllers/artisan';
const ArtisanRouter = express.Router();
const artisan = new Artisan();

ArtisanRouter.get('/', artisan.getArtisans);
ArtisanRouter.get('/:id', getArtisan, artisan.getArtisan);
ArtisanRouter.post('/', validate(), auth, artisan.createArtisan);
ArtisanRouter.patch('/:id', auth, getArtisan, artisan.patchArtisan);
ArtisanRouter.delete('/:id', auth, getArtisan, artisan.deleteArtisan);

export default ArtisanRouter;
