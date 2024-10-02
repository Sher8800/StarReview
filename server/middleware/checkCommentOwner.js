import Comments from '../models/Comments.js';
import jwt from 'jsonwebtoken';

const checkCommentOwner = async (req, res, next) => {
    try {
        const commentId = req.params.id;

        // Get the token from the header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Token validation
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Finding a comment by ID
        const comment = await Comments.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Checking user rights: administrator or comment author
        if (req.user.roles.includes('ADMIN') || comment.author.id.toString() === req.user.id) {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. You can only delete your own comments.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export default checkCommentOwner;
