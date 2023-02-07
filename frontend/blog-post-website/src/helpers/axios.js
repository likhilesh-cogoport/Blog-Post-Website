import axios from "axios"

const axiosInstance1 = axios.create({
    baseURL: "http://172.25.26.224:3000/"
})

export {axiosInstance1};