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
    alert('text copied');
}

// error page button ...
function errorbtn() {
    window.location = '/';
}

// countdown timer ...
function convertSeconds(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min} : ${sec}`;
}

function countdown() {
    let counter = 0;
    let timeleft = 3600;

    countdownTime.innerText = convertSeconds(timeleft - counter);

    function timer() {
        counter++;
        countdownTime.innerText = convertSeconds(timeleft - counter);
    }
    setInterval(timer, 1000);
}
countdown();