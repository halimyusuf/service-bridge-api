import supertest from 'supertest';
import http from 'http';
import mongoose from 'mongoose';
import app from '../src/server';
import Artisan from '../src/models/artisan';
import Skill from '../src/models/skill';
import getAuthDetails from './helper';
import User from '../src/models/user';

describe('artisan test suites', () => {
    let artisan, skill, payload, id, token, server, request;
    beforeAll(async (done) => {
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
        await Artisan.deleteMany();
        await User.deleteMany();
    });
    afterAll((done) => {
        server.close(done);
        mongoose.disconnect();
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
        let experience, facebook, instagram, twitter;
        const exec = async () =>
            await request
                .post(`/api/v1/artisan`)
                .set('auth-x-token', token)
                .send({
                    skill: [skill],
                    experience,
                    facebook,
                    instagram,
                    twitter,
                });
        beforeEach(async () => {
            experience =
                'Quae suscipit vel consequatur soluta cumque officiis repellendus quos odio. Odio et deleniti libero non recusandae consequuntur architecto veniam. Ab neque est laboriosam aut. Delectus omnis doloribus dignissimos deleniti vitae temporibus quia. Beatae impedit repellat. Et fuga incidunt voluptatem cumque quas.This is a new experience';
            facebook = 'facebook.com';
            instagram = 'instagram.com';
            twitter = 'twittwe.com';
        });

        it('should create a new artisan', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    describe('get all artisans', () => {
        const exec = async () =>
            await request.get(`/api/v1/artisan`).set('auth-x-token', token);
        it('should return all artisans', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    describe('should patch artisan', () => {
        let experience, patchedSkill;
        const exec = async () =>
            await request
                .patch(`/api/v1/artisan/${id}`)
                .send({ experience, skill: patchedSkill })
                .set('auth-x-token', token);
        beforeAll(async () => {
            let newSkill = new Skill({ name: 'Tailor' });
            newSkill = await newSkill.save();
            experience =
                'This is the edited experience velit quo quo helveitc somme sothe';
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
            await request
                .delete(`/api/v1/artisan/${id}`)
                .set('auth-x-token', token);
        it('should return artisan not found(404)', async () => {
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should delete artisan', async () => {
            id = artisan._id;
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });
});
