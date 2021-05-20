class Adicion{

    constructor (urlImagen, posX, posY, ancho, alto, selected){

        this.imagen = loadImage("./image/Adicion" + urlImagen + ".png");
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
        this.selected = selected;
    }


    pintar(){

        if (this.selected == true){
            image(this.imagen, this.posX, this.posY, this.ancho, this.alto)
        }

    }

    getPosX() {
        return this.posX;
    }

    setPosX(posX) {
        this.posX = posX;
    }

    getPosY() {
        return this.posY;
    }

    setPosY(posY) {
        this.posY = posY;
    }

    getAncho() {
        return this.ancho;
    }

    setAncho(ancho) {
        this.ancho = ancho;
    }

    getAlto() {
        return this.alto;
    }

    setAlto(alto) {
        this.alto = alto;
    }

    isSelected() {
        return this.selected;
    }

    setSelected(selected){
        this.selected = selected;
    }

}