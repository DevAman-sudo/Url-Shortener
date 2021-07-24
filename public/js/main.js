// DOM elements ...
const countdownTime = document.getElementById('countdown');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('cpassword');
const eyeButton = document.querySelector('.eye1');
const eyeButtonA = document.querySelector('.eye2');

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

// delete button functionality / root page
function deleted() {
	
}

// error page button ...
function errorbtn() {
    window.location = '/';
}

// auth eye button ...
eyeButton.addEventListener('click' , (event) => {
	if (password.type == 'password') {
		password.setAttribute('type' , 'text');
	} else {
		password.setAttribute('type' , 'password');
	}
	eyeButton.classList.toggle('fa-eye-slash');
});
eyeButtonA.addEventListener('click' , (event) => {
	if (confirmPassword.type == 'password') {
		confirmPassword.setAttribute('type' , 'text');
	} else {
		confirmPassword.setAttribute('type' , 'password');
	}
	eyeButtonA.classList.toggle('fa-eye-slash');
});