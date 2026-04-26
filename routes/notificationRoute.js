const express = require("express");
const router = express.Router();
const sendMail = require("../sendMail");

// 📦 Order Placed
router.post("/order-placed", async (req, res) => {
  try {
    const { customerEmail } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ message: "customerEmail is required" });
    }

    // ✅ Respond immediately (avoid 502 timeout)
    res.status(200).json({ message: "Order email request received" });

    // ✅ Send email in background (non-blocking)
    sendMail(
      customerEmail,
      "Order Confirmation - Deliveroo",
      "<h2>Your order has been placed successfully!</h2>"
    );

  } catch (error) {
    console.error("❌ Order email error:", error);
  }
});

// 💳 Payment Successful
router.post("/payment-success", async (req, res) => {
  try {
    const { customerEmail } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ message: "customerEmail is required" });
    }

    res.status(200).json({ message: "Payment email request received" });

    sendMail(
      customerEmail,
      "Payment Successful - Deliveroo",
      "<h2>Your payment was successful. Thank you!</h2>"
    );

  } catch (error) {
    console.error("❌ Payment email error:", error);
  }
});

// ✅ Order Approved
router.post("/order-approved", async (req, res) => {
  try {
    const { customerEmail, deliveryEmail } = req.body;

    if (!customerEmail || !deliveryEmail) {
      return res.status(400).json({
        message: "customerEmail and deliveryEmail are required"
      });
    }

    res.status(200).json({ message: "Order approval emails triggered" });

    // Send emails in background
    sendMail(
      customerEmail,
      "Order Approved - Deliveroo",
      "<h2>Your order is approved and being prepared!</h2>"
    );

    sendMail(
      deliveryEmail,
      "New Delivery Assigned - Deliveroo",
      "<h2>A new order has been assigned to you.</h2>"
    );

  } catch (error) {
    console.error("❌ Approval email error:", error);
  }
});

module.exports = router;