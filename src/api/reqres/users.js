import apiReqres from "./api";

export const fetchUsers = async (payload) => {
  try {
    const response = await apiReqres.get("users", {
      params: payload
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchUser = async (ID) => {
  try {
    const response = await apiReqres.get(`users/${ID}`);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const createUsers = async (payload) => {
  try {
    const response = await apiReqres.post("users", payload);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const updateUsers = async (payload) => {
  try {
    const response = await apiReqres.put(`users/${payload.id}`, payload.data);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteUsers = async (ID) => {
  try {
    const response = await apiReqres.delete(`users/${ID}`);

    return response.data;
  } catch (error) {
    return error.response;
  }
};