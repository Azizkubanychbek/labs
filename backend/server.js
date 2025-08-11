import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
const allowedOrigins = [
  'http://localhost:5173', // для разработки
  'https://localhost:5173',
  process.env.FRONTEND_URL // для продакшена
].filter(Boolean);

app.use(cors({ 
  origin: function (origin, callback) {
    // разрешаем запросы без origin (например, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Gmail + 587 = false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/contact route
app.post("/api/contact", async (req, res) => {
  const { fullName, email, company, projectDetails } = req.body;

  console.log("📩 Form data received:", req.body);

  // Формируем письмо
  const mailOptions = {
    from: `"Website Contact Form" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: `New message from ${fullName}`,
    text: `
Full Name: ${fullName}
Email: ${email}
Company: ${company || "Not provided"}
Project Details:
${projectDetails}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Error sending email", error });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT || 3001}`);
  console.log(`📧 Email will be sent to: ${process.env.EMAIL_TO}`);
  console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN || "*"}`);
});
