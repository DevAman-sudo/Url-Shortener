// DOM elements ...
const countdownTime = document.getElementById('countdown');

// index signup button location redirect ...
function signup() {
    window.location = '/signup';
}

// index clicked function ...
function clicked(data) {
    const element = document.createElement('input');
    element.value = `https://devli.herokuapp.com/${data}`;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
}

// error page button ...
function errorbtn() {
    window.location = '/';
}