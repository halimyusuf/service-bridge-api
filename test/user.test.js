import app from '../src/server';
import request from 'supertest';
import User from '../src/models/user';

describe('Tests for users endpoints', () => {
    beforeAll(async () => {
        await User.deleteMany();
    });
    afterAll(() => {
        app.close();
    });
    describe('post /user', () => {
        let name, email, phone, password;
        let id = '';
        const exec = async () =>
            await request(app).post(`/api/v1/auth/${id}`).send({
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
            console.log(res.body);

            // expect(res.body.token).toBeTruthy();
        });
        it('login users', async () => {
            id = 'login';
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('tests for invalid login', async () => {
            id = 'login';
            email = 'email@gmami.com';
            const res = await exec();
            expect(res.status).toBe(400);
        });
    });
});
