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