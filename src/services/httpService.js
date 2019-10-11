import axios from "axios";
import { toast } from "react-toastify";

// axios.defaults.baseURL = "http://localhost:3900/api/";
axios.defaults.baseURL = "https://lighthouserosterbackend.herokuapp.com/api";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // logger.init(error);
    toast.error(error.message);
    console.log(error);
  }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
