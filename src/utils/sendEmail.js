import nodemailer from "nodemailer";

async function sendEmail({to=[],cc,bcc,subject,text,link,html,attachments=[]}) {

  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Up Vote" <foo@example.com>', // sender address
    to, // list of receivers
    cc,
    bcc,
    subject, // Subject line
    text, // plain text body
    html, // html body
    attachments,
  });

  return info.rejected.length?false:true
}

export default sendEmail;