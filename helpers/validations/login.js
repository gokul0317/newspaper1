const { isNameValid } = require("./common");

const loginValidation = (login) => {
    const emailError = isNameValid(login?.email, "Email");
    const passwordError = isNameValid(login?.password, "Password");
    return {
        isInValid: !!emailError || !!passwordError,
        messages: {
            email: emailError,
            password: passwordError,
        }
    }
}

module.exports = {
    loginValidation
}