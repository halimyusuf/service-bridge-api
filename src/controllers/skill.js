import Skill from '../models/skill';
import asyncHandler from '../utils/asyncWrapper';
import _ from 'lodash';

export default class SkillController {
    createSkill = asyncHandler(async (req, res) => {
        req.body = _.pick(req.body, 'name');
        let skill = await Skill.find({ name: req.body.name });
        if (skill.length !== 0) {
            return res.status(400).json({ error: 'skill exists' });
        }
        let newSkill = new Skill(req.body);
        newSkill = await newSkill.save();
        res.json(newSkill);
    });

    getSkills = asyncHandler(async (req, res) => {
        const skills = await Skill.find();
        res.json(skills);
    });

    // getSkill = asyncHandler(async (req, res) => {
    //     res.json(res.skill);
    // });

    deleteSkill = asyncHandler(async (req, res) => {
        await res.skill.remove();
        res.json({ success: 'Skill deleted' });
    });

    patchSkill = asyncHandler(async (req, res) => {
        if (req.body.name) {
            res.skill.name = req.body.name;
        }
        const skill = await res.skill.save();
        res.json(skill);
    });
}
