let emailLogin = document.querySelector("#emailLogin");
let passwordLogin = document.querySelector("#passwordLogin");
let loginButton = document.querySelector("#loginButton");
let loginForm = document.querySelectorAll(".loginForm");

let registerLogin = document.querySelector("#registerLogin");
let emailRegister = document.querySelector("#emailRegister");
let passwordRegister = document.querySelector("#passwordRegister");
let cellphoneRegister = document.querySelector("#cellphoneRegister");
let addressRegister = document.querySelector("#addressRegister");
let registerButton = document.querySelector("#registerButton");
let registerForm = document.querySelectorAll(".registerForm");


let pantalla = 0;
let usuarios = []; 

class Logica {
    constructor() {
        this.pantallaLogin = loadImage("/image/PantallaInicioSesion.jpg");
        this.pantallaRegister = loadImage("/image/PantallaRegistro.jpg");
        this.pantallaMenu = loadImage("/image/PantallaMenu.jpg");
        this.pantallaOpciones = loadImage("/image/PantallaSOpcion.jpg");

        this.ocultarTodo(loginForm);
        this.cambiarPantalla(registerLogin, 1);
        this.ocultarTodo(registerForm);
        this.registrar();
    }

    pintar() {
        switch (pantalla) {
            case 0:// Login
                image(this.pantallaLogin, 0, 0);
                this.ocultarTodo(registerForm);
                this.mostrarTodo(loginForm);
                break;
            case 1:// Registro
                image(this.pantallaRegister, 0, 0);
                this.ocultarTodo(loginForm);
                this.mostrarTodo(registerForm);
                break;
            case 2://Menu
            image(this.pantallaMenu,0,0);
            this.ocultarTodo(loginForm);
            this.ocultarTodo(registerForm);
        }
    }

    iniciarSesion() {

    }

    registrar() {
        registerButton.addEventListener("click", function(){ 
            usuarios.push(new Usuario(emailRegister.value,passwordRegister.value,cellphoneRegister.value,addressRegister.value))
            pantalla = 2;
        })
    }

    cambiarPantalla(buttonElement, nuevaPagina) {
        buttonElement.addEventListener("click", function() {
            pantalla = nuevaPagina;
        })
    }

    ocultarElemento(htmlElement) {
        htmlElement.classList.add("hidden");
    }

    mostrarElemento(htmlElement) {
        htmlElement.classList.remove("hidden");
    }

    ocultarTodo(list){
        list.forEach(element => {
            this.ocultarElemento(element);
        });
    }

    mostrarTodo(list){
        list.forEach(element => {
            this.mostrarElemento(element);
        });
    }
}