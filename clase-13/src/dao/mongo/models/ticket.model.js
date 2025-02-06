import mongoose from "mongoose";

const ticketCollection = "ticket";

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  purchase_datatime: { type: Date, default: Date.now() },
  amount: Number,
  purchase: String,
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
