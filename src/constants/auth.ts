import { AxiosBasicCredentials, CreateAxiosDefaults } from 'axios';

type AxiosConfigTypes = CreateAxiosDefaults & {
  auth: AxiosBasicCredentials;
};

const AXIOS_CONFIG: AxiosConfigTypes = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5 * 60 * 1000,
  auth: {
    username: process.env.NEXT_PUBLIC_USER_AUTHENTICATION || '',
    password: process.env.NEXT_PUBLIC_PASSWORD_AUTHENTICATION || '',
  },
} as const;

export { AXIOS_CONFIG };
