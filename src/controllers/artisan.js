import Artisan from '../models/artisan';
import _ from 'lodash';
import asyncHandler from '../utils/asyncWrapper';
export default class ArtisanController {
    getArtisans = asyncHandler(async (req, res) => {
        const artisans = await Artisan.find().populate();
        res.json(artisans);
    });

    getArtisan = asyncHandler(async (req, res) => {
        res.json(res.artisan);
    });

    createArtisan = asyncHandler(async (req, res) => {
        req.body = _.pick('experience', 'skill');
        req.body.user = req.user.id;
        let newArtisan = new Artisan(req.body);
        newArtisan = await newArtisan.save();
        res.json(newArtisan);
    });

    patchArtisan = asyncHandler(async (req, res) => {
        if (req.user.id !== res.artisan.user._id || req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        if (req.body.experience) {
            res.artisan.experience = req.body.experience;
        }
        const updatedArtisan = res.artisan.save();
        res.json(updatedArtisan);
    });

    deleteArtisan = asyncHandler(async (req, res) => {
        if (req.user.id !== res.artisan.user._id || req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        await res.artisan.remove();
        res.json({ success: 'Artisan deleted successfully' });
    });
}
