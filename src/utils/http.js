
import axios from "axios";
const http = axios.create({
    baseURL: "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http",
    timeout:10000
    
})

export default http;