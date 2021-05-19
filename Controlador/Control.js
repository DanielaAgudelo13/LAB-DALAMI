class Control {
    constructor () {
        this.logica = new Logica ();
    }

    pintar() {
        this.logica.pintar(); 
    }

    subirFormulario() {
        this.logica.iniciarSesion();
    }

    seleccionarPlato(){
        this.logica.seleccionarPlato();
    }
}

