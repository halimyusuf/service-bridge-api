import app from '../src/server';
import request from 'supertest';
import User from '../src/models/user';

const defaultUSer = {
    email: 'email@gmail.com',
    password: 'password123',
    name: 'james arthur',
    phone: '09056633902',
};

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

    describe('user get requests tests', () => {
        let user;
        let id;
        let token;
        const exec = async () =>
            await request(app)
                .get(`/api/v1/auth/${id}`)
                .set('auth-x-token', token);
        beforeAll(async () => {
            user = new User(defaultUSer);
            user = await user.save();
            token = user.generateAuthToken();
        });
        beforeEach(() => {
            id = '';
        });
        it('should return all users', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return a specific user', async () => {
            id = user._id;
            const res = await exec();
            expect(res.status).toBe(200);
        });
        it('should return 404 for post with invalid id', async () => {
            id = '5e9e243ac9a91b2af463f0b0';
            const res = await exec();
            expect(res.status).toBe(404);
        });
    });
});
