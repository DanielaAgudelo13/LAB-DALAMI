let emailLogin = document.querySelector("#emailLogin");
let passwordLogin = document.querySelector("#passwordLogin");
let loginButton = document.querySelector("#loginButton");
let loginForm = document.querySelectorAll(".loginForm");

let registerLogin = document.querySelector("#registerLogin");
let emailRegister = document.querySelector("#emailRegister");
let passwordRegister = document.querySelector("#passwordRegister");
let cellphoneRegister = document.querySelector("#cellphoneRegister");
let addressRegister = document.querySelector("#addressRegister");
let registerButton = document.querySelector("#registerButton");
let registerForm = document.querySelectorAll(".registerForm");

let storage = window.localStorage;
let pantalla = 2;
let usuariosGuardados = storage.getItem("listaUsuarios");
let usuarios = [];
if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
}
console.log(usuarios);
let platos = [];
let adicionales = []; 
let pedidoTemp;

class Logica {
    constructor() {
        this.pantallaLogin = loadImage("/image/PantallaInicioSesion.jpg");
        this.pantallaRegister = loadImage("/image/PantallaRegistro.jpg");
        this.pantallaMenu = loadImage("/image/PantallaMenu.jpg");
        this.pantallaOpciones = loadImage("/image/PantallaSOpcion.jpg");
        this.op1 = loadImage("/image/PA-Op1.png");
        this.op2 = loadImage("/image/PA-Op2.png");
        this.op3 = loadImage("/image/PA-Op3.png");
        this.op4 = loadImage("/image/PA-Op4.png");



        this.ocultarTodo(loginForm);
        this.cambiarPantalla(registerLogin, 1);
        this.ocultarTodo(registerForm);
        this.iniciarSesion();
        this.registrar();
        this.cargarPlatos();
    }

    pintar() {
        switch (pantalla) {
            case 0:// Login
                image(this.pantallaLogin, 0, 0);
                this.ocultarTodo(registerForm);
                this.mostrarTodo(loginForm);
                break;
            case 1:// Registro
                image(this.pantallaRegister, 0, 0);
                this.ocultarTodo(loginForm);
                this.mostrarTodo(registerForm);
                break;
            case 2://Menu
            image(this.pantallaMenu,0,0);
            this.ocultarTodo(loginForm);
            this.ocultarTodo(registerForm);
            platos.forEach(element => {
                element.pintar();
            });
            break;
            case 3: //Adicionales
            image(this.pantallaOpciones,0,0);
            this.ocultarTodo(loginForm);
            this.ocultarTodo(registerForm);
            if(pedidoTemp){
            switch (pedidoTemp.image) {
                case 1:
                    image(this.op1,33,450);
                    break;
                case 2:
                    image(this.op2,33,450);
                    break;
                case 3:
                    image(this.op3,33,450);
                     break;
                case 4:
                    image(this.op4,33,450);
                    break;
            }
        }
        fill(255);
        textSize(18);
        text(pedidoTemp.nombre,81,506.37);
        textSize(16);
        text(pedidoTemp.sabor,81,550);

        textSize(18);
        text("Total",81,630);
        text(pedidoTemp.precio,81,658);
        }
    }

    seleccionarPlato(){
        if(pantalla == 2){
        for (let index = 0; index < platos.length; index++) {
            let plato = platos[index];
           if (mouseX > plato.getPosX() && mouseX < plato.getPosX() + plato.getAncho() && mouseY > plato.getPosY() && mouseY < plato.getPosY() + plato.getAlto()) {
               pantalla = 3;
               pedidoTemp = {...plato,image:index+1};
           }
        }
    }
    }

    iniciarSesion() {
        loginButton.addEventListener("click", function(){
            let usuario = usuarios.find(element => {
                return element.email == emailLogin.value;
            })
            console.log(usuario);
            if (usuario) {
                if (usuario.password == passwordLogin.value) {
                    pantalla = 2;
                }else{
                    alert("Contraseña incorrecta");
                }
            }else{
                alert("El usuario no existe")
            }
        })
    }
    

    registrar() {
        registerButton.addEventListener("click", function(){ 
            /*usuarios.push(new Usuario(emailRegister.value,passwordRegister.value,cellphoneRegister.value,addressRegister.value))*/
            let nuevoUsuario = new Usuario(emailRegister.value,passwordRegister.value,cellphoneRegister.value,addressRegister.value);
            usuarios.push(nuevoUsuario);
            storage.setItem("listaUsuarios",JSON.stringify(usuarios));
            pantalla = 2;
        })
    }

    cargarPlatos(){
        platos.push(new Plato(105,258.45,210,130,"Delighted\nShake","Strawberry",13000,"1"));
        platos.push(new Plato(105,405,210,130,"Spongy\nShake","Vainilla",15000,"2")); 
        platos.push(new Plato(105,557,210.99,130,"Snow\nShake","Chantilly",18000,"3"));
        platos.push(new Plato(105,709,210,130,"Monster\nShake","Bubble gum",20000,"4"));
    }

    cargarAdicionales(){
        adicionales.push(new Adicion(1, 17, 268, 112, 114, false));
        adicionales.push(new Adicion(2, 152, 268, 112, 114, false));
        adicionales.push(new Adicion(3, 281, 268, 112, 114, false));
    }

    cambiarPantalla(buttonElement, nuevaPagina) {
        buttonElement.addEventListener("click", function() {
            pantalla = nuevaPagina;
        })
    }

    ocultarElemento(htmlElement) {
        htmlElement.classList.add("hidden");
    }

    mostrarElemento(htmlElement) {
        htmlElement.classList.remove("hidden");
    }

    ocultarTodo(list){
        list.forEach(element => {
            this.ocultarElemento(element);
        });
    }

    mostrarTodo(list){
        list.forEach(element => {
            this.mostrarElemento(element);
        });
    }
}