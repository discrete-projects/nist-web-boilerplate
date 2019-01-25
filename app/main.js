class Node {
    constructor(key, left = null, right = null) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
};

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        const node = new Node(key);
        if (this.root === null) {
            this.root = node;
        } else {
            let current = this.root;
            let parent;
            while (true) {
                parent = current;
                if (key < current.key) {
                    current = current.left;
                    if (current === null) {
                        parent.left = node;
                        break;
                    }
                } else {
                    current = current.right;
                    if (current === null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }

    search(key) {
        let cur = this.root;
        while (cur.key !== key ) {
            if (key < cur.key) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }

            if (cur === null) {
                return null
            }
        }
        return cur;
    }
};

const bst = new BinarySearchTree();

const requestCommonPasswords = async function fetchPws() {
    const response = await fetch("http://localhost:3000/passwords");
    const passwords = await response.text();
    passwords.split("\n").forEach((cur) => {
        bst.insert(cur);
    });
};

const lengthVerification = () => {
    let passwordVal = document.querySelector('input[name="password"]').value;
    (passwordVal.length >= 8 && passwordVal.length <= 64) ? passwordVerification(passwordVal) : rejectApprove(passwordVal, 'Fails NIST requirements because it is not the correct length. Please submit a new password.');
};

const passwordVerification = () => {
    let passwordVal = document.querySelector('input[name="password"]').value;
    (!bst.search(passwordVal)) ? asciiVerification(passwordVal) : rejectApprove(passwordVal, 'Fails NIST requirements because it is a very common password. Please submit a new password.');
};

const asciiVerification = password => {
    (!(!/^[\x00-\x7F]*$/.test(password))) ? rejectApprove(password, 'Passes all NIST requirements and is a valid password.') : rejectApprove(password, ' Fails NIST requirements because it is not valid ASCII. Please submit a new password.');
};

const rejectApprove = (passwordString, validationMsg) => {
    let validationText = document.querySelector('#validation-text');
    validationText.innerHTML = `<span class="validation-password">` + passwordString + `</span>` + " " + validationMsg;
};

requestCommonPasswords();



