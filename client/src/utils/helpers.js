export const delay = ms => new Promise(res => setTimeout(res, ms));

export const parseErrorMessage = (error, defaultMessage = "Failed") => {
    let parseMessage = defaultMessage;
    const errors  = error?.response?.data?.errors;
    const message = error?.response?.data?.message;
    if (errors) {
        parseMessage = "";
        parseMessage += message;
    }

    if (errors && message) {
        parseMessage += `, ${errors}`;
    } else if (!message && errors) {
        parseMessage = "";
        parseMessage += errors;
    }
    return parseMessage;
}