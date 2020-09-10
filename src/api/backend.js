import axios from 'axios';

export default axios.create({
    mode: "cors",
    baseURL: 'http://localhost:5001/hackernewsclone-bc4a1/us-central1/api',
    //baseURL: 'localhost:5001',
    // headers: {
    //     Authorization: ''
    // }
});
