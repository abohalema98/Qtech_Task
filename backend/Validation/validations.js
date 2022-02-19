const { body, validationResult } = require('express-validator');


const UserValidation = req => {
    body("Email").isEmail(),
        body("Password").isLength({ min: 6 })
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}


module.exports = UserValidation;
