const express = require("express");
const router = express.Router();
const sendMail = require("../sendMail");

// 📦 Order Placed
router.post("/order-placed", async (req, res) => {
  try {
    const { customerEmail } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ success: false, message: "customerEmail is required" });
    }

    await sendMail(
      customerEmail,
      "Order Confirmation - Deliveroo",
      "<h2>Your order has been placed successfully!</h2>"
    );

    console.log("✅ Order email sent to:", customerEmail);

    res.status(200).json({
      success: true,
      message: "Order confirmation email sent."
    });

  } catch (error) {
    console.error("❌ Error sending order email:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send order confirmation email"
    });
  }
});


// 💳 Payment Successful
router.post("/payment-success", async (req, res) => {
  try {
    const { customerEmail } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ success: false, message: "customerEmail is required" });
    }

    await sendMail(
      customerEmail,
      "Payment Successful - Deliveroo",
      "<h2>Your payment was successful. Thank you!</h2>"
    );

    console.log("✅ Payment email sent to:", customerEmail);

    res.status(200).json({
      success: true,
      message: "Payment confirmation email sent."
    });

  } catch (error) {
    console.error("❌ Error sending payment email:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send payment confirmation email"
    });
  }
});


// ✅ Order Approved
router.post("/order-approved", async (req, res) => {
  try {
    const { customerEmail, deliveryEmail } = req.body;

    if (!customerEmail || !deliveryEmail) {
      return res.status(400).json({
        success: false,
        message: "customerEmail and deliveryEmail are required"
      });
    }

    // Notify customer
    await sendMail(
      customerEmail,
      "Order Approved - Deliveroo",
      "<h2>Your order is approved and being prepared!</h2>"
    );

    // Notify delivery personnel
    await sendMail(
      deliveryEmail,
      "New Delivery Assigned - Deliveroo",
      "<h2>A new order has been assigned to you. Check your app.</h2>"
    );

    console.log("✅ Order approved emails sent");

    res.status(200).json({
      success: true,
      message: "Order approval notifications sent."
    });

  } catch (error) {
    console.error("❌ Error sending approval emails:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send order approval emails"
    });
  }
});

module.exports = router;