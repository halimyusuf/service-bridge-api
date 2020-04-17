export default (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(400).json({ error: 'Unauthorized request - A' });
    }
};
