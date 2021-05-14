let canvas;
let control;
let emailLogin;
let passwordLogin;
let registerLogin;

function setup () {
    canvas = createCanvas (414, 896);
    canvas.parent("micanva");
    control = new Control ();
    emailLogin = document.querySelector("#emailLogin");
    passwordLogin = document.querySelector("#passwordLogin");
    registerLogin = document.querySelector("#registerLogin");
    handleLogin();
}

function draw () {
    background (255);
    control.pintar();
}

function handleLogin () {
    registerLogin.addEventListener("click", function() {
        console.log(emailLogin.value);
        console.log(passwordLogin.value);
    })

}
