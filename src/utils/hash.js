import bcrypt from 'bcrypt';

export const hash = (password) => {
    return bcrypt.hash(password, 10);
};

export const decrypt = (password, hash) => {
    return bcrypt.compare(password, hash);
};
