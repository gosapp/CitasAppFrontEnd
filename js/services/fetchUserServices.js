let urlBase = 'https://localhost:7020/api/v1';
let JwtToken = sessionStorage.getItem("token");
//console.log(JwtToken);

export const GetMyUser = async () =>
{
    JwtToken = sessionStorage.getItem("token");

    let result;
    let response = await fetch(`${urlBase}/User/true`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JwtToken}` 
        }
    })

    if(response.ok){
        result = await response.json();

    }

    if(response.status == 404 || response.status == 401){
        result = {
            status : response.status
        }
    }
    
    return result;
}

export const ListUsers = async (arrayUsr) =>
{
    JwtToken = sessionStorage.getItem("token");
    let result;
    let query = "";
    let queryParam = "&usersId=";
    for(let i=0; i<arrayUsr.length; i++){
        if(i< arrayUsr.length-1){
            query += arrayUsr[i] + queryParam;
        } else{
            query += arrayUsr[i];
        }
    }
    console.log(query);

    let response = await fetch(`${urlBase}/User/false?usersId=${arrayUsr}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JwtToken}` 
        }
    })
    console.log(response);
    if(response.ok){
        result = await response.json();

    }

    if(response.status == 404 || response.status == 401){
        result = {
            status : response.status
        }
    }
    
    return result;
}

export const ChangeUser = async (request) => 
{
    JwtToken = sessionStorage.getItem("token");
    let result;
    let response = await fetch(`${urlBase}/User`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JwtToken}` 
        },
        body: JSON.stringify(request)
    })

    if(response.ok){
        result = await response.json();
    }
    
    return result;
}

export const UploadPhoto = async (data) =>
{
    JwtToken = sessionStorage.getItem("token");
    let result;
    let response = await fetch(`${urlBase}/Photo`, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${JwtToken}`
        },
        body: data
    })

    result = await response.json();

    if(response.ok && response.status == 201){
        return result;
    }
    else{
        if(result.imagen == "No se pueden agregar mas fotos") {
            return -1;
        }   
        result = null;

        return result;
    }
    
}

export const CreateUser = async (request) => {

    JwtToken = sessionStorage.getItem("token");
    let result;
    let response = await fetch(urlBase+"/User", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JwtToken}`
        },
        body: JSON.stringify(request) 
    })

    if(response.ok && response.status == 201){
        result = await response.json();
    }else{
        result = null;
    }

    return result;
}

export const GetUserById = async (id) =>
{
    let result;
    let response = await fetch(`${urlBase}/User/true?usersId=${id}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JwtToken}` 
        }
    })
    if(response.ok || response.status == 404){
        result = await response.json();
    }
    return result;
}
