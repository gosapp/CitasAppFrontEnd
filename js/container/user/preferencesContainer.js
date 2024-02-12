import { GetPreference, PutPreference, PostPreference } from "../../services/fetchPreferenceServices.js";
import { DeleteSuggestion } from "../../services/fetchSuggestionServices.js";


export async function ModPreference(own, id, value) {

    let request;

    request = {
        interestId: id,
        ownInterest: value,
        like: value
    }

    let response = await PutPreference(request);

    if (response && response.response && !own) {
        await DeleteSuggestion(0);
    }

    return response;
}


export async function CreatePreference(own, id) {

    let request;

    request = {
        interestId: id,
        ownInterest: true,
        like: true
    }

    let response = await PostPreference(request);

    if (response && response.response && !own){
        await DeleteSuggestion(0);
    }

    return response;
}


export const ShowMyInterest = async () =>
{
    let response = await GetPreference();

    response.forEach((item) => {
        if(item.ownInterest) {
            let intId = "#my_int_" + item.interest.id;
            let interestContainer = document.querySelector(intId);
            interestContainer.classList.add('interest_item_sel');
        }
    })
}


export const ShowOtherInterest = async () =>
{
    let response = await GetPreference();

    response.forEach((item) => {
        if(item.like) {

            let intOtherId = "#other_int_" + item.interest.id;
            let interestOtherContainer = document.querySelector(intOtherId);
            interestOtherContainer.classList.add('interest_item_sel_other');
        }
    })
}


export async function InterestOnClick(e) 
{
    let intIdString = this.id;
    let idx = intIdString.lastIndexOf("_") + 1;
    let intId = intIdString.slice(idx, intIdString.length);
    let sendId = parseInt(intId);


    if(this.classList.contains('interest_item_sel'))
    {
        this.classList.remove('interest_item_sel');
        
        await ModPreference(true, sendId, false);
        await ModPreference(false, sendId, false);
    }
    else
    {
        this.classList.add('interest_item_sel');
        let response = await ModPreference(true, sendId, true);
        let response2 = await ModPreference(false, sendId, true);

        if( response == null || response2 == null ) {
            CreatePreference(true, sendId);
        }
    }
}

