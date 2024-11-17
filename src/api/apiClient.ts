import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

let showErrorPopup: (status: number | null, message: string) => void = () => {};

export const setErrorPopupHandler = (
  handler: (status: number | null, mmessage: string) => void,
) => {
  showErrorPopup = handler;
};

const apiClient = axios.create({
  baseURL: 'https://recruitment-test.flip.id',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = '';
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response.status;
      const message = error.response.statusText || `Error ${statusCode}`;

      if (statusCode === 401) {
        showErrorPopup(statusCode, 'Unauthorized access. Please log in.');
      } else if (statusCode === 404) {
        showErrorPopup(statusCode, 'Requested resource not found.');
      } else if (statusCode === 500) {
        showErrorPopup(
          statusCode,
          'Internal server error. Please try again later.',
        );
      } else {
        showErrorPopup(statusCode, message);
      }
    } else {
      showErrorPopup(
        null,
        'Network error. Please check your internet connection.',
      );
    }

    return Promise.reject(error);
  },
);

export default apiClient;
