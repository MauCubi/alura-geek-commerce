// GET

// Toda la respuesta la almacenamos en un json
// const listaProductos = () => fetch("http://localhost:3000/producto").then(respuesta => respuesta.json()); 
const listaProductos = () => fetch(" https://my-json-server.typicode.com/producto").then(respuesta => respuesta.json());

const listaBusqueda = (name) => fetch(`http://localhost:3000/producto?name_like=${name}`).then(respuesta => respuesta.json()); 

const listaSimilares = (section) => fetch(`http://localhost:3000/producto?section=${section}`).then(respuesta => respuesta.json()); 


const crearProducto = (name, imageUrl, price, section, descripcion) => {
  console.log("EH");
    return fetch('http://localhost:3000/producto', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name, imageUrl, price, alt:"Product", section, descripcion, id: uuid.v4()})
    })
  }

  const detalleProducto = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`).then( (respuesta) =>  respuesta.json() );
  }

  const actualizarProducto = (name, price, imageUrl, section, descripcion, id) => {
    return fetch(`http://localhost:3000/producto/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name, imageUrl, price, alt:"Product", section, descripcion, id})
    })
    .then( (respuesta) => respuesta)
    .catch( (err) => console.log(err));
  }

const eliminarProducto = (id) => {
  return fetch(`http://localhost:3000/producto/${id}`, {
    method: 'DELETE'    
  })
}

export const productoServices = {
    listaProductos,
    listaBusqueda,
    crearProducto,
    detalleProducto,
    actualizarProducto,
    eliminarProducto,
    listaSimilares    
}