import axios from "axios";

export const sendDataToHubspot = (data) => {
    return new Promise((resolve, reject) => {
        axios.post("https://ribbon-app-gfoo7.ondigitalocean.app/api/hubspot", data)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    })

}
