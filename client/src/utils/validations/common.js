export const isNameValid = (name, key) => {
    let message = "";
    if (!name.trim().length) {
        message = `${key} is required`;
    }
    return message;
}