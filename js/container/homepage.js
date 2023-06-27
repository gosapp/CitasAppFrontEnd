import { GetMySuggestions } from "../services/fetchSuggestionServices.js";
import { UserMatch } from "../services/fetchMatchServices.js";
import { CarouselIndicators } from "../components/carousel-indicators.js";
import { CarouselInner } from "../components/carousel-inner.js";
import { ButtonsLike } from "../components/button-like.js";
import { SuggestionData } from "../components/suggestion-data.js";

let suggestions = await GetMySuggestions();

let carouselIndicators = document.getElementById('carousel-indicators');
let carouselInner = document.getElementById('carousel-inner');
let containerLike = document.getElementById('container-like');
let containerData = document.getElementById('container-data');
let suggestionData = document.getElementById('suggestions-data');
let emptySuggestions = document.getElementById('empty-suggestions');

if(suggestions && suggestions.suggestedUsers != undefined){    
    renderSuggestion();
}
else{
    hiddenSuggestions();
}

function renderSuggestion(){    
    let firstSuggestion = suggestions.suggestedUsers.pop();
    //console.log(firstSuggestion);

    if(firstSuggestion != undefined){
        let preferences = getPreferences(firstSuggestion.ourPreferences);
        let dateFormatted = getDate(firstSuggestion.birthday);
        let difference = age(dateFormatted);

        renderPhotos(firstSuggestion.images, firstSuggestion.userId);
        renderData(firstSuggestion.name, firstSuggestion.lastName, difference, firstSuggestion.gender.description, firstSuggestion.location, preferences);
    }
    else{
        hiddenSuggestions();    
    }    
}

function renderData(name, lastName, age, gender, location, preferences){
    let fullName = name + ' ' + lastName;
    let edad = age + ' años';
    suggestionData.innerHTML = SuggestionData(fullName, edad, gender, location, preferences);
}

function renderPhotos(images, userId){
    let indicators = '';
    let inner = '';
    if (images.length > 0){        
        for (let index = 0; index < images.length; index++) {
            indicators += CarouselIndicators(index);
            inner += CarouselInner(images[index].url, index);
        }
        inner += ButtonsLike(userId);        
    } 
    else{
        inner = CarouselInner('../img/user-default.png', 0);
        indicators += CarouselIndicators(0);
        inner += ButtonsLike(userId);        
    }
    //inner += `<img class="like-animation-show" id="like" src="../img/corazones.png" alt="Botón Like">`
    carouselIndicators.innerHTML = indicators;
    carouselInner.innerHTML = inner;
        
    buttonsChoice(document.querySelectorAll(".choice-button"));
}

function getDate(dateString) {
     var dateParts = dateString.split('T');
     var dateStr = dateParts[0].split('-');
     return new Date(dateStr[0], dateStr[1]-1, dateStr[2]);
}

function age(birthdate) {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() - 
               (today.getMonth() < birthdate.getMonth() || 
               (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age;
}

function getPreferences(ourPreferences){
    let interests = ''
    if(ourPreferences != undefined && ourPreferences.ownCategoryPreferences.length > 0){
        ourPreferences.ownCategoryPreferences.forEach(category => {
            category.interestPreferencesId.forEach(preference => {
                interests += preference.interest.description + ', '; 
            });
        });
    }
    return interests.substring(0, interests.length-2);
}

function hiddenSuggestions(){
    containerLike.style.display = "none";        
    containerData.style.display = "none";        
    emptySuggestions.style.display = "flex";  
}

function buttonsChoice(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            likeDislike(element.classList[1], element.id);
        })
    });
}

async function likeDislike(action, userId){
    let likeAnimation = document.getElementById('like-img');
    let dislikeAnimation = document.getElementById('dislike-img');
    let likeOption = false;

    switch (action) {
        case 'btnLike':
            likeAnimation.classList.add("show-animation");
            likeOption = true;
            break;
        case 'btnDislike':
            dislikeAnimation.classList.add("show-animation");
            break;    
        default:
            break;
    }   
    
    let userLike = {
        user2: userId,
        like: likeOption
    }
    let response = await UserMatch(userLike);
    console.log(response);

    if (response.response && response.response.isMatch){
        alert("Tenes un match!!!");
    }
    setTimeout(() => {
        renderSuggestion();                
    }, 2000);
}
