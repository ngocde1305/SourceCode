import httpClient from "./http-common";

const getAll = (page, size) => {
    return httpClient.get(`/product/list/${page}/${size}`);
};

const create = (data) => {
    return httpClient.post("/employees", data);
};

const getById = (id) => {
    return httpClient.get(`/employees/${id}`);
};

const update = (data) => {
    return httpClient.put('/employees', data);
};

const remove = (id) => {
    return httpClient.post(`/delete/${id}`);
};

// assign to variable
const productService = {
  getAll, 
  create, 
  getById, 
  update, 
  remove
};

export default productService;