import { ticketDao } from "../dao/mongo/ticket.dao.js";
import { sendTicketMail } from "../utils/sendEmail.js";

class TicketService{
  async create(amount, purchase){
      const code = Math.random().toString(36).substr(2, 5);

      const ticket = await ticketDao.create({
        code,
        amount,
        purchase
      })
      await sendTicketMail(purchase, ticket);
      return ticket;
  }
}

export const ticketService = new TicketService();