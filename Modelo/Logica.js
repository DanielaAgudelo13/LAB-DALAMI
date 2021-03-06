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
let payMethodButton = document.querySelectorAll(".payMethodButton");

let storage = window.localStorage;
let pantalla = 0;
let usuariosGuardados = storage.getItem("listaUsuarios");
let usuarios = [];
if (usuariosGuardados) {
    usuarios = [...JSON.parse(usuariosGuardados)];
}

let pedidos = [];
let platos = [];
let adicionales = [];
let pedidoTemp;
let adicionTemp = [];

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

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
        this.pedidoAmarillo = loadImage("./image/PedidoAmarillo.png");
        this.pedidoAzul = loadImage("./image/PedidoAzul.png");

        this.ocultarTodo(loginForm);
        this.cambiarPantalla(registerLogin, 1);
        this.ocultarTodo(registerForm);
        this.ocultarTodo(payMethodButton);
        this.iniciarSesion();
        this.registrar();
        this.cargarPlatos();
        this.cargarAdicionales();
        this.ocultarElemento(profileButton);
        this.cambiarPantalla(profileButton, 7);

        this.ocultarElemento(buyBoton);
        this.cambiarPantalla(buyBoton, 4);
        payMethodButton.forEach(element => {
            this.cambiarPantalla(element, 5);
        });
        this.agregarPedido();

        this.compararFecha = new PedidoFechaComparable();
        this.compararPrecio = new PedidoPrecioComparable();

        this.scrollY = 0;

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
                textSize(24);
                text(pedidoTemp.plato.nombre.replace("\n", " "), 67, 520);
                textSize(16);
                text(pedidoTemp.plato.sabor, 67, 570);

                text([...adicionTemp].map(element => { return element.nombre }).join(), 67, 593);

                textSize(19);
                text("Total", 67, 640);
                text("$" + pedidoTemp.precio, 67, 670);
                this.ocultarTodo(payMethodButton);
                break;
            case 4: //Metodo de pago
                image(this.pantallaPago, 0, 0);
                this.mostrarTodo(payMethodButton);
                this.ocultarElemento(buyBoton);
                break;
            case 5: //Pago recibido
                image(this.pantallaPagoRecibido, 0, 0);
                this.ocultarTodo(payMethodButton);
                if (frameCount % 120 == 0) {
                    pantalla = 6;
                }
                break;
            case 6: //Resumen del pedido
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
                textSize(30);
                text(pedidoTemp.plato.nombre.replace(), 80, 336);
                textSize(20);
                text(pedidoTemp.plato.sabor, 80, 395);
                textSize(20);
                text("Total", 80, 560);
                text("$" + pedidoTemp.precio, 80, 585);
                textSize(20);
                text(pedidoTemp.tiempo, 80, 760);

                break;

            case 7: //Menu desplegable
                image(this.pantallaMenuDespegable, 0, 0);
                profileButton.style.top = "60px";
                this.ocultarElemento(buyBoton);
                this.ocultarTodo(payMethodButton);
                break;

            case 8: // Historial de pedidos
                background(255); 
                image(this.historialdePedidos, 0, this.scrollY);
                this.pintarPedidos();


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
                    pedidos = usuarioActual.pedidos;
                } else {
                    alert("Contrase??a incorrecta");
                }
            } else {
                alert("El usuario no existe")
            }
        })
    }


    registrar() {
        registerButton.addEventListener("click", function () {
            let nuevoUsuario = new Usuario(emailRegister.value, passwordRegister.value, cellphoneRegister.value, addressRegister.value, []);
            usuarios.push(nuevoUsuario);
            storage.setItem("listaUsuarios", JSON.stringify(usuarios));
            pantalla = 2;
            usuarioActual = nuevoUsuario;
            pedidos = usuarioActual.pedidos;

        })

    }


    pintarPedidos() {
        for (let i = 0; i < pedidos.length; i++) {
            let elemento = pedidos[i];
            if (i % 2 == 0) {
                image(this.pedidoAmarillo, 37, 329 + this.scrollY + (180 * i));
            } else {
                image(this.pedidoAzul, 37, 329 + this.scrollY + (180 * i));
            }
            textSize(20);
            text(elemento.plato.nombre.replace("\n", " "), 63, 385 + this.scrollY + (180 * i));
            text("Date: " + this.fechaFuncional(elemento.fecha), 63, 420 + this.scrollY + (180 * i));
            text("Total: $" + elemento.valor, 63, 450 + this.scrollY + (180 * i));

        }

    }

    controlarTeclas() {
        switch (pantalla) {
            case 8:
                if (keyCode == DOWN_ARROW) {
                    this.scrollY -= 30;
                    let newButtonPosition = 60 + this.scrollY;
                    profileButton.style.top = newButtonPosition.toString() + "px";
                }
                if (keyCode == UP_ARROW && this.scrollY < 0) {
                    this.scrollY += 30;
                    let newButtonPosition = 60 + this.scrollY;
                    profileButton.style.top = newButtonPosition.toString() + "px";

                }
                break;
        }
    }

    controlarClick() {
        switch (pantalla) {
            case 2:
                this.seleccionarPlato();
                break;
            case 3:
                this.agregarAdiciones();
                if (mouseX > 31 && mouseX < 31 + 40 && mouseY > 81 && mouseY < 81 + 35) {
                    pantalla = 2;
                    pedidoTemp = {};
                    adicionTemp = [];
                    adicionales.forEach(function (element) {
                        element.setSelected(false);
                    })
                }
                break;
            case 4:
                if (mouseX > 31 && mouseX < 31 + 40 && mouseY > 84 && mouseY < 84 + 35) {
                    pantalla = 3;
                }
                break;
            case 7:
                if (mouseX > 46 && mouseX < 297 && mouseY > 247 && mouseY < 289) {
                    profileButton.style.top = "60px";
                    this.scrollY = 0;
                    pedidoTemp = {};
                    adicionTemp = [];
                    adicionales.forEach(function (element) {
                        element.setSelected(false);
                    })
                    pantalla = 2;
                }
                if (mouseX > 46 && mouseX < 297 && mouseY > 297 && mouseY < 339) {
                    profileButton.style.top = "60px";
                    this.scrollY = 0;
                    adicionales.forEach(function (element) {
                        element.setSelected(false);
                    })
                    pantalla = 8;
                }
                if (mouseX > 46 && mouseX < 297 && mouseY > 348 && mouseY < 390) {
                    profileButton.style.top = "60px";
                    this.scrollY = 0;
                    pedidoTemp = {};
                    adicionTemp = [];
                    adicionales.forEach(function (element) {
                        element.setSelected(false);
                    })
                    this.logout();
                }
                break;
            case 8:
                if (mouseX > 37 && mouseX < 200 && mouseY > this.scrollY + 255 && mouseY < this.scrollY + 297) {
                    pedidos.sort(this.compararFecha.compare);
                }
                if (mouseX > 215 && mouseX < 378 && mouseY > this.scrollY + 255 && mouseY < this.scrollY + 297) {
                    pedidos.sort(this.compararPrecio.compare);
                }
                break;
        }
    }

    fechaFuncional(timestamp) {
        let newDate = new Date(timestamp);
        let day = newDate.getDate().toString().length < 2 ? `0${newDate.getDate()}` : newDate.getDate();
        let intMonth = parseInt(newDate.getMonth());
        let month = intMonth.toString().length < 2 ? `0${intMonth + 1}` : `${intMonth + 1}`;
        let year = newDate.getFullYear();
        let formattedDate = `${day}/${month}/${year}`
        return formattedDate;
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

    agregarPedido() {
        payMethodButton.forEach(elem => {
            elem.addEventListener("click", () => {
                let nuevoPedido = new Pedido(usuarioActual.cellPhone, {...pedidoTemp}.plato, adicionTemp, Date.now(), {...pedidoTemp}.precio, "15 min");
                pedidoTemp.tiempo = "15 min";
                pedidos.push(nuevoPedido);
                usuarioActual.pedidos = pedidos;
                let usuarioIndex = usuarios.findIndex(elem => {
                    return elem.email == usuarioActual.email;
                })
                usuarios[usuarioIndex] = usuarioActual;
                storage.setItem("listaUsuarios", JSON.stringify(usuarios, getCircularReplacer()));
                adicionales.forEach(function (element) {
                    element.setSelected(false);
                })
            })
        })
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

    logout() {
        usuarioActual = {};
        pedidos = {};
        pantalla = 0;
    }

}