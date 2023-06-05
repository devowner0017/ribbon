import axios from "axios";

export const sendDataToHubspot = (data) => {
    return new Promise((resolve, reject) => {
        axios.post("https://seashell-app-yyfz7.ondigitalocean.app/api/hubspot", data)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })

}
