import axios from "axios";

export const api = axios.create({
    baseURL: 'https://trainee.fidelis.workers.dev/api',
    headers:{
        'Authorization': 'Bearer 812d2f7b-ec6e-416a-be91-cc87f7b364c1',
        'Content-Type': 'application/json',
    },
});