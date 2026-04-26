const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,      // ← renamed from USER
    pass: process.env.APP_PASSWORD,
  },
});

// ✅ Replace your old sendMail function with this
const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Deliveroo Food" <${process.env.EMAIL_USER}>`,  // ← renamed
      to,
      subject,
      html
    });
    console.log("📧 Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    console.error("❌ Full error:", JSON.stringify(error));
  }
};

module.exports = sendMail;////