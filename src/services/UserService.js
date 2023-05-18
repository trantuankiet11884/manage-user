import axios from "./handle-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`).then((data) => {
    return data;
  });
};

const createUser = (name, job, email) => {
  return axios.post("/api/users", { name, job, email });
};

const updateUser = (name, job) => {
  return axios.put("/api/users/2", { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};
export { fetchAllUser, createUser, updateUser, deleteUser };
