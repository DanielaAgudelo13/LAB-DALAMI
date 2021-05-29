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

   controlarClick(){
       this.logica.controlarClick();
   }

   controlarTeclas(){
       this.logica.controlarTeclas();
   }
   
}

