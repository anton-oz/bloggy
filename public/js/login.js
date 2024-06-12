const signUpForm = document.querySelector('#signUp');
const logInForm = document.querySelector('#logIn');

const signUp = async (e) => {
    e.preventDefault();

    const newUsername = document.querySelector('#newUsername').value.trim();
    const newPassword = document.querySelector('#newPassword').value.trim();

    console.log(newUsername, newPassword);

    if (newUsername && newPassword) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ 
                username: newUsername,
                password: newPassword
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('login FAIL')
        }
    }
    else {
        alert('turn this into a modal and fill out both fields');
    };
};

const logIn = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('login FAIL');
        };
    }
    else {
        alert('fill out both fields');
    };
};

signUpForm.addEventListener('submit', signUp);

logInForm.addEventListener('submit', logIn);