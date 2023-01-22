import { valida } from "./validacion.js";


const inputs = document.querySelectorAll("input:not(.cabecero__busqueda, #img-url)");
const textArea = document.querySelector("textarea");
const logAdmin = document.querySelector(".cabecero__der");

inputs.forEach((input) => {    
    input.addEventListener('blur', (input) => {        
        valida(input.target);       
    })
})

textArea.addEventListener('blur', (textArea) => {
    valida(textArea.target)
})

window.addEventListener("load", () => {

    const user = JSON.parse(localStorage.getItem("user"));    

    if (!user) {
        const navDer = document.createElement("a");
        navDer.href = "/screens/authentication/login.html"
        const content = `<button id="login" class="cabecero__btn">Login</button>`;
        navDer.innerHTML = content;    
        logAdmin.appendChild(navDer);
    } else {
        
        const content = `<label class="label-user">${user.email}</label>
                         <a href="/screens/products/product-index.html"><button id="dashboard" class="cabecero__btn btn-dropdown">Dashboard</button></a>
                         <a><button id="logout" class="cabecero__btn btn-logout">Log out</button></a>`;           
        logAdmin.innerHTML = content;

        document.querySelector("#logout").addEventListener("click", () => {
            localStorage.removeItem("user");
            location.reload();
        })
    }   
    
})



// homePage = document.querySelector('.homepage');
// logPage = document.querySelector('.logpage');
// btnLog = document.querySelector('#login');
// btnVol = document.querySelector('#volver');



// btnLog.addEventListener('click', () => {
//     btnLog.style.display = 'none';
//     btnVol.style.display = 'block';
//     homePage.style.display = 'none';
//     logPage.style.display = 'flex';
// })

// btnVol.addEventListener('click', () => {
//     btnVol.style.display = 'none';
//     btnLog.style.display = 'block';
//     homePage.style.display = 'block';
//     logPage.style.display = 'none';
// })




