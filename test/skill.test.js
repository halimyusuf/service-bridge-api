import supertest from 'supertest';
import http from 'http';
import mongoose from 'mongoose';
import app from '../src/server';
import Skill from '../src/models/skill';
import User from '../src/models/user';
import getAuthDetails from './helper';
// let server;

describe('SKILL TESTS ', () => {
    let token, payload, skill, id, request, server;
    beforeAll(async (done) => {
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
        await Skill.deleteMany();
        await User.deleteMany();
    });

    beforeEach(async () => {
        payload = await getAuthDetails(true);
        [id, token] = [payload.id, payload.token];
        skill = new Skill({ name: 'Capenter' });
        skill = await skill.save();
    });

    afterAll((done) => {
        server.close(done);
        mongoose.disconnect();
    });

    // post requests
    describe('create a new skill', () => {
        let name;
        const exec = async () =>
            await request
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
            await request.get('/api/v1/skill').set('auth-x-token', token);
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
            await request
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
            await request
                .delete(`/api/v1/skill/${id}`)
                .set('auth-x-token', token);
        it('should delete skill ', async () => {
            id = skill._id;
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });
});
