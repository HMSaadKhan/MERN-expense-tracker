import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: process.env.mailService,
  auth: {
    user: process.env.mailAddress,
    pass: process.env.mailPassword,
  },
});
