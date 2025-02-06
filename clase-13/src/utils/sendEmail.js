import nodemailer from "nodemailer";
import envsConfig from "../config/envs.config.js";

export const sendMail = async (email, subject, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: envsConfig.GMAIL_ACCOUNT,
      pass: envsConfig.GMAIL_PASS,
    },
  });
  // Configurar el envío del correo electrónico

  await transporter.sendMail({
    from: envsConfig.GMAIL_ACCOUNT,
    to: email,
    subject: subject,
    // text: message
    html: `<h1>Bienvenido ${name}</h1>
<div>
  <p>Este es un curso de Backend</p>
  <img src="cid:gatito" />
</div>`,
    attachments: [
      {
        filename: "gatito.jpg",
        path: "public/images/gatito.jpg",
        cid: "gatito",
      },
    ],
  });
};


export const sendTicketMail = async (email, ticket) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: envsConfig.GMAIL_ACCOUNT,
      pass: envsConfig.GMAIL_PASS,
    },
  });
  // Configurar el envío del correo electrónico
  await transporter.sendMail({
    from: envsConfig.GMAIL_ACCOUNT,
    to: email,
    subject: "Ticket de compra",
    // text: message
    html:  `<h1>Ticket de compra</h1>
    <div>
      <p>Total de compra: ${ticket.amount}</p>
      <p>Código: ${ticket.code}</p>
    </div>`,
  });
};

export const sendUserMail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: envsConfig.GMAIL_ACCOUNT,
      pass: envsConfig.GMAIL_PASS,
    },
  });
  // Configurar el envío del correo electrónico
  await transporter.sendMail({
    from: envsConfig.GMAIL_ACCOUNT,
    to: user.email,
    subject: "Bienvenido a e-commerce Coder",
    // text: message
    html:  `<h1>Bienvenido ${user.first_name}</h1>
<div>
  <p>Esta es tu nueva cuenta de usuario</p>
</div>`,
  });
};
