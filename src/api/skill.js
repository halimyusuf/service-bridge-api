import express from 'express';
import auth from '../middlewares/validateUser';
import adminAuth from '../middlewares/validateAdmin';
import getSkill from '../middlewares/getSkill';
import Skill from '../controllers/skill';
const SkillRouter = express.Router();
const skill = new Skill();

SkillRouter.get('/', auth, skill.getSkills);
// SkillRouter.get('/', auth, adminAuth, skill.getSkills);
// SkillRouter.get('/:id', getSkill, skill.getSkill);
SkillRouter.post('/', auth, skill.createSkill);
SkillRouter.patch('/:id', auth, adminAuth, getSkill, skill.patchSkill);
SkillRouter.delete('/:id', auth, adminAuth, getSkill, skill.deleteSkill);

export default SkillRouter;
