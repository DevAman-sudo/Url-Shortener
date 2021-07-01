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

// countdown timer ...
// countdown timer ...
// function countdown() {
//     // copied from stack overflow ...
//     let time = 3600; // This is the time allowed
//     let saved_countdown = localStorage.getItem('saved_countdown');

//     if (saved_countdown == null) {
//         // Set the time we're counting down to using the time allowed
//         var new_countdown = new Date().getTime() + (time + 2) * 1000;

//         time = new_countdown;
//         localStorage.setItem('saved_countdown', new_countdown);
//     } else {
//         time = saved_countdown;
//     }

//     // Update the count down every 1 second
//     let x = setInterval(() => {

//         // Get today's date and time
//         let now = new Date().getTime();

//         // Find the distance between now and the allowed time
//         let distance = time - now;

//         // Time counter
//         let counter = Math.floor((distance % (1000 * 60)) / 1000);

//         // Output the result in an element with id="demo"
//         countdownTime.innerHTML = `${counter} sec`;

//         // If the count down is over, write some text
//         if (counter <= 0) {
//             clearInterval(x);
//             localStorage.removeItem('saved_countdown');
//             countdownTime.innerHTML = "EXPIRED";
//         }
//     }, 1000);
// }
// countdown();