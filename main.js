
const productos = [
    {
       id:1,
       nombre:"Fernet",
       img: "fernet.jpg",
       precio: 3000, 
    },
    {
        id:2,
        nombre:"Gancia",
        img: "gancia.jpg",
        precio: 3000, 
     },
     {
        id:3,
        nombre:"Smirnoff",
        img: "smirnoff.jpg",
        precio: 3000, 
     },
     {
        id:4,
        nombre:"Absolut",
        img: "absolut.jpg",
        precio: 3000, 
     },
     {
        id:5,
        nombre:"Mumm",
        img: "mumm.jpg",
        precio: 3000, 
     },
     {
        id:6,
        nombre:"Baron B",
        img: "baronb.jpg",
        precio: 3000, 
     },
     {
        id:7,
        nombre:"Red Label",
        img: "redlabel.jpg",
        precio: 3000, 
     },
     {
        id:8,
        nombre:"Black Label",
        img: "blacklabel.jpg",
        precio: 3000, 
     }
    
]

const contenedor = document.querySelector(".contenedor");
const listaCarrito = document.getElementById("lista-carrito");

function crearProducto() {
    productos.forEach((item) => {
        let div = document.createElement("div");
        div.className = "productos";
        div.innerHTML = `
        <h2>${item.nombre}</h2><br>
        <img src="./img/${item.img}"><br>
        <b>Precio: ${item.precio}</b><br>
        <button onclick="agregarAlCarrito(${item.id})">Añadir al carrito</button>
        `;

        contenedor.append(div);
    });
}

crearProducto();

JSON.parse(localStorage.getItem("carrito")) === null && localStorage.setItem("carrito", JSON.stringify([]))
const carrito = [];



function agregarAlCarrito(productId) {
    const productoEncontrado = productos.find((item) => item.id === productId);

    if (productoEncontrado) {
        carrito.push(productoEncontrado);
        actualizarCarrito();
        mostrarMensaje(`"${productoEncontrado.nombre}" se ha añadido al carrito.`);
        guardarCarritoEnLocalStorage(); 
    } else {
        mostrarMensaje('Producto no encontrado.');
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarCarrito() {
    listaCarrito.innerHTML = "Su carrito";

    let totalCompra = 0; // Inicializa el total en 0

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
        listaCarrito.appendChild(li);

        totalCompra += producto.precio; // Suma el precio del producto al total
    });

    // Muestra el total de la compra en el carrito
    const totalLi = document.createElement("li");
    totalLi.textContent = `Total de la compra: $${totalCompra}`;
    listaCarrito.appendChild(totalLi);
}

function mostrarMensaje(mensaje) {
    Swal.fire({
        title: mensaje,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
}


let listado = document.getElementsByClassName("listado");


fetch("./productos.json")
.then((response) => response.json())
.then((data) => {
    data.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <h2>${item.nombre}</h2>
        <img src="img/${item.img}"/> <!-- Cambio aquí -->
        <p>${item.precio}</p>
        `;
        listado.append(li);
    });
});
    


