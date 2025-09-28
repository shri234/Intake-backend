const express = require("express");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// SendGrid transport
const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

app.post("/send-email", async (req, res) => {
  try {
    const { type, formData } = req.body;

    await transporter.sendMail({
      from: "no-reply@intakefoods.com",
      to: "hello@intakefoods.com",
      subject: `New ${
        type === "contact" ? "Corporate" : "Vendor"
      } Collaboration`,
      html: `
        <h2>${
          type === "contact"
            ? "Corporate Collaboration"
            : "Vendor Collaboration"
        }</h2>
        <pre>${JSON.stringify(formData, null, 2)}</pre>
      `,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
