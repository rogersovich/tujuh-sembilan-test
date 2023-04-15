import axios from "axios";

const apiReqres = axios.create({
  baseURL: import.meta.env.VITE_API_REQRES,
});

apiReqres.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default apiReqres;
