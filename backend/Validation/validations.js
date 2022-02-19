const joi = require("joi")

//register validation before creating a user
const registerValidation = data => {
    const schema = joi.object({
        UserName: joi.string().min(3).max(30).required(),
        Email: joi.string().required().email(),
        Password: joi.string().required().min(6).max(1024),
    });
    return schema.validate(data)

}

//login validation 
const loginValidation = data => {
    const schema = joi.object({
        Email: joi.string().required().email().min(6).max(255),
        Password: joi.string().required().min(6).max(12)
    });
    return schema.validate(data)
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;