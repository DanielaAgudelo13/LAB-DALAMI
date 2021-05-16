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

let storage = window.localStorage;
let pantalla = 0;
let usuariosGuardados = storage.getItem("listaUsuarios");
let usuarios = [];
if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
}
console.log(usuarios);
let platos = [];

class Logica {
    constructor() {
        this.pantallaLogin = loadImage("/image/PantallaInicioSesion.jpg");
        this.pantallaRegister = loadImage("/image/PantallaRegistro.jpg");
        this.pantallaMenu = loadImage("/image/PantallaMenu.jpg");
        this.pantallaOpciones = loadImage("/image/PantallaSOpcion.jpg");

        this.ocultarTodo(loginForm);
        this.cambiarPantalla(registerLogin, 1);
        this.ocultarTodo(registerForm);
        this.iniciarSesion();
        this.registrar();
        this.cargarPlatos();
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
            platos.forEach(element => {
                element.pintar();
            });
        }
    }

    iniciarSesion() {
        loginButton.addEventListener("click", function(){
            let usuario = usuarios.find(element => {
                return element.email == emailLogin.value;
            })
            console.log(usuario);
            if (usuario) {
                if (usuario.password == passwordLogin.value) {
                    pantalla = 2;
                }else{
                    alert("Contraseña incorrecta");
                }
            }else{
                alert("El usuario no existe")
            }
        })
    }
    

    registrar() {
        registerButton.addEventListener("click", function(){ 
            /*usuarios.push(new Usuario(emailRegister.value,passwordRegister.value,cellphoneRegister.value,addressRegister.value))*/
            let nuevoUsuario = new Usuario(emailRegister.value,passwordRegister.value,cellphoneRegister.value,addressRegister.value);
            usuarios.push(nuevoUsuario);
            storage.setItem("listaUsuarios",JSON.stringify(usuarios));
            pantalla = 2;
        })
    }

    cargarPlatos(){
        platos.push(new Plato(25,350,182.11,112.61,"Delighted\nShake","Strawberry",15000,"1"));
        platos.push(new Plato(215.98,345,182.11,112.61,"Spongy\nShake","Vanilla",20000,"2"));
        platos.push(new Plato(25,499,182.11,113.49,"Monster\nShake","Bubble gum",13000,"3"));
        platos.push(new Plato(215.98,499,182.11,112.61,"Snow\n Shake","Chantilly",18000,"4"));
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