import Artisan from '../models/artisan';
import _ from 'lodash';
import validatorErr from '../utils/validatorErr';
import asyncHandler from '../utils/asyncWrapper';
import normalize from 'normalize-url';

function normalizeUrl(urlObj) {
    for (const [key, value] of Object.entries(urlObj)) {
        if (value && value.length > 0)
            urlObj[key] = normalize(value, { forceHttps: true });
    }
    return urlObj;
}

export default class ArtisanController {
    getArtisans = asyncHandler(async (req, res) => {
        const artisans = await Artisan.find()
            .populate('user', '-password')
            .populate('skill')
            .exec();
        res.json(artisans);
    });

    getArtisan = asyncHandler(async (req, res) => {
        const artisan = await res.artisan.populate('user');
        res.json(artisan);
    });

    createArtisan = asyncHandler(async (req, res) => {
        const err = validatorErr(req, res);
        if (err !== null) return;
        const linkFields = ['facebook', 'whatsapp', 'instagram', 'twitter'];
        let socialLinks = _.pick(req.body, ...linkFields);
        socialLinks = normalizeUrl(socialLinks);
        req.body = _.pick(req.body, 'experience', 'skill', 'location');
        req.body.social = socialLinks;
        req.body.user = req.user.id;
        let newArtisan = new Artisan(req.body);
        newArtisan = await newArtisan.save();
        res.json(newArtisan);
    });

    patchArtisan = asyncHandler(async (req, res) => {
        const err = validatorErr(req, res);
        if (err !== null) return;
        if (req.user.id != res.artisan.user && !req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        if (req.body.experience) {
            res.artisan.experience = req.body.experience;
        }
        if (req.body.skill) {
            res.artisan.skill = req.body.skill;
        }
        const linkFields = ['facebook', 'whatsapp', 'instagram', 'twitter'];
        let socialLinks = _.pick(req.body, ...linkFields);
        socialLinks = normalizeUrl(socialLinks);
        res.artisan.social = socialLinks;
        const updatedArtisan = await res.artisan.save();
        res.json(updatedArtisan);
    });

    deleteArtisan = asyncHandler(async (req, res) => {
        if (req.user.id != res.artisan.user && !req.user.isAdmin) {
            return res.status(400).json({ error: 'Unauthorized request' });
        }
        await res.artisan.remove();
        res.json({ success: 'Artisan deleted successfully' });
    });
}
