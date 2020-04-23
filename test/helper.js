import User from '../src/models/user';
const defaultUser = {
    password: 'password123',
    name: 'james arthur',
    phone: '09056633902',
};

export default async (admin) => {
    const randInt = Math.floor(Math.random() * 1000);
    let user = new User({ ...defaultUser, email: `email${randInt}@gmail.com` });
    if (admin) {
        user.isAdmin = true;
    }
    user = await user.save();
    let token = user.generateAuthToken();
    let id = user._id;
    return { id, token };
};
