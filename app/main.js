let passwordsArr;

const requestCommonPasswords = async function fetchPws() {
    const response = await fetch("http://localhost:3000/passwords");
    const passwords = await response.text()
    passwordsArr = passwords.split('\n');
};

const stringVerification = () => {
    let passwordVal = document.querySelector('input[name="password"]').value;
    (!(/\s/g.test(passwordVal))) ? lengthVerification(passwordVal) : rejectApprove(passwordVal, 'Fails NIST requirements because it contains a space. Please submit a new password.');      
}
const lengthVerification = (passwordVal) => {
    (passwordVal.length >= 8 && passwordVal.length <= 64) ? passwordVerification(passwordVal) : rejectApprove(passwordVal, 'Fails NIST requirements because it is not the correct length. Please submit a new password.');
};

const passwordVerification = (passwordVal) => {
    (!passwordsArr.includes(passwordVal)) ? asciiVerification(passwordVal) : rejectApprove(passwordVal, 'Fails NIST requirements because it is a very common password. Please submit a new password.');
};

const asciiVerification = (password) => {
    (!(!/^[\x00-\x7F]*$/.test(password))) ? rejectApprove(password, 'Passes all NIST requirements and is a valid password.') : rejectApprove(password, ' Fails NIST requirements because it is not valid ASCII. Please submit a new password.');
};

const rejectApprove = (passwordString, validationMsg) => {
    let validationText = document.querySelector('#validation-text');
    validationText.innerHTML = `<span class="validation-password">` + passwordString + `</span>` + " " + validationMsg;
};

requestCommonPasswords();



