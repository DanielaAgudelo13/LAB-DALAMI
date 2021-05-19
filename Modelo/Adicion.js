class Adicion{

    constructor (urlImagen, posX, posY, ancho, alto, selected){

        this.imagen = loadImage("/image/Adicion" + urlImagen + ".png");
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
        this.selected = selected;
    }


    pintar(){

        if (this.selected){
            image(this.imagen, this.posX, this.posY, this.ancho, this.alto)
        }

    }



}