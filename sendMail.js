const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Deliveroo Food <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Email sending failed:", error);
      return;
    }

    console.log("📧 Email sent:", data.id);
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
  }
};

module.exports = sendMail;