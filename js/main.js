const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const submitBtn = document.querySelector('#submitBtn');
const fields = [name, email, password];
const letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const uppercaseLetters = /[A-Z]/;
let notification = document.querySelector('.notification');
let nameOk = false;
let emailOk = false;
let passwordOk = false;

// Check name
function checkName() {
    if (name.value !== '') {
        nameOk = true;
    }
}

// Check email
function checkEmail() {
    if (email.value !== '') {
        if (letters.test(email.value)) {
            emailOk = true;
        } else {
            notification.style.display = 'block';
            notification.innerHTML = `
            <ul>
                <li>Email must be in form example@email.com</li>
            <ul>
            `;
        }
    }
}

// Check password
function checkPassword() {
    if (password.value !== '') {
        if (password.value.length < 6) {
            notification.style.display = 'block';
            notification.innerHTML = `
            <ul>
                <li>Password must contain at least 6 characters</li>
            <ul>
            `;
        } else if (uppercaseLetters.test(password.value)) {
            passwordOk = true;
        } else {
            notification.style.display = 'block';
            notification.innerHTML = `
            <ul>
                <li>Password must contain at least one uppercase letter</li>
            <ul>
            `;
        }
    }
}

// Show password requirements
password.addEventListener('click', () => {
    notification.style.display = 'block';
    notification.style.backgroundColor = '#1dd1a1';
    notification.innerHTML = `
    <ul>
        <li>At least one upper case letter</li>
        <li>Minimum 6 characters</li>
    <ul>
    `;
});

// Submit
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkEmptyFields();
    checkName();
    checkEmail();
    checkPassword();
    fieldCheck();
});

// Check if all fields are filled
function checkEmptyFields() {
    notification.innerHTML = '';
    let messages = '';
    for (let i = 0; i < 3; i++) {
        if (fields[i].value === '') {
            messages += `
            <li>${fields[i].name} is required</li>
            `;
        }
    }
    notification.innerHTML += `<ul>${messages}</ul>`;
    notification.style.backgroundColor = '#c0392b';
    notification.style.display = 'block';
    return
}

// Check if every field is correctly filled
function fieldCheck() {
    if (nameOk == true && emailOk == true && passwordOk == true) {
        notification.style.display = 'none';
        document.querySelector('#signUpForm').submit();
    }
}