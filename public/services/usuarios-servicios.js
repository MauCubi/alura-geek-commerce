// GET

// Toda la respuesta la almacenamos en un json
const listaUsuarios = () => fetch("https://alura-geek.onrender.com/usuario").then(respuesta => respuesta.json()); 

// const listaBusqueda = (name) => fetch(`http://localhost:3000/producto?name_like=${name}`).then(respuesta => respuesta.json()); 

export const usuarioServices = {
    listaUsuarios
}