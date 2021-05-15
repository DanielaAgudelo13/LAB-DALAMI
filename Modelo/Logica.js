class Logica {
    constructor() {
        this.pantalla = 0;
        this.pantallaLogin = loadImage("/image/PantallaInicioSesion.jpg");
    }

    pintar() {
        switch (this.pantalla) {
            case 0:
                image(this.pantallaLogin, 0, 0);
                break;

        }
    }

    iniciarSesion() {
        let emailLogin = document.querySelector("#emailLogin");
        let passwordLogin = document.querySelector("#passwordLogin");
        let registerLogin = document.querySelector("#registerLogin");

        registerLogin.addEventListener("click", function () {
            console.log(emailLogin.value);
            console.log(passwordLogin.value);
        })
    }
}