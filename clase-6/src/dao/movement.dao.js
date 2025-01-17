import { movementModel } from "../models/movement.model.js";

const getAll = async (query) => {
  return await movementModel.find(query);
};

const getOne = async (query) => {
  return await movementModel.findOne(query);
};

const create = async (data) => {
  return await movementModel.create(data);
};

const update = async (id, data) => {
  return await movementModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
  return await movementModel.findOneAndDelete(id);
};

export default { getAll, getOne, create, update, deleteOne };
