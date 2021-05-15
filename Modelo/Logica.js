let emailLogin = document.querySelector("#emailLogin");
let passwordLogin = document.querySelector("#passwordLogin");
let registerLogin = document.querySelector("#registerLogin");
let pantalla = 0;

class Logica {
    constructor() {
        this.pantallaLogin = loadImage("/image/PantallaInicioSesion.jpg");
        
        this.pantallaInicio = loadImage("/image/PantallaSOpcion.jpg");
        this.cambiarPantalla(registerLogin, 1);
    }

    pintar() {
        switch (pantalla) {
            case 0:// Login
                image(this.pantallaLogin, 0, 0);
                break;
            case 1:// Registro
                image(this.pantallaInicio, 0, 0);
                this.ocultarElemento(emailLogin);
                this.ocultarElemento(passwordLogin);
                this.ocultarElemento(registerLogin);
                break;

        }
    }

    iniciarSesion() {

    }

    registrar() {

    }

    cambiarPantalla(buttonElement, nuevaPagina) {
        buttonElement.addEventListener("click", function() {
            pantalla = nuevaPagina;
        })
    }

    ocultarElemento(htmlElement) {
        htmlElement.classList.add("hidden");
    }

    mostrarElemento() {
        htmlElement.classList.remove("hidden");
    }
}