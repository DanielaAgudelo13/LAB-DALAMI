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
        textSize(17);
        text(this.nombre,this.posX+10,this.posY+30);
        textSize(13);
        text(this.sabor,this.posX+10,this.posY+80);
        textSize(16);
        text("$"+this.precio,this.posX+10,this.posY+100);
    }
}