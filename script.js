const submitLogIn = document.getElementById('submit-log-in');
const signUp = document.getElementById('sign-up');

let accountSaved = []
function loadAccountStorage() {
    accountSaved = JSON.parse(localStorage.getItem("Accounts")) || []

    // accountSaved = accounts;
    console.log(accountSaved)

}

submitLogIn.addEventListener('click', function () {
    let confirm = 0;
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const note = document.querySelector('.log-in-container .correction:last-child');
    const correction = document.querySelectorAll('.correction span');
    document.querySelectorAll('input').forEach(function (all, index) {
        all.style.outline = 'none';
        correction[index].textContent = 'a'
        correction[index].style.opacity = '0'
        note.style.opacity = '0';
    })
    loadAccountStorage();
    console.log(email.value)

    console.log(accountSaved)
    accountSaved.forEach(account => {
        if (account.email === email.value && account.password === password.value) {
            confirm++;
        }
    })
    if (email.value === '' && password.value === '') {
        document.querySelectorAll('input').forEach(function (all, index) {
            all.style.outline = '3px solid red';
            correction[index].textContent = 'Required'
            correction[index].style.opacity = '1'
            note.style.opacity = '1';

        })
    }
    else if (!email.value.endsWith('@gmail.com')) {
        correction[0].textContent = 'Must contain @gmail.com'
        correction[0].style.opacity = '1'
    } else if (password.value.length < 6) {
        correction[1].textContent = 'Must contain atleast 6 caharacters'
        correction[1].style.opacity = '1'
    }
    else if (confirm > 0) {
        email.value = ''
        password.value = ''
        confirm = 0
        document.querySelectorAll('input').forEach(function (all, index) {
            all.style.outline = 'none';
            correction[index].textContent = 'a'
            correction[index].style.opacity = '0'
            note.style.opacity = '0';
        })
        alert("Welcome Sir");
    }
    else {
        note.style.opacity = '1';

        // alert("create an account first")
    }
})

signUp.addEventListener('click', function () {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    loadAccountStorage();
    document.querySelector('.log-in-container').style.display = 'none';
    document.querySelector('.sign-up-container').style.display = 'grid';
    const correction = document.querySelectorAll('.correction span');
    const note = document.querySelector('.sign-up-container .correction:last-child');
    const newEmail = document.getElementById('new-email');
    const newPassword = document.getElementById('new-password');
    const confirmNewPassword = document.getElementById('confirm-new-password');
    const backToLogIn = document.getElementById('back-to-log-in');
    const submitSignUp = document.getElementById('submit-sign-up');

    submitSignUp.addEventListener('click', function () {
        document.querySelectorAll('input').forEach(function (all, index) {
            all.style.outline = 'none';
            correction[index].textContent = 'a'
            correction[index].style.opacity = '0'
            note.style.opacity = '0';

        })
        let confirm = 0;
        accountSaved.forEach(account => {
            if (account.email === newEmail.value && account.password === newPassword.value) {
                confirm++;
            }
        })
        console.log(confirm)

        if (confirm > 0) {
            alert("You already have an account before")
        } else if (newEmail.value === '' && newPassword.value === '') {
            document.querySelectorAll('input').forEach(function (all, index) {
                all.style.outline = '3px solid red';
                correction[index].textContent = 'Required'
                correction[index].style.opacity = '1'
                note.style.opacity = '1';

            })
        } else if (!newEmail.value.endsWith('@gmail.com')) {
            correction[2].textContent = 'Must contain @gmail.com'
            correction[2].style.opacity = '1'
        } else if (newPassword.value.length < 6) {
            correction[3].textContent = 'Must contain atleast 6 caharacters'
            correction[3].style.opacity = '1'
        }
        else if (newPassword.value !== confirmNewPassword.value) {
            correction[4].textContent = 'Not the same passowrd, confirm again'
            correction[4].style.opacity = '1'
        } else {
            if (!newEmail.value.endsWith('@gmail.com')) {
                alert('Must contain @gmail.com')
            } else if (newPassword.value.length < 5) {
                alert('Must contain atleast 6 caharacters')
            } else {
                alert("Welcome Sir");
                const newAccount = { email: newEmail.value, password: newPassword.value };
                document.querySelectorAll('input').forEach(function (all, index) {
                    all.style.outline = 'none';
                    correction[index].textContent = 'a'
                    correction[index].style.opacity = '0'
                    note.style.opacity = '0';
                })
                accountSaved.push(newAccount);
                savedAccountStorage();
                newEmail.value = ''
                newPassword.value = ''
                confirmNewPassword.value = ''
                confirm = 0
            }
        }

    })
    backToLogIn.addEventListener('click', function () {
        document.getElementById('new-email').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-new-password').value = '';
        document.querySelectorAll('input').forEach(function (all, index) {
            all.style.outline = 'none';
            correction[index].textContent = 'a'
            correction[index].style.opacity = '0'
            note.style.opacity = '0';
        })
        document.querySelector('.log-in-container').style.display = 'grid';
        document.querySelector('.sign-up-container').style.display = 'none';
    })
})

function savedAccountStorage() {
    console.log(accountSaved)
    localStorage.setItem("Accounts", JSON.stringify(accountSaved));
}

