// DOM elements ...
const countdownTime = document.getElementById('countdown');

// index signup button location redirect ...
function signup() {
    window.location = '/signup';
}

// index clicked function ...
function clicked(data) {
    const element = document.createElement('input');
    element.value = `http://localhost/${data}`;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
}

// error page button ...
function errorbtn() {
    window.location = '/';
}

// countdown timer ...
// function countdown() {
//     const element = document.createElement('small');
//     element.innerText = 54434;
//     countdownTime.appendChild(element);
// }