let canvas;
let emailLogin;
let passwordLogin;
let registerLogin;

function setup () {
    canvas = createCanvas (414, 896);
    canvas.parent("micanva");
    emailLogin = document.querySelector("#emailLogin");
    passwordLogin = document.querySelector("#passwordLogin");
    registerLogin = document.querySelector("#registerLogin");
    handleLogin();
}

function draw () {
    background (255);
}

function handleLogin () {
    registerLogin.addEventListener("click", function() {
        console.log(emailLogin.value);
        console.log(passwordLogin.value);
    })
}
