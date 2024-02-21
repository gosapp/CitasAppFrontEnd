import { GetRanking } from "../services/fetchMatchServices.js";
import { ListUsers } from "../services/fetchUserServices.js";

const RenderPage = async () =>{
    let result = await GetRanking();
    let ranking = result.response;
    let users = [];

    ranking.forEach(element => {
        users.push(element.userId);
    });
    
    let usersInfo = await ListUsers(users);
    console.log(usersInfo);
}

window.onload = RenderPage;