
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

let buyBoton = document.querySelector("#buyBoton");
let profileButton = document.querySelector("#profileButton");

let storage = window.localStorage;
let pantalla = 0;
let usuariosGuardados = storage.getItem("listaUsuarios");
let usuarios = [];
if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
}

let pedidosGuardados = storage.getItem("listaPedidos");
let pedidos = [];
if (pedidosGuardados){
    pedidos = JSON.parse(pedidosGuardados);
}
console.log(usuariosGuardados);
console.log(pedidosGuardados);

let platos = [];
let adicionales = [];
let pedidoTemp;
let adicionTemp = [];



let usuarioActual;

class Logica {
    constructor() {
        this.pantallaLogin = loadImage("./image/PantallaInicioSesion.jpg");
        this.pantallaRegister = loadImage("./image/PantallaRegistro.jpg");
        this.pantallaMenu = loadImage("./image/PantallaMenu.jpg");
        this.pantallaOpciones = loadImage("./image/PantallaSOpcion.jpg");
        this.pantallaPago = loadImage("./image/MetodosdePago.jpg");
        this.pantallaPagoRecibido = loadImage("./image/PantallaPagoRecibido.jpg");
        this.pantallaResumen = loadImage("./image/PantallaResumen.jpg");
        this.resumen1 = loadImage("./image/Resumen1.png");
        this.resumen2 = loadImage("./image/Resumen2.png");
        this.resumen3 = loadImage("./image/Resumen3.png");
        this.resumen4 = loadImage("./image/Resumen4.png");
        this.op1 = loadImage("./image/PA-Op1.png");
        this.op2 = loadImage("./image/PA-Op2.png");
        this.op3 = loadImage("./image/PA-Op3.png");
        this.op4 = loadImage("./image/PA-Op4.png");
        this.pantallaMenuDespegable = loadImage("./image/PantallaMenuDesplegable.jpg");
        this.historialdePedidos = loadImage("./image/HistorialdePedidos.jpg");

        this.ocultarTodo(loginForm);
        this.cambiarPantalla(registerLogin, 1);
        this.ocultarTodo(registerForm);
        this.iniciarSesion();
        this.registrar();
        this.cargarPlatos();
        this.cargarAdicionales();
        this.ocultarElemento(profileButton);
        this.cambiarPantalla(profileButton, 7);

        this.ocultarElemento(buyBoton);
        this.cambiarPantalla(buyBoton, 4);

    }

    pintar() {
        switch (pantalla) {
            case 0:// Login
                image(this.pantallaLogin, 0, 0);
                this.ocultarTodo(registerForm);
                this.mostrarTodo(loginForm);
                this.ocultarElemento(buyBoton);
                break;
            case 1:// Registro
                image(this.pantallaRegister, 0, 0);
                this.ocultarTodo(loginForm);
                this.mostrarTodo(registerForm);
                this.ocultarElemento(buyBoton);
                break;
            case 2://Menu
                image(this.pantallaMenu, 0, 0);
                this.ocultarTodo(loginForm);
                this.ocultarTodo(registerForm);
                this.ocultarElemento(buyBoton);
                this.mostrarElemento(profileButton);
                platos.forEach(element => {
                    element.pintar();
                });
                break;
            case 3: //Adicionales
                image(this.pantallaOpciones, 0, 0);
                this.ocultarTodo(loginForm);
                this.ocultarTodo(registerForm);
                this.mostrarElemento(buyBoton);
                for (let i = 0; i < adicionales.length; i++) {
                    adicionales[i].pintar();
                }
                if (pedidoTemp) {
                    switch (pedidoTemp.image) {
                        case 1:
                            image(this.op1, 33, 450);
                            break;
                        case 2:
                            image(this.op2, 33, 450);
                            break;
                        case 3:
                            image(this.op3, 33, 450);
                            break;
                        case 4:
                            image(this.op4, 33, 450);
                            break;
                    }

                }
                fill(255);
                textSize(18);
                text(pedidoTemp.plato.nombre, 81, 506.37);
                textSize(16);
                text(pedidoTemp.plato.sabor, 81, 550);

                text([...adicionTemp].map(element => { return element.nombre }).join(), 81, 570);
                //console.log(adicionTemp.map(element => {return element.nombre}).join());

                textSize(18);
                text("Total", 81, 630);
                text(pedidoTemp.precio, 81, 658);

                break;
            case 4:
                image(this.pantallaPago, 0, 0);
                this.ocultarElemento(buyBoton);
                break;
            case 5:
                image(this.pantallaPagoRecibido, 0, 0);
                if (frameCount % 360 == 0) {
                    pantalla = 6;
                }
                break;
            case 6:
                image(this.pantallaResumen, 0, 0);
                switch (pedidoTemp.image) {
                    case 1:
                        image(this.resumen1, 33, 252);
                        break;
                    case 2:
                        image(this.resumen2, 33, 252);
                        break;
                    case 3:
                        image(this.resumen3, 33, 252);
                        break;
                    case 4:
                        image(this.resumen4, 33, 252);
                        break;
                }

                text(pedidoTemp.plato.nombre.replace("\n", " "), 57, 336);
                text(pedidoTemp.plato.sabor, 57, 355);
                textSize(20);
                text("Total", 57, 523);
                text("$" + pedidoTemp.precio, 57, 550);
                text("The restaurant is preparing your shake", 57, 628);
                text("Approximate time", 57, 665);
                text(pedidoTemp.tiempo, 57, 685);

                break;

            case 7:
                image(this.pantallaMenuDespegable, 0, 0);

                break;

            case 8:
                image(this.historialdePedidos, 0, 0);

                break;


        }

    }

    seleccionarPlato() {

        for (let index = 0; index < platos.length; index++) {
            let plato = platos[index];
            if (mouseX > plato.getPosX() && mouseX < plato.getPosX() + plato.getAncho() && mouseY > plato.getPosY() && mouseY < plato.getPosY() + plato.getAlto()) {
                pantalla = 3;
                pedidoTemp = { plato: plato, precio: plato.precio, image: index + 1 };
            }
        }

    }

    iniciarSesion() {
        loginButton.addEventListener("click", function () {
            let usuario = usuarios.find(element => {
                return element.email == emailLogin.value;
            })
            
            if (usuario) {
                if (usuario.password == passwordLogin.value) {
                    pantalla = 2;
                    usuarioActual = usuario;
                } else {
                    alert("Contraseña incorrecta");
                }
            } else {
                alert("El usuario no existe")
            }
        })
    }


    registrar() {
        registerButton.addEventListener("click", function () {
            /*usuarios.push(new Usuario(emailRegister.value,passwordRegister.value,cellphoneRegister.value,addressRegister.value))*/
            let nuevoUsuario = new Usuario(emailRegister.value, passwordRegister.value, cellphoneRegister.value, addressRegister.value);
            usuarios.push(nuevoUsuario);
            storage.setItem("listaUsuarios", JSON.stringify(usuarios));
            pantalla = 2;
            usuarioActual = nuevoUsuario;
            
        })
    }

    controlarClick() {
        switch (pantalla) {
            case 2:
                this.seleccionarPlato();
                break;

            case 3:
                this.agregarAdiciones();
                if (mouseX > 31 && mouseX < 31 + 31.95 && mouseY > 81 && mouseY < 81 + 27) {
                    pantalla = 2;
                    pedidoTemp = {};
                    adicionTemp = [];
                    adicionales.forEach(function (element) {
                        element.setSelected(false);
                    })
                }
                
                break;

            case 4:
                if (mouseX > 31 && mouseX < 31 + 31.95 && mouseY > 81 && mouseY < 81 + 27) {
                    pantalla = 3;
                }
                if (mouseX > 31 && mouseX < 31 + 341 && mouseY > 286 && mouseY < 286 + 62) {
                    this.agregarPedido(pedidoTemp);
                    pantalla = 5;
                }
                if (mouseX > 31 && mouseX < 31 + 341 && mouseY > 359 && mouseY < 359 + 62) {
                    this.agregarPedido(pedidoTemp);
                    pantalla = 5;
                }
                if (mouseX > 31 && mouseX < 31 + 341 && mouseY > 432 && mouseY < 432 + 62) {
                    this.agregarPedido(pedidoTemp);
                    pantalla = 5;
                }
                if (mouseX > 31 && mouseX < 31 + 341 && mouseY > 505 && mouseY < 505 + 62) {
                    this.agregarPedido(pedidoTemp);
                    pantalla = 5;
                }
                if (mouseX > 31 && mouseX < 31 + 341 && mouseY > 583 && mouseY < 583 + 62) {
                    this.agregarPedido(pedidoTemp);
                    pantalla = 5;
                }

                break;

            case 7:
                if (mouseX > 46 && mouseX < 297 && mouseY > 247 && mouseY < 289) {
                    pantalla = 2;
                }

                if (mouseX > 46 && mouseX < 297 && mouseY > 297 && mouseY < 339) {
                    pantalla = 8;
                }

                if (mouseX > 46 && mouseX < 297 && mouseY > 348 && mouseY < 390) {
                    pantalla = 0;
                }

                break;



        }

    }


    agregarPedido(pedido) {
        let nuevoPedido = new Pedido(usuarioActual.cellPhone, pedido.plato, adicionTemp, Date.now(), pedidoTemp.precio, "15 min");
        let pedidosCopia = [...pedidos];        
        //pedido.id = usuarioActual.cellPhone;
        //pedido.fecha = Date.now();
        pedido.tiempo = "15 min";
        pedidos.push(nuevoPedido);
        
        //storage.setItem("listaPedidos", JSON.stringify(pedidosCopia));
        console.log(nuevoPedido);
    }


    cargarPlatos() {
        platos.push(new Plato(105, 258.45, 210, 130, "Delighted\nShake", "Strawberry", 13000, "1"));
        platos.push(new Plato(105, 405, 210, 130, "Spongy\nShake", "Vainilla", 15000, "2"));
        platos.push(new Plato(105, 557, 210.99, 130, "Snow\nShake", "Chantilly", 18000, "3"));
        platos.push(new Plato(105, 709, 210, 130, "Monster\nShake", "Bubble gum", 20000, "4"));
    }

    cargarAdicionales() {
        adicionales.push(new Adicion(1, 21, 265, 119, 120, false, "M&M"));
        adicionales.push(new Adicion(2, 149, 265, 119, 120, false, "Chispitas"));
        adicionales.push(new Adicion(3, 278, 265, 119, 120, false, "Gusanitos"));
    }

    agregarAdiciones() {

        for (let i = 0; i < adicionales.length; i++) {
            let adicion = adicionales[i];
            if (mouseX > adicion.getPosX() && mouseX < adicion.getPosX() + adicion.getAncho() && mouseY > adicion.getPosY() && mouseY < adicion.getPosY() + adicion.getAlto()) {
                switch (adicion.isSelected()) {
                    case false:
                        adicionTemp.push(adicion);
                        pedidoTemp.precio += 800;
                        adicion.setSelected(true);
                        break;

                    case true:
                        adicionTemp.splice(adicionTemp.map(element => { return element.nombre }).indexOf(adicion.nombre), 1);
                        pedidoTemp.precio -= 800;
                        adicion.setSelected(false);
                        break;
                }

            }

        }

    }


    cambiarPantalla(buttonElement, nuevaPagina) {
        buttonElement.addEventListener("click", function () {
            pantalla = nuevaPagina;
        })
    }

    ocultarElemento(htmlElement) {
        htmlElement.classList.add("hidden");
    }

    mostrarElemento(htmlElement) {
        htmlElement.classList.remove("hidden");
    }

    ocultarTodo(list) {
        list.forEach(element => {
            this.ocultarElemento(element);
        });
    }

    mostrarTodo(list) {
        list.forEach(element => {
            this.mostrarElemento(element);
        });
    }
}