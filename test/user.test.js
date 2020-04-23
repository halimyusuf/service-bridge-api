import request from 'supertest';
import server from '../src/server';
import User from '../src/models/user';
import getAuthDetails from './helper';
// let server;

describe('Tests for users endpoints', () => {
    beforeAll(async () => {
        await User.deleteMany();
    });
    // beforeEach(() => {
    //     server = require('../src/server');
    // });
    // afterEach(async () => {
    //     await server.close();
    //     await User.remove({});
    // });

    // posts requests tests
    describe('post /user', () => {
        let name, email, phone, password;
        let id = '';
        const exec = async () =>
            await request(server).post(`/api/v1/auth/${id}`).send({
                name,
                email,
                phone,
                password,
            });
        beforeEach(() => {
            {
                id = '';
                name = 'testing';
                phone = '07034490454';
                email = 'testing@gmail.com';
                password = 'apss123';
            }
        });
        it('create a new user', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.token).toBeTruthy();
        });
        it('login users', async () => {
            id = 'login';
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('tests for invalid email login', async () => {
            id = 'login';
            email = 'email@gmami.com';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('tests for invalid password login', async () => {
            id = 'login';
            password = 'pass';
            const res = await exec();
            expect(res.status).toBe(400);
        });
    });

    // get users
    describe('user get requests tests', () => {
        let payload, id, token;
        const exec = async () =>
            await request(server)
                .get(`/api/v1/auth/${id}`)
                .set('auth-x-token', token);
        beforeAll(async () => {
            payload = await getAuthDetails(false);
        });
        beforeEach(() => {
            id = '';
            token = payload.token;
        });
        it('should return all users', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return a specific user', async () => {
            id = payload.id;
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return 404 for post with invalid id', async () => {
            id = '5e9e243ac9a91b2af463f0b0';
            const res = await exec();
            expect(res.status).toBe(404);
        });
    });

    // patch requests
    describe('user patch requests', () => {
        let payload, id, token, name, phone;
        const exec = async () =>
            await request(server)
                .patch(`/api/v1/auth/${id}`)
                .send({
                    name,
                    phone,
                })
                .set('auth-x-token', token);
        beforeAll(async () => {
            payload = await getAuthDetails(false);
            token = payload.token;
        });
        beforeEach(() => {
            name = '';
            phone = '';
        });
        it('should patch user details', async () => {
            id = payload.id;
            [name, phone] = ['patched name', '08056772344'];
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(name);
            expect(res.body.phone).toBe(phone);
        });
    });

    // delete requests tests
    describe('user delete requests', () => {
        let id, token;
        const exec = async () =>
            await request(server)
                .delete(`/api/v1/auth/${id}`)
                .set('auth-x-token', token);
        beforeAll(async () => {
            const payload = await getAuthDetails(true);
            [id, token] = [payload.id, payload.token];
        });
        it('should delete a user', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return 404 since user has been deleted once', async () => {
            const res = await exec();
            expect(res.status).toBe(404);
        });
    });
});
