import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-practice-01.firebaseio.com/'
});

export default instance