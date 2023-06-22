import axios from "axios";
import { SERVER_URL } from "./config";
import { convertDraftToHtmlType } from "./convert";

export const sendDataToHubspot = async (id, data) => {
    if(data.latest_draft) {
        data.latest_draft = await convertDraftToHtmlType(data.latest_draft);
    }
    return new Promise((resolve, reject) => {
        axios.post(`${SERVER_URL}/api/hubspot/${id}`,data)
            .then(res => resolve(res.data))
            .catch(err => {
                console.log(err)
                reject(err.response.data.body.message)
            });
    })
}
