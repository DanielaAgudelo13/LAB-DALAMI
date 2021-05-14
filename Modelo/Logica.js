class Logica {
    constructor () {
        this.pantalla = 0; 
        this.pantallaLogin = loadImage("/image/PantallaInicioSesion.jpg");
    }

    pintar () {
        switch (this.pantalla) {
            
            case 0:
                image(this.pantallaLogin, 0, 0);

                break;

        }
    }
}