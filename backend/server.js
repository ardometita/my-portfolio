require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Missing fields"
    });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});