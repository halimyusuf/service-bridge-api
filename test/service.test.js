import supertest from 'supertest';
import http from 'http';
import mongoose from 'mongoose';
import app from '../src/server';
import Artisan from '../src/models/artisan';
import Service from '../src/models/service';
import Skill from '../src/models/skill';
import User from '../src/models/user';
import getAuthDetails from './helper';

describe('service tests suites ', () => {
    let artisan, skill, payload, id, token, service, request, server;
    beforeAll(async (done) => {
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
        await Artisan.deleteMany();
        await Service.deleteMany();
        await User.deleteMany();
    });
    afterAll((done) => {
        server.close(done);
        mongoose.disconnect();
    });
    beforeEach(async () => {
        payload = await getAuthDetails(true);
        [id, token] = Object.values(payload);
        skill = new Skill({ name: 'Furniture' });
        skill = await skill.save();
        artisan = new Artisan({
            experience: 'new experience',
            skill: [skill._id],
            user: id,
        });
        artisan = await artisan.save();
        service = new Service({ artisan: artisan._id, customer: id });
        service = await service.save();
    });

    describe('get all services', () => {
        let serviceId = '';
        const exec = async () =>
            await request
                .get(`/api/v1/service/${serviceId}`)
                .set('auth-x-token', token);
        it('should return all services', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return service with specific id', async () => {
            serviceId = service._id;
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return current user services', async () => {
            serviceId = 'myservices';
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    describe('services post routes tests', () => {
        let artisanId;
        const exec = async () =>
            await request
                .post(`/api/v1/service`)
                .set('auth-x-token', token)
                .send({ artisan: artisanId });
        it('should create a new service', async () => {
            artisanId = artisan._id;
            const res = await exec();
            console.log(res.body);
            expect(res.status).toBe(200);
        });
    });

    describe('services patch routes tests', () => {
        let serviceId;
        const exec = async () =>
            await request
                .patch(`/api/v1/service/${serviceId}`)
                .set('auth-x-token', token)
                .send({ status: 'done' });
        it('should patch service', async () => {
            serviceId = service._id;
            const res = await exec();
            console.log(res.body);
            expect(res.status).toBe(200);
        });
    });

    describe('services delete routes tests', () => {
        let serviceId;
        const exec = async () =>
            await request
                .delete(`/api/v1/service/${serviceId}`)
                .set('auth-x-token', token);
        it('should delete service', async () => {
            serviceId = service._id;
            const res = await exec();
            // console.log(res.body);
            expect(res.status).toBe(200);
        });
    });
});
