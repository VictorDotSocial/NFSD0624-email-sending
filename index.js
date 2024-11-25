require("dotenv").config();
const cors = require("cors");
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
  const { fromEmail, toEmail, subject, message } = req.body;

  console.log("Enviando email...");

  const sendEmail = async () => {
    try {
      // Configuración genérica de cualquier servidor SMTP
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Ej: smtp-mail.outlook.com
        port: process.env.SMTP_PORT, // Ej: 587
        secure: process.env.SMTP_SECURE, // true = SSL/TLS. false = STARTTLS
        auth: {
          user: process.env.SMTP_USER, // Ej: miuser@outlook.com
          pass: process.env.SMTP_PASS, // Ej: 1234
        },
      });

      // // Configuración para envío de emails desde GMAIL
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: process.env.SMTP_USER,
      //     pass: process.env.SMTP_PASS,
      //   },
      // });

      const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: message,
        html: `<h1>Esto es un email</h1><p>${message}</p><p><a href="https://nuclio.school">Enlace</a></p>`,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Email enviado", result);
    } catch (error) {
      console.error("Error al enviar email", error);
    }
  };

  sendEmail();

  res.status(200).send("Correo enviado correctamente");
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rulando en el puerto ${process.env.PORT}`);
});
