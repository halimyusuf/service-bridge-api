import supertest from 'supertest';
import http from 'http';
import mongoose from 'mongoose';
import app from '../src/server';
import Service from '../src/models/service';
import Review from '../src/models/review';
import User from '../src/models/user';
import getAuthDetails from './helper';

describe('review test suites ', () => {
    let review, payload, id, token, service, server, request;
    beforeAll(async (done) => {
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
        await Review.deleteMany();
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
        service = new Service({ customer: id });
        service = await service.save();
        review = new Review({ message: 'This is a new review', user: id });
        review = await review.save();
    });

    describe('review post requests routes tests', () => {
        let message, rating;
        const exec = async () =>
            await request
                .post(`/api/v1/review`)
                .set('auth-x-token', token)
                .send({ message, rating });
        beforeEach(() => {
            message = 'Good job';
            rating = '3';
        });
        it('should create a new review', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return 422 if rating is not valid', async () => {
            rating = '6';
            const res = await exec();
            expect(res.status).toBe(422);
        });
        it('should return 422 if message is not valid', async () => {
            message = '';
            const res = await exec();
            expect(res.status).toBe(422);
        });
    });

    describe('review get requests test routes', () => {
        let reviewId;
        const exec = async () =>
            await request
                .get(`/api/v1/review/${reviewId}`)
                .set('auth-x-token', token);
        beforeAll(() => {
            reviewId = '';
        });
        it('should return all review', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return a specific review', async () => {
            reviewId = review._id;
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    describe('review get requests test routes', () => {
        let reviewId, message;
        const exec = async () =>
            await request
                .patch(`/api/v1/review/${reviewId}`)
                .set('auth-x-token', token)
                .send({ message });
        beforeEach(() => {
            message = 'patched Good job';
            reviewId = review._id;
        });
        it('should patch review', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });

    describe('review delete requests test routes', () => {
        let reviewId;
        const exec = async () =>
            await request
                .delete(`/api/v1/review/${reviewId}`)
                .set('auth-x-token', token);
        beforeEach(() => {
            reviewId = review._id;
        });
        it('should patch review', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });
});
