import { userModel } from "../models/user.model.js";

const getAll = async () => {
  return await userModel.find();
};

const getOne = async (query) => {
  return await userModel.findOne(query);
};

const create = async (data) => {
  return await userModel.create(data);
};

const update = async (id, data) => {
  return await userModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
  return await userModel.findOneAndDelete(id);
};

export default { getAll, getOne, create, update, deleteOne };
