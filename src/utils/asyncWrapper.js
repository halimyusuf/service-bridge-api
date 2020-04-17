export default (request) => {
    return async function (req, res, next) {
        try {
            await request(req, res);
        } catch (error) {
            next(error);
        }
    };
};
