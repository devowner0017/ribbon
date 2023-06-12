import axios from 'axios';
import { SERVER_URL } from './config';

export const save_data = (data) => {
    axios.post(`${SERVER_URL}/api/journey`, data)
    .then( res => {
        console.log(res.data)
    })
    .catch( err => {
        console.log(err)
    })
}