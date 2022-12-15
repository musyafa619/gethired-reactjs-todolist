import axiosInstance from "../configs/axios-inteceptor";

const ActivityService = {
  getAll: async (email) => {
    const response = await axiosInstance({
      url: `/activity-groups`,
      method: "get",
      params: { email },
    });
    return response;
  },
  getOne: async (id) => {
    const response = await axiosInstance({
      url: `/activity-groups/${id}`,
      method: "get",
    });
    return response;
  },
  create: async (data) => {
    const response = await axiosInstance({
      url: `/activity-groups`,
      method: "post",
      data,
    });
    return response;
  },
  delete: async (id) => {
    const response = await axiosInstance({
      url: `/activity-groups/${id}`,
      method: "delete",
    });
    return response;
  },
  update: async (id, data) => {
    const response = await axiosInstance({
      url: `/activity-groups/${id}`,
      method: "patch",
      data,
    });
    return response;
  },
};

export default ActivityService;
