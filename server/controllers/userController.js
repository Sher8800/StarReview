import User from '../models/User.js';

class authController {

    // Get all users (available for administrators)
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
            if (users.length == 0) {
                return res.status(200).json({ message: 'No users' })
            }

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
}

export default new authController();
