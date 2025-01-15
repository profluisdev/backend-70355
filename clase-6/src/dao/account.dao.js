import { accountModel } from "../models/account.model.js";

const getAll = async () => {
  return await accountModel.find();
};

const getOne = async (query) => {
  return await accountModel.findOne(query);
};

const create = async (data) => {
  return await accountModel.create(data);
};

const update = async (id, data) => {
  return await accountModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
  return await accountModel.findOneAndDelete(id);
};

export default { getAll, getOne, create, update, deleteOne };
