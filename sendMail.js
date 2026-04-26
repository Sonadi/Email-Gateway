const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

// ✅ Send mail function
const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Deliveroo Food" <${process.env.USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", info.messageId);

  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

module.exports = sendMail;