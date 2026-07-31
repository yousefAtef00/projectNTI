import nodemailer from "nodemailer";
import "dotenv/config";
import { emailTemplate } from "../utilities/emailTemplate.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function mailConfirmation(mail) {
  try {
    const info = await transporter.sendMail({
      from: `"NTIG5" <${process.env.EMAIL_USER}>`,
      to: mail,
      subject: "Hello",
      text: "Hello world?",
      html: emailTemplate(mail)
    });

    console.log("Message sent:", info.messageId);

  } catch (error) {
    console.log("Error to send email:", error.message);
  }
}