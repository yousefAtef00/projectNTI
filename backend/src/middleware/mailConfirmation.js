

import nodemailer from "nodemailer"
import { emailTemplate } from "../utilities/emailTemplate.js";

// Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
  
  service: "gmail",
  auth: {
    user: "ahmed.abdelmawgood200@gmail.com",
    pass: "mlyw whgt zfwk mdsi",
  },
  tls:{
    rejectUnauthorized:false
  }
});

export async function mailConfirmation(mail){

  
  const info = await transporter.sendMail({
    from: '"NTIG5" <ahmed.abdelmawgood200@gmail.com>', // sender address
    to: mail, // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: emailTemplate(mail), // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account

}
