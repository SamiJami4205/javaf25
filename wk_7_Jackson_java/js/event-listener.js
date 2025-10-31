function checkUsername() {
    var elMsg = document.getElementById('feedback');
    if (this.value.lenght < 5) {
        elMsg.textContent = 'Username must be 5 characters or more';
    } else {
        elMsg.textContent = '';
    }
}

var elUsername = document.getElementById('username');
elUsername.addEventListener('blur', chackUsername, false);