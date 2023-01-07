const isEmailValid = (email) => {
    let message = "";
    const isEmailValid = isNameValid(email, "Email");
    if (isEmailValid.length) {
        message = isEmailValid;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        message = "Email is Invalid";
    }
    return message;
}

const isPassWordValid = (password) => {
    let message = "";
    const isEmailValid = isNameValid(password, "Password");
    if (isEmailValid.length) {
        message = isEmailValid;
    }

    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) === false) {
        message = "Password should be Minimum eight characters, at least one letter and one number (Should not contain special characters)";
    }
    return message;
}

const isNameValid = (name, key) => {
    let message = "";
    if (!name.length) {
        message = `${key} is required`;
    }
    return message;
}


export const registerValidation = (profilevalue) => {
    const emailError = isEmailValid(profilevalue?.email);
    const firstNameError = isNameValid(profilevalue?.firstName, "First Name");
    const lastNameError = isNameValid(profilevalue?.lastName, "Last Name");
    const passwordError = isPassWordValid(profilevalue?.password);
    return {
        isInValid: !!emailError || !!firstNameError || !!lastNameError || !!passwordError,
        messages: {
            email: emailError,
            firstName: firstNameError,
            lastName: lastNameError,
            password: passwordError
        }
    };
}