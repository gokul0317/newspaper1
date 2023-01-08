const { isNameValid, isObjectId } = require("./common");

const bookmarkValidation = (addNews) => {
    const titleError = isNameValid(addNews?.title, "Title");
    const urlError = isNameValid(addNews?.url, "Url");

    return {
        isInValid: !!titleError || !!urlError,
        messages: {
            title: titleError,
            url: urlError,
        }
    }
}

const isUserError = (user) => {
    let message = "";
    const userError = isNameValid(user, "User");
    const userInvalid = isObjectId(user, "User")
    if (userError) {
        message = userError;
    } else if(userInvalid) {
        message = userInvalid;
    }
    return message;
}

module.exports = {
    bookmarkValidation
}