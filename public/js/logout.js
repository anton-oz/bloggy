const logOutBtn = document.querySelector('#logOut');

const logOut = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    }
    else {
        alert(response.statusText);
    };
};

logOutBtn.addEventListener('click', logOut);