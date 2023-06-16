import axios from "axios";
import { SERVER_URL } from "./config";

export default function generateAnswer(question, draftId) {
    return new Promise((resolve, reject) => {
         axios.post(`${SERVER_URL}/api/chatgpt?draftId=${draftId}`, {"question": question}).then( res => {
            resolve(res.data)
        }).catch((error) => {
            console.log(error.data);
            reject(error)
        })
    })
}