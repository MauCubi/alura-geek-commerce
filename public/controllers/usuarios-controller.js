import { usuarioServices } from "../services/usuarios-servicios.js";
import { productoServices } from "../services/productos-servicios.js";

// const login = async (email, password) => {
//     const listaUsuarios = await usuarioServices.listaUsuarios();
//     console.log(listaUsuarios);

// }

document.querySelector(".login__form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;  


    if (nombre != "" && password != "") {            
        try {
            let listaUsuarios = await usuarioServices.listaUsuarios();
            let encontrado = false;
            for(let obj of listaUsuarios){
                if (obj.email === nombre && obj.password === password) {
                    console.log(obj.email);
                    encontrado = true;
                    window.location.href = "/public/index.html";
                    localStorage.setItem("user", JSON.stringify(obj));
                    break;                    
                }                
            }

            if (encontrado === false) {
                alert("El email o contraseña no existe");
            }
        
        } catch (error) {
            console.log("ERROR " + error);
        }      
    }    
    
})