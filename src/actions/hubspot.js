import axios from "axios";
import { SERVER_URL } from "./config";

export const sendDataToHubspot = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${SERVER_URL}/api/hubspot`,data)
            .then(res => resolve(res.data))
            .catch(err => {
                console.log(err)
                reject(err.response.data.body.message)
            });
    })
}
