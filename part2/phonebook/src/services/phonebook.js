import axios from "axios";

const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  try {
    const request = axios.post(baseUrl, newObject);
    const response = await request;
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error); // re-throw so the caller can handle it
  }
};

const remove = async (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = async (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data);
};

export default { getAll, create, remove, update };
