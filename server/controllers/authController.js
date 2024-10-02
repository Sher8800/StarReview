import User from '../models/User.js'
import Role from '../models/Role.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateAccessToken = (id, roles) => {
    const payload = { id, roles }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }
    )
}

class authController {
    // User registration
    async registration(req, res) {
        try {
            const { name, email, password } = req.body

            // Check if a user with this email exists
            const userExists = await User.findOne({ email })
            if (userExists) {
                return res.json({ message: 'This user already exists' })
            }

            // Hash the password
            const hashPassword = bcrypt.hashSync(password, 8);

            // Get the user role (default role is USER)
            const userRole = await Role.findOne({ role: 'USER' })

            // Create a new user
            const user = new User({ username: name, email, password: hashPassword, roles: [userRole.role] })

            // Generate a JWT token
            const token = generateAccessToken(user._id, user.roles)

            // Save the user to the database
            await user.save()

            return res.status(201).json({
                username: user.username,
                email: user.email,
                id: user._id,
                token,
                roles: user.roles,
                message: 'User successfully registered'
            })

        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Registration error: ${e}` })
        }
    }

    // User authorization
    async authorization(req, res) {
        try {
            const { email, password } = req.body

            // Search for user by email
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            // Check if the password is correct
            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' })
            }

            // Generate a JWT token
            const token = generateAccessToken(user._id, user.roles)

            return res.status(200).json({
                username: user.username,
                email: user.email,
                id: user._id,
                token,
                roles: user.roles,
                message: 'Авторизация прошла успешно'
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Authorization error: ${e}` })
        }
    }
}

export default new authController()