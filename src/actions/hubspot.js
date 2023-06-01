import axios from "axios";

export const sendDataToHubspot =  (data) => {
    return new Promise((resolve, reject) => {
        axios.post("https://cors-anywhere.herokuapp.com/https://api.hubapi.com/crm/v3/objects/contacts", data, {
        headers: {
            'Authorization': `Bearer pat-na1-98019cb6-c7ec-4cc7-ae87-f912eee9d487`,
            'Content-Type': 'application/json'
        },
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err));
    })
    
}
