import validator from "validator";
export const EMAIL_ERRORS = (string) => {
    if (!validator.isEmail(string)) return "Invalid email address";
    else return false;
};
export const EMPTY_ERRORS = (string) => {
    if (validator.isEmpty(string)) {
        return "This field is required";
    } else return false;
} 