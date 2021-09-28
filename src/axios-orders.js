import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-92ca1-default-rtdb.firebaseio.com/'
});

export default instance;    