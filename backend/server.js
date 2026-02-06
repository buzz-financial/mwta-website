const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const isProduction = process.env.NODE_ENV === "production";

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "base-uri": ["'self'"],
        "object-src": ["'none'"],

        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
        "font-src": ["'self'", "data:", "https:"],
        "connect-src": ["'self'", "https:"],

        "frame-src": [
          "'self'",
          "https://www.google.com",
          "https://maps.google.com",
          "https://booky.buzz",
        ],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(morgan("combined"));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const allowed = [
        process.env.FRONTEND_ORIGIN,
        process.env.NODE_ENV === "production" ? undefined : "http://localhost:5173",
        process.env.NODE_ENV === "production" ? undefined : "http://127.0.0.1:5173",
      ].filter(Boolean);

      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend build (production)
const frontendDistPath = path.resolve(__dirname, "../frontend/dist");
if (isProduction) {
  app.use(express.static(frontendDistPath));
}

const contactSubjectLabel = (subject) => {
  const labels = {
    lessons: "Tennis Lessons",
    camps: "Tennis Camps",
    private: "Private Coaching",
    clinics: "Group Clinics",
    membership: "Membership Info",
    other: "Other",
  };
  return labels[subject] || subject || "Contact Form";
};

const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  // Basic sanity check (not full RFC compliance).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");


const contactRateLimit = new Map();
const CONTACT_WINDOW_MS = Number(process.env.CONTACT_RATE_WINDOW_MS || 60 * 60 * 1000); // 1 hour
const CONTACT_MAX_PER_WINDOW = Number(process.env.CONTACT_RATE_MAX || 10);

const checkContactRateLimit = (ip) => {
  const now = Date.now();
  const record = contactRateLimit.get(ip);
  if (!record || now - record.windowStart > CONTACT_WINDOW_MS) {
    contactRateLimit.set(ip, { windowStart: now, count: 1 });
    return { allowed: true, remaining: CONTACT_MAX_PER_WINDOW - 1 };
  }

  if (record.count >= CONTACT_MAX_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: CONTACT_MAX_PER_WINDOW - record.count };
};

const createMailTransport = async () => {
  // Prefer a single SMTP URL if provided
  if (process.env.SMTP_URL) {
    const transport = nodemailer.createTransport(process.env.SMTP_URL);
    await transport.verify();
    return transport;
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP config. Set SMTP_URL or SMTP_HOST/SMTP_USER/SMTP_PASS (and optionally SMTP_PORT/SMTP_SECURE)."
    );
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transport.verify();
  return transport;
};


// Contact form route (sends email)
app.post("/api/contact", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() || req.ip;
  const limit = checkContactRateLimit(ip);
  if (!limit.allowed) {
    return res.status(429).json({
      error: "Too many messages sent from this network. Please try again later.",
    });
  }

  const { firstName, lastName, email, phone, subject, message } = req.body || {};

  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({
      error: "Missing required fields.",
      required: ["firstName", "lastName", "email", "subject", "message"],
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  if (String(message).length > 5000) {
    return res.status(400).json({ error: "Message is too long." });
  }

  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || process.env.SMTP_USER;
  if (!to) {
    return res.status(500).json({ error: "Server email recipient not configured (CONTACT_TO)." });
  }
  if (!from) {
    return res.status(500).json({ error: "Server email sender not configured (CONTACT_FROM/SMTP_USER)." });
  }

  try {
    const transport = await createMailTransport();
    const fullName = `${String(firstName).trim()} ${String(lastName).trim()}`.trim();
    const subjectLabel = contactSubjectLabel(subject);

    const text = [
      `New contact form submission`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : `Phone: (not provided)`,
      `Subject: ${subjectLabel} (${subject})`,
      "",
      String(message),
    ].join("\n");

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "(not provided)")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)} (${escapeHtml(subject)})</p>
      <hr />
      <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(
        message
      )}</pre>
    `.trim();

    await transport.sendMail({
      to,
      from,
      replyTo: email,
      subject: `[MWTA Contact] ${subjectLabel} - ${fullName}`,
      text,
      html,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Failed to send message." });
  }
});




// API 404 handler (must come before the frontend catch-all)
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Frontend catch-all (production)
if (isProduction) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  // Non-production fallback
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🎾 MWTA Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
