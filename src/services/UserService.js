import axios from "./handle-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`).then((data) => {
    return data;
  });
};

export { fetchAllUser };
