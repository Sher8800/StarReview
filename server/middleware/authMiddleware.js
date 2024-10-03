import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        // Get the token from the header
        // const token = req.headers.authorization?.split(' ')[1];
        const token = req.headers.authorization?.startsWith('Bearer ') ?
            req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Token validation
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Check method and user role
        if (req.method === 'DELETE' && !req.user.roles.includes('ADMIN')) {
            return res.status(403).json({ message: 'Access denied. Only admins can delete users.' });
        }

        next()

    } catch (e) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;
