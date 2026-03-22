const express = require('express');
const router = express.Router();
const sendMail = require('../sendMail');

// 📦 Order Placed
router.post('/order-placed', async (req, res) => {
  const { customerEmail } = req.body;
  await sendMail(
    customerEmail,
    "Order Confirmation - Deliveroo",
    "<h2>Your order has been placed successfully!</h2>"
  );
  res.status(200).json({ message: "Order confirmation email sent." });
});

// 💳 Payment Successful
router.post('/payment-success', async (req, res) => {
  const { customerEmail } = req.body;
  await sendMail(
    customerEmail,
    "Payment Successful - Deliveroo",
    "<h2>Your payment was successful. Thank you!</h2>"
  );
  res.status(200).json({ message: "Payment confirmation email sent." });
});

// ✅ Order Approved
router.post('/order-approved', async (req, res) => {
  const { customerEmail, deliveryEmail } = req.body;

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

  res.status(200).json({ message: "Order approval notifications sent." });
});

module.exports = router;
//USE