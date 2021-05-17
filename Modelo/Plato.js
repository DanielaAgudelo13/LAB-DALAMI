class Plato{

    constructor(posX, posY,ancho,alto,nombre,sabor,precio,urlImagen){
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
        this.nombre = nombre;
        this.sabor = sabor;
        this.precio = precio;
        this.imagen = loadImage("/image/Opcion"+urlImagen+".png");
    }

    pintar() {
        image(this.imagen,this.posX,this.posY,this.ancho,this.alto);
        fill(255);
        textSize(18);
        text(this.nombre,this.posX+20,this.posY+40);
        textSize(13);
        text(this.sabor,this.posX+20,this.posY+80);
        textSize(15);
        text("$"+this.precio,this.posX+20,this.posY+111);
    }
}