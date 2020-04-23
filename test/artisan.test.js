import request from 'supertest';
import server from '../src/server';
import Artisan from '../src/models/artisan';
import Skill from '../src/models/skill';
import getAuthDetails from './helper';
import User from '../src/models/user';

describe('artisan test suites', () => {
    let artisan, skill, payload, id, token;
    beforeAll(async () => {
        await Artisan.deleteMany();
        await User.deleteMany();
    });
    beforeEach(async () => {
        payload = await getAuthDetails(false);
        skill = new Skill({ name: 'Furniture' });
        skill = await skill.save();
        [id, token] = Object.values(payload);
        artisan = new Artisan({
            experience: 'new experience',
            skill: [skill._id],
            user: id,
        });
        artisan = await artisan.save();
    });

    describe('artisan post routes', () => {
        let experience;
        const exec = async () =>
            await request(server)
                .post(`/api/v1/artisan`)
                .set('auth-x-token', token)
                .send({ skill: [skill], experience });
        beforeEach(async () => {
            experience = 'This is a new experience';
        });

        it('should create a new artisan', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    describe('get all artisans', () => {
        const exec = async () =>
            await request(server)
                .get(`/api/v1/artisan`)
                .set('auth-x-token', token);
        it('should return all artisans', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    describe('should patch artisan', () => {
        let experience, patchedSkill;
        const exec = async () =>
            await request(server)
                .patch(`/api/v1/artisan/${id}`)
                .send({ experience, skill: patchedSkill })
                .set('auth-x-token', token);
        beforeAll(async () => {
            let newSkill = new Skill({ name: 'Tailor' });
            newSkill = await newSkill.save();
            experience = 'This is the edited experience';
            patchedSkill = [skill._id, newSkill._id];
        });

        it('should return 404 if skill is not found', async () => {
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should patch skill', async () => {
            id = artisan._id;
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    // artisan delete requests
    describe('artisan delete requests', () => {
        const exec = async () =>
            await request(server)
                .delete(`/api/v1/artisan/${id}`)
                .set('auth-x-token', token);

        it('should return artisan not found(404)', async () => {
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should delete artisan', async () => {
            id = artisan._id;
            const res = await exec();
            console.log(res.body);

            expect(res.status).toBe(200);
        });
    });
});
