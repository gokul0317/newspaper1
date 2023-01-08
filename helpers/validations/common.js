const { isValidObjectId } = require("mongoose");

const isNameValid = (name, key) => {
    let message = "";
    if (!name?.trim().length) {
        message = `${key} is required`;
    }
    return message;
}

const isObjectId = (id, key) => {
    let message = "";
    if (!isValidObjectId(id)) {
        message = `${key} is required`;
    }
    return message;
}

module.exports = {
    isNameValid,
    isObjectId
}