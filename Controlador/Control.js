class Control {
    constructor () {
        this.logica = new Logica ();
    }

    pintar() {
        this.logica.pintar(); 
    }

    cambiarPantalla() {
        let button = document.querySelector("#registerLogin");
        button.addEventListener("click", this.logica.cambiarPantalla());
    }

    subirFormulario() {
        this.logica.iniciarSesion();
    }
}

