var elUsername = document.getElementById('username');
var elMsg = document.getElementById('feedback');

function checkUsername(minLength){
    if (elUsername.ariaValueMax.length <minLength) {
        elMsg.textContent = 'Username must be ' + minLenght + ' characters or more';
    } else {
        elMsg.innerHTML = '';
    }
}

elUsername.addEventListener('blur', function(){
    checkUsername(5);
}, false);