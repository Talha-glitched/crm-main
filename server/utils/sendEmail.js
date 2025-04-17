// utils/sendEmail.js
import nodemailer from "nodemailer";

export async function sendEmail(to, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",                     // this literal string
      pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
    },
  });

  return transporter.sendMail({
    from: process.env.SENDGRID_FROM_EMAIL,
    to,
    subject,
    html: htmlContent,
  });
}
