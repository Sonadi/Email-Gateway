// sendMail.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// Setup transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

// Generic sendMail function
const sendMail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: {
        name: 'Deliveroo Food',
        address: process.env.USER,
      },
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendMail;
