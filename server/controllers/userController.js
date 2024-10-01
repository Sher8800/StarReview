import User from '../models/User.js';
import Comments from '../models/Comments.js';

class authController {

    // Get all users (available for administrators)
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Internal Server Error: ${e}` })
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            // Deleting a user
            await User.findByIdAndDelete(userId);
            return res.status(200).json({ message: 'User deleted successfully' });

        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    async deleteComment(req, res) {
        try {
            const commentId = req.params.commentId;
            // Deleting a comment
            await Comments.findByIdAndDelete(commentId);
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

export default new authController();
