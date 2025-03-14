let urlBase = 'https://localhost:7199/api/v1';
const JwtToken = sessionStorage.getItem("token");

export const GetMyMatchs = async () =>
{
    let result;
    try {
        let response = await fetch(`${urlBase}/Match/me`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JwtToken}` 
            }
        })
    
        if(response.ok){
            result = await response.json();
        }
    } catch (error) {
        
    }
    
    //console.log(result)
    return result;
}

export const UserMatch = async (request) => {
    let result;
    let response = await fetch(`${urlBase}/UserMatch`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JwtToken}` 
        },
        body: JSON.stringify(request)
    })
    
    if(response){
        result = await response.json();
    }  

    return result;
}

export const UpdateMatch = async (request) => 
{
    let result;
    let response = await fetch(`${urlBase}/Match`, {
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

export const GetRanking = async (request) =>
{
    let result;
    let response = await fetch(`${urlBase}/Match/rank`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JwtToken}` 
        },
        body: JSON.stringify(request)
    })
    if(response.ok) {
        result = await response.json();
    }
    
    return result;
}