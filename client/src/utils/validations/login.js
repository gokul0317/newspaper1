const isNameValid = (name, key) => {
    let message = "";
    if (!name.length) {
        message = `${key} is required`;
    }
    return message;
}

export const loginValidation = (login) => {
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