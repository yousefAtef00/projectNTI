

import nodemailer from "nodemailer"
import { emailTemplate } from "../utilities/emailTemplate.js";

// Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
  
  service: "gmail",
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
  ,
  tls:{
    rejectUnauthorized:false
  }
});

export async function mailConfirmation(mail){

  
  const info = await transporter.sendMail({
    from: '"NTIG5" <ahmed.abdelmawgood200@gmail.com>', 
    to: mail, 
    subject: "Hello", 
    text: "Hello world?", 
    html: emailTemplate(mail), 
  });

  console.log("Message sent: %s", info.messageId);
  

}
