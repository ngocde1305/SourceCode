import axios from "axios";

//for REST only


export default axios.create({
    baseURL: 'http://localhost:8093/api',
    headers: {
        'Content-Type': 'application/json'
    }
});
