import { valida } from "../js/validacion.js";
import { productoServices } from "../services/productos-servicios.js";


var path = window.location.pathname;
var page = path.split("/").pop();

// Creacion de producto
const nuevoProducto = (name, price, imageUrl, id) => {
    const card = document.createElement("div");
    const contenido = `        
            <img src="/${imageUrl}" >
            <p class="item__nombre">${name}</p>
            <p class="item__precio">$ ${price}</p>
            <a href="/screens/products/show.html?id=${id}" class="item__link">Ver Producto</a>    `

    card.innerHTML = contenido;
    card.classList.add("productos__linea__lista__item");
    return card;
}


// Crear secciones de categorias
const crearLineas = () => {
    const lineaSW = document.createElement("div");
    let content = `        
    <div class="productos__linea__top">
        <h2>Star Wars</h2>
        <a><button class="productos__linea__top__btn">Ver todo<i class="fa-solid fa-arrow-right"></i></button></a>
        </div>
        <div class="productos__linea__lista" datos-productos-sw>        
        </div>`
        lineaSW.innerHTML = content;
        lineaSW.classList.add("productos__linea");
        
        const lineaConsola = document.createElement("div");
        content = `        
        <div class="productos__linea__top">
        <h2 id="consola__list">Consolas</h2>
        <a><button class="productos__linea__top__btn">Ver todo<i class="fa-solid fa-arrow-right"></i></button></a>
        </div>
        <div class="productos__linea__lista" datos-productos-consola>           
        </div>`
        lineaConsola.innerHTML = content;
        lineaConsola.classList.add("productos__linea");
        
        const lineaDiversos = document.createElement("div");
        content = `       
        <div class="productos__linea__top">
            <h2>Diversos</h2>
            <a><button class="productos__linea__top__btn">Ver todo<i class="fa-solid fa-arrow-right"></i></button></a>
        </div>
        <div class="productos__linea__lista" datos-productos-diversos>            
        </div>
        `
        lineaDiversos.innerHTML = content;
        lineaDiversos.classList.add("productos__linea");
        
        document.querySelector(".productos").appendChild(lineaSW);
        document.querySelector(".productos").appendChild(lineaConsola);
        document.querySelector(".productos").appendChild(lineaDiversos);

}

// Render del index
const render = async () => {    
    
    crearLineas();
    const productoSW = document.querySelector("[datos-productos-sw]")
    const productoConsolas = document.querySelector("[datos-productos-consola]")
    const productoDiversos = document.querySelector("[datos-productos-diversos]")
    try {        
        const listaProductos = await productoServices.listaProductos();
        
        listaProductos.forEach(element => {
            
            if (element.section == "Star Wars" && productoSW.getElementsByClassName("productos__linea__lista__item").length < 6) {
                productoSW.appendChild(nuevoProducto(element.name, element.price, element.imageUrl, element.id));
            }
            
            if (element.section == "Consola" && productoConsolas.getElementsByClassName("productos__linea__lista__item").length < 6) {
                productoConsolas.appendChild(nuevoProducto(element.name, element.price, element.imageUrl, element.id));
            }
            
            if (element.section == "Diverso" && productoDiversos.getElementsByClassName("productos__linea__lista__item").length < 6) {
                productoDiversos.appendChild(nuevoProducto(element.name, element.price, element.imageUrl, element.id));
            }
            
        });
        // Boton Ver Mas
        const btnMas = document.querySelectorAll(".productos__linea__top__btn");    
        btnMas.forEach(element => {
        element.addEventListener("click", async (event) => {
        document.querySelectorAll(".productos__linea").forEach( (e) =>{
            e.remove();                   
        })
        const todosProductos = await productoServices.listaProductos();        
        renderTodos(todosProductos);
        })
    });  

        
    } catch (error) {
        console.log(error);
    }
}


// Modifica index segun la busqueda realizada
const renderBusqueda = (busqueda) => {
    const lineaProductos = document.createElement("div");
    let content = `        
    <div class="productos__linea__top">
    <h2>Productos Encontrados</h2>        
    </div>
    <div class="productos__linea__lista__busqueda" datos-productos-busqueda>        
    </div>`
    lineaProductos.innerHTML = content;
    lineaProductos.classList.add("productos__linea");
    document.querySelector(".productos").appendChild(lineaProductos);
    
    const productosBusqueda = document.querySelector("[datos-productos-busqueda]")
    
    busqueda.forEach( element => {
        productosBusqueda.appendChild(nuevoProducto(element.name, element.price, element.imageUrl, element.id));
    })
}

const renderTodos = (prods) => {
    const lineaProductos = document.createElement("div");
    let content = `        
    <div class="productos__linea__top">
    <h2>Todos los productos</h2>        
    <a><button class="productos__linea__top__volver"><i class="fa-solid fa-arrow-left"></i>Volver</button></a>
    </div>
    <div class="productos__linea__lista__todos" datos-productos-todos>        
    </div>`
    lineaProductos.innerHTML = content;
    lineaProductos.classList.add("productos__linea");
    document.querySelector(".productos").appendChild(lineaProductos);

    const productosTodos = document.querySelector("[datos-productos-todos]")
    
    prods.forEach( element => {
        productosTodos.appendChild(nuevoProducto(element.name, element.price, element.imageUrl, element.id));
    })

    document.querySelector(".productos__linea__top__volver").addEventListener("click", () => {
        document.querySelectorAll(".productos__linea").forEach( (e) =>{
            e.remove();            
        })
        render();
    })
}


if (page == "index.html") {
    // Funcionalidad de barra de busqueda
    const btnBusqueda = document.querySelector(".cabecero__busqueda");
    btnBusqueda.addEventListener("input", async (e) => {
        let valor = btnBusqueda.value;
        if (valor.length > 0) {               
            document.querySelectorAll(".productos__linea").forEach( (e) =>{
                e.remove();            
            })

            try {
                const search = await productoServices.listaBusqueda(valor);                   
                renderBusqueda(search);
            } catch (error) {
                console.log(error);
            }
            
        }else{ 
            document.querySelectorAll(".productos__linea").forEach( (e) =>{
                e.remove();            
            })
            render();  
        }    
    })

    // Render de la pagina inicial
    render();
}




// -------    CRUD    -------

// ---------> INDEX ADMIN
const nuevoProductoAdmin = (name, price, imageUrl, section, id) => {
    const card = document.createElement("div");
    const contenido = `        
            <img src="/${imageUrl}" >
            <p class="item__nombre">${name}</p>
            <p class="item__nombre">${section}</p>
            <p class="item__precio">$ ${price}</p>
            <div class="item__links">   
                        <a href="../products/show.html?id=${id}" class="item__link">Ver</a> 
                        <a href="../products/product-editar.html?id=${id}" class="item__link editar">Editar</a>
                        <a class="item__link eliminar" id="${id}">Eliminar</a>
            </div>         `

    card.innerHTML = contenido;
    card.classList.add("productos__linea__lista__item");

    const btn = card.querySelector('.eliminar');
    btn.addEventListener('click', () => {
    const id = btn.id;
    const modal = document.querySelector(".modal-container");
    modal.id = id;
    modal.classList.remove("modal--close");

    })

    return card;
}

const renderProductAdmin = async () => {
    const productos = document.querySelector("[datos-productos]")
    try {        
        const listaProductos = await productoServices.listaProductos();
        
        listaProductos.forEach(element => {            
            productos.appendChild(nuevoProductoAdmin(element.name, element.price, element.imageUrl, element.section, element.id));
            
            
        });
    } catch (error) {
        console.log(error);
    }
}

if (page == "product-index.html") {
    const user = localStorage.getItem("user");    
    if (!user) {        
        window.location.href = "../authentication/login.html";
    } else { 
        renderProductAdmin();
        const deleteModal = document.querySelector(".modal-container");

        document.querySelector(".modal__close").addEventListener("click", () => {
            deleteModal.classList.add("modal--close");
        })

        document.querySelector(".modal__button--cancel").addEventListener("click", () => {
            deleteModal.classList.add("modal--close");
        })

        document.querySelector(".modal__button--confirm").addEventListener("click", () => {
            const id = document.querySelector(".modal-container").id;
            
            productoServices.eliminarProducto(id)
            .then( respuesta => { 
                console.log(respuesta)
            })
            .catch(err => alert('Ocurrio un error'));  
        })

    }
}


// ---------> ALTA
// display imagen

if (page == "product-create.html") { 

    const user = localStorage.getItem("user");    
    if (!user) {
        window.location.href = "../authentication/login.html";
    } else {     
        document.querySelector("#img-url").addEventListener("change", (e) => {         
            let selectedFile = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function(){
                document.querySelector("#img-preview").src = this.result;
            }
            reader.readAsDataURL(selectedFile);
            document.querySelector("#img-preview").style.display = "block";
            document.querySelector("#upload-status").style.display = "none";    
        })

        document.querySelector(".product__add__form").addEventListener("submit", (e) => {
            e.preventDefault();    
            const name = document.querySelector("#prod-name").value;
            const section = document.querySelector("#categoria").value;
            const price = document.querySelector("#precio-producto").value;
            const descripcion = document.querySelector("#descripcion-producto").value;
            productoServices.crearProducto(name, "img/productos/vario6.png", price, section, descripcion).then( () => {
                window.location.href = 'product-index.html';
             });    
        })
    }
}


// ---------> UPDATE

if (page == "product-editar.html") {

    const user = localStorage.getItem("user");    
    if (!user) {
        window.location.href = "../authentication/login.html";
    } else {  

    document.querySelector("#img-url").addEventListener("change", (e) => {        
        
        let selectedFile = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(){
        document.querySelector("#img-preview").src = this.result;
    }
    reader.readAsDataURL(selectedFile);
    document.querySelector("#img-preview").style.display = "block";
    document.querySelector("#upload-status").style.display = "none";        
})
    

const obtenerInformacion = async () => {    
    const url = new URL(window.location);
    const id = url.searchParams.get('id');    
    
    // if (id === null) {
    //     window.location.href = "/screens/error.html";
    //     alert("MAL ID NULL");
    // }

    const name = document.querySelector("[data-nombre]");
    const section = document.querySelector("[data-section]");
    const price = document.querySelector("[data-precio]");
    const descripcion = document.querySelector("[data-descripcion]");  
    const imgPreset =  document.querySelector("[data-image-preset]");  
    const img = document.querySelector("[data-image-save]");

    document.querySelector("#img-preview").style.display = "block";
    document.querySelector("#upload-status").style.display = "none";  
    
    try {
        const producto = await productoServices.detalleProducto(id)
        if (producto.name && producto.section && producto.price && producto.descripcion) {            
            name.value = producto.name;
            price.value = producto.price;    
            descripcion.value = producto.descripcion;     
            img.value = producto.imageUrl;             
            document.querySelector("#img-preview").src = `/${producto.imageUrl}`;        
            
            for (let i = 0; i < section.options.length; i++) {                    
                if (section.options[i].value == producto.section) {
                    section.options[i].selected = true;
                    break;
                }                        
            }
            
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log('Catch Error: ', error);
        alert('ERROR');
        // window.location.href = '/screens/error.html';
    } 
}

obtenerInformacion();

document.querySelector("#update-form").addEventListener('submit', (event) => {
    event.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    const name = document.querySelector("#prod-name").value;
    const section = document.querySelector("#categoria").value;
    const price = document.querySelector("#precio-producto").value;
    const descripcion = document.querySelector("#descripcion-producto").value;
    const imageUrl = document.querySelector("#image-save").value;
    
    productoServices.actualizarProducto(name, price, imageUrl, section, descripcion, id).then(() => {        
        window.location.href = 'product-index.html';        
    })

})

}
}

// ------ SHOW

if (page == "show.html") {

    const name = document.querySelector(".producto__show__title");
    const price = document.querySelector(".producto__show__price");
    const desc = document.querySelector(".producto__show__desc");
    const img = document.querySelector(".producto__show__img");

    const showProducto = async () => {
        const url = new URL(window.location);
        const id = url.searchParams.get('id');          
        try {

            // Datos producto
            const producto = await productoServices.detalleProducto(id);            
            img.src = `/${producto.imageUrl}`;
            name.innerHTML = producto.name;              
            price.innerHTML = `$ ${producto.price}`;
            desc.innerHTML = producto.descripcion;

            // Productos similares            
            const lista = document.querySelector(".productos__linea__lista")
            const similares = await productoServices.listaSimilares(producto.section);

            similares.forEach(element => {
                if (element.id != producto.id && lista.getElementsByClassName("productos__linea__lista__item").length < 6) {
                    lista.appendChild(nuevoProducto(element.name, element.price, `/${element.imageUrl}`, element.id));
                }
            })


            

        } catch (error) {
            console.log(error);
        }
    }

    showProducto();    
    
}








