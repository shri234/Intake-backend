const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { type, formData } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail", // or 'smtp.example.com' for a custom host
      auth: {
        // 🛑 THESE ARE THE MISSING CREDENTIALS 🛑
        user: "sriramm0406@gmail.com", // e.g., 'contact@intake.com'
        pass: "unkq kjia wvuc yypa",
      },
    });

    await transporter.sendMail({
      from: `"Website Form" sriramm0406@gmail.com`,
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
