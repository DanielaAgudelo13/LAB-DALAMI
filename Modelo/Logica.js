let emailLogin = document.querySelector("#emailLogin");
let passwordLogin = document.querySelector("#passwordLogin");
//let pantalla = 0;

class Logica {
    constructor() {
        this.pantallaLogin = loadImage("/image/PantallaInicioSesion.jpg");
        this.pantallaInicio = loadImage("/image/PantallaSOpcion.jpg");
        this.pantalla = 0;
        this.nuevaPantalla = 1;
    }

    pintar() {
        switch (this.pantalla) {
            case 0:// Login
                image(this.pantallaLogin, 0, 0);
                break;
            case 1:// Registro
                image(this.pantallaInicio, 0, 0);
                break;

        }
    }

    iniciarSesion() {

    }

    registrar() {
        //registerLogin.addEventListener("click", function () { })
    }

    cambiarPantalla() {
        this.pantalla = this.nuevaPantalla;
    }
}