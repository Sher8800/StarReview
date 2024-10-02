import { check, validationResult } from 'express-validator';

const validateUser = [
    // Check the name (required, at least 3 characters)
    check('name')
        .trim()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

    // Check the email (must be a valid email format)
    check('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    // Check the password (required, at least 6 characters)
    check('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 6 characters long'),

    // Middleware for handling validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return errors if validation fails
            return res.status(400).json({ errors: errors.array() });
        }
        // Continue execution if there are no errors
        next();
    }
];

export default validateUser;
