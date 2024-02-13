import { login } from "../services/fetchAuthServices.js";
import { GetMyUser } from "../services/fetchUserServices.js";

const Redirect = (user) => 
{
    //!Existe un usuario con esta cuenta
    if(user?.userId){
       window.location.href = "../../views/Matches.html";
    };   
}

document.addEventListener("submit", async function(e)
{
    const msj = document.querySelector("#response__msj");
    e.preventDefault();

    const {target} = e;

    if(target.matches("#login__form")) {

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const auth = {
            email: email,
            password: password
        }

        const resp = await login(auth);
        
        if(resp.message == "Ha iniciado sesión") {
            msj.innerHTML = "Te has conectado exitosamente.";
            msj.style.color = "#41BC02";
            msj.style.display = 'block';
            
            sessionStorage.setItem("token", resp.token);
            
            let user = await GetMyUser();

            setTimeout(() => {
                Redirect(user);
            }, 1000);
        }
        else if(resp == -1) {
            msj.innerHTML = "Credenciales incorrectas.";
            setTimeout(() => {
                msj.innerHTML = "";
        }, 2000);
        } 
        else {
            msj.innerHTML = "Hubo un problema durante el logueo.";
            setTimeout(() => {
                msj.innerHTML = "";
        }, 2000);
        }
    }
})