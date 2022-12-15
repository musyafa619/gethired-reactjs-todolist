import axiosInstance from "../configs/axios-inteceptor";

const TodoService = {
  getAll: async (activity_group_id) => {
    const response = await axiosInstance({
      url: `/todo-items`,
      method: "get",
      params: {
        activity_group_id,
      },
    });
    return response;
  },
  getOne: async (id) => {
    const response = await axiosInstance({
      url: `/todo-items/${id}`,
      method: "get",
    });
    return response;
  },
  create: async (data) => {
    const response = await axiosInstance({
      url: `/todo-items`,
      method: "post",
      data,
    });
    return response;
  },
  delete: async (id) => {
    const response = await axiosInstance({
      url: `/todo-items/${id}`,
      method: "delete",
    });
    return response;
  },
  update: async (id, data) => {
    const response = await axiosInstance({
      url: `/todo-items/${id}`,
      method: "patch",
      data,
    });
    return response;
  },
};

export default TodoService;
