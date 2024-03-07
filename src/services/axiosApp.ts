import axios from 'axios';

import { AXIOS_CONFIG } from '@/constants/auth';

const axiosApp = axios.create(AXIOS_CONFIG);

export default axiosApp;
