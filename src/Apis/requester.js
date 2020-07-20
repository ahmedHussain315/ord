import axios from 'axios';

const username = 'react';
const password = 'urscrm@react';
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');


export default axios.create({
    baseURL : "https://urscrm.ordr.ae/api",
    headers: {'Authorization': `Basic ${token}`},
})