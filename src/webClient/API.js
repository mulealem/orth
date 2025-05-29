import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    const pagination = response.headers["x-pagination"];
    if (pagination) {
      response.pagination = JSON.parse(pagination);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use(function (config) {
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  return config;
});

export default {
  axiosClient,
};
