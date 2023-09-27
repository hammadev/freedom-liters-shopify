import axios from 'axios';
import { wcBaseUrl } from './baseUrl';

const instance = axios.create({
    baseURL: wcBaseUrl,
    auth: {
        username: 'ck_ae7f070e39fd750babbc2f984108bc7c4b652dfd',
        password: 'cs_fbdbdd8957b99a79a0fbea2b0a45af0c28f071f4',
    },
});

export default instance;
