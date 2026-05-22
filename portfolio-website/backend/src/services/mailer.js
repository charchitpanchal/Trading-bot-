import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

export async function sendContactEmail({ name, email, message }) {
  const transport = getTransporter();
  if (!transport) {
    console.warn("Email not configured — skipping send");
    return { sent: false };
  }
  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  await transport.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>${name}</strong> &lt;${email}&gt;</p><p>${message.replace(/\n/g, "<br>")}</p>`,
  });
  return { sent: true };
}
