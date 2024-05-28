import axios from "axios";
export default axios.create({
    baseURL: "http://192.168.1.6:3001",
    headers: {
        "Content-type": "application/json"
    }
})