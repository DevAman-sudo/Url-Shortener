// DOM elements ...
const indexSignup1 = document.getElementById('index_signup1');
const indexSignup2 = document.getElementById('index_signup2');
const errorPageButton = document.getElementById('error_page_btn');

// index signup button location redirect ...
indexSignup1.addEventListener('click', () => {
    window.location = '/signup';
});
indexSignup2.addEventListener('click', () => {
    window.location = '/signup';
});

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
errorPageButton.addEventListener('click' , () => {
    window.location = '/' ;
});