
let conteiner = document.getElementById("conteiner")

let productos =[
    {
       "id":1,
       "nombre":"Fernet",
       "img": "fernet.jpg",
       "precio": 3000
    },
    {
        "id":2,
        "nombre":"Gancia",
        "img": "gancia.jpg",
        "precio": 3000
     },
     {
        "id":3,
        "nombre":"Smirnoff",
        "img": "smirnoff.jpg",
        "precio": 3000
     },
     {
        "id":4,
        "nombre":"Absolut",
        "img": "absolut.jpg",
        "precio": 3000
     },
     {
        "id":5,
        "nombre":"Mumm",
        "img": "mumm.jpg",
        "precio": 3000
     },
     {
        "id":6,
        "nombre":"Baron B",
        "img": "baronb.jpg",
        "precio": 3000
     },
     {
        "id":7,
        "nombre":"Red Label",
        "img": "redlabel.jpg",
        "precio": 3000
     },
     {
        "id":8,
        "nombre":"Black Label",
        "img": "blacklabel.jpg",
        "precio": 3000
     }
    
]

    productos.forEach ((item) =>{
    let div = document.createElement("div");
    div.classList.add("listaProductos")
    div.innerHTML = `
        <h2>${item.nombre}</h2>
        <img src="./img/${item.img}">
        <p>ID: ${item.id}</p>
        $${item.precio}

        <button class="boton" data-id="${item.id}"> Agregar al carrito</button>
    `;

    conteiner.append(div);
     
});


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


let botones = document.querySelectorAll(".boton");
let listaCarrito = document.getElementById("lista-carrito");
let totalCarrito = document.getElementById("total");

botones.forEach((boton) => {
   boton.addEventListener("click", () => {
       const productoID = parseInt(boton.getAttribute("data-id"));
       const productoSeleccionado = productos.find((item) => item.id === productoID);

       if (productoSeleccionado) {
           carrito.push(productoSeleccionado);
           actualizarCarrito();
           guardarCarritoEnLocalStorage();
           Swal.fire(`${productoSeleccionado.nombre} añadido al carrito`);
       }
   });
});

function actualizarCarrito() {
   listaCarrito.innerHTML = "";
   total = 0;

   carrito.forEach((producto) => {
       const listItem = document.createElement("li");
       listItem.innerHTML = `
           ${producto.nombre} - $${producto.precio}
           <button class="eliminar-item" data-id="${producto.id}">Eliminar</button>
       `;
       listaCarrito.appendChild(listItem);

       total += producto.precio;
   });

   totalCarrito.textContent = total;
   
   
   const eliminarBotones = document.querySelectorAll(".eliminar-item");
   eliminarBotones.forEach((eliminarBoton) => {
       eliminarBoton.addEventListener("click", (e) => {
           const productoID = parseInt(eliminarBoton.getAttribute("data-id"));
           const index = carrito.findIndex((item) => item.id === productoID);
           if (index !== -1) {
               carrito.splice(index, 1);
               actualizarCarrito();
               guardarCarritoEnLocalStorage();
           }
       });
   });
}

actualizarCarrito();
