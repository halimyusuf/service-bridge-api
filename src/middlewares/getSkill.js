import Skill from '../models/skill';

export default async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (skill === null) {
            return res.status(404).json({ error: 'skill not found' });
        }
        res.skill = skill;
    } catch (error) {
        next(error);
    }
    next();
};
