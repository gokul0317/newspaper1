const { isNameValid, isObjectId } = require("./common");

const addNewsValidation = (addNews) => {
    const titleError = isNameValid(addNews?.title, "Title");
    const descriptionError = isNameValid(addNews?.description, "Description");
    const contentError = isNameValid(addNews?.content, "Content");
    const urlError = isNameValid(addNews?.url, "Url");
    const authorError = isNameValid(addNews?.author, "Author");
    const sourceName = isNameValid(addNews?.source?.name, "Source");
    const userError = isUserError(addNews?.user);
    return {
        isInValid: !!titleError || !!descriptionError || !!contentError || !!urlError || !!authorError || !!userError || !!sourceName,
        messages: {
            title: titleError,
            description: descriptionError,
            content: contentError,
            url: urlError,
            author: authorError,
            user: userError,
            source: {
                name: sourceName
            }
        }
    }
}


const isUserError = (user) => {
    let message = "";
    const userError = isNameValid(user, "User");
    const userInvalid = isObjectId(user, "User")
    if (userError) {
        message = userError;
    } else if (userInvalid) {
        message = userInvalid;
    }
    return message;
}


module.exports = {
    addNewsValidation
}