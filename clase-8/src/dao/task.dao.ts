import { Task } from "../interfaces/task";
import { UpdateTask } from "../interfaces/uptateTaks";
import { taskModel } from "../models/task.model";

const getAll = async () => {
  return await taskModel.find();
};
const getOne = async (query: UpdateTask) => {
  return await taskModel.findOne(query);
};
const create = async (data: { task: string} ) => {
  return await taskModel.create(data);
};
const update = async (id: string, data: UpdateTask) => {
  return await taskModel.findByIdAndUpdate(id, data, { new: true });
};
const remove = async (id: string) => {
  return await taskModel.findByIdAndDelete(id);
};

export default { getAll, getOne, create, update, remove };
