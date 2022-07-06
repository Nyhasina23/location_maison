
const regexpPassword = (password) => {
    if (password.match(/.{8,}/)) {
        if (password.match(/\d/)) {
            if (password.match(/[A-Z]/)) {
                if (password.match(/[a-z]/)) {
                    return true;
                }
            }
        }
    }
    return false;
}
const regexpEmail = (emailText) => {
    if (emailText.match(email)) return true;
    else return false;
}
const regexpPhone = (phoneText) => {
    if (phoneText.match(phone)) return true;
    else return false;
}
const regexpName = (nameText) => {
    if (nameText.match(name)) return true;
    else return false;
}

const email = /^(\w|\d|\.|\_|\-)+@{1}\w{1,20}\.{1}\w{1,10}$/;
const name = /^(([A-Z]|[a-z]|\s){2,128}|(?<=([A-Z]|[a-z]))\s)$/;
const phone = /^(\+){0,1}\d{10,20}$/;

module.exports = { email, name, phone, regexpPassword, regexpEmail, regexpName, regexpPhone };
