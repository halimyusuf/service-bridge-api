import request from 'supertest';
import server from '../src/server';
import Skill from '../src/models/skill';
import getAuthDetails from './helper';
// let server;

describe('SKILL TESTS ', () => {
    let token, payload, skill, id;
    beforeAll(async () => {
        await Skill.deleteMany();
        await User.deleteMany();
    });

    beforeAll(async () => {
        payload = await getAuthDetails(true);
        [id, token] = [payload.id, payload.token];
        skill = new Skill({ name: 'Capenter' });
        skill = await skill.save();
    });

    // post requests
    describe('create a new skill', () => {
        let name;
        const exec = async () =>
            await request(server)
                .post(`/api/v1/skill/`)
                .send({ name })
                .set('auth-x-token', token);
        it('should return 201 if its created', async () => {
            name = 'Capentry';
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    // get requests
    describe('get all skills', () => {
        let token, payload;
        const exec = async () =>
            await request(server)
                .get('/api/v1/skill')
                .set('auth-x-token', token);
        beforeAll(async () => {
            payload = await getAuthDetails(true);
            token = payload.token;
        });
        it('should return all skills', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    // patch reuests
    describe('tests for skill patch requests', () => {
        let name;
        const exec = async () =>
            await request(server)
                .patch(`/api/v1/skill/${id}`)
                .send({ name })
                .set('auth-x-token', token);
        beforeEach(() => {
            name = 'Plumber';
        });

        it('should return 404 if skill not found', async () => {
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should patch skill name', async () => {
            id = skill._id;
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(name);
        });
    });
    describe('should delete skill', () => {
        const exec = async () =>
            await request(server)
                .delete(`/api/v1/skill/${id}`)
                .set('auth-x-token', token);
        it('should delete skill ', async () => {
            id = skill._id;
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });
});
