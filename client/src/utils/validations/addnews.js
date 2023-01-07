import { isNameValid } from "./common";

export const addNewsValidation = (addNews) => {
    const titleError = isNameValid(addNews?.title, "Title");
    const descriptionError = isNameValid(addNews?.description, "Description");
    const contentError = isNameValid(addNews?.content, "Content");
    return {
        isInValid: !!titleError || !!descriptionError || !!contentError, 
        messages: {
            title: titleError,
            description: descriptionError,
            content: contentError,
        }
    }
}