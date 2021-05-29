let canvas;
let control;

function setup () {
    canvas = createCanvas (414, 896);
    canvas.parent("micanva");
    control = new Control ();
}

function draw () {
    //background (255);
    control.pintar();
}

function mousePressed(){
    control.controlarClick();
}

function keyPressed(){
    control.controlarTeclas();
}
