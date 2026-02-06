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


const safeHeaderValue = (v) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();

const BRAND_NAME = process.env.BRAND_NAME || "Mike White Tennis Academy";
const BRAND_SITE_URL = process.env.BRAND_SITE_URL || process.env.FRONTEND_ORIGIN || "";
const BRAND_LOGO_URL = process.env.BRAND_LOGO_URL || ""; // must be an absolute https:// URL to render in email clients
const BRAND_PRIMARY_COLOR = process.env.BRAND_PRIMARY_COLOR || "#3452a3";
const BRAND_ACCENT_COLOR = process.env.BRAND_ACCENT_COLOR || "#dfff4f";
const CONTACT_FROM_NAME = safeHeaderValue(process.env.CONTACT_FROM_NAME || `${BRAND_NAME} Contact`);

const renderContactEmail = ({ fullName, email, phone, subject, subjectLabel, message, receivedAt }) => {
  const preheader = `${subjectLabel} inquiry from ${fullName}`.slice(0, 140);

  const text = [
    `${BRAND_NAME} — New Contact Form Submission`,
    `Received: ${receivedAt.toISOString()}`,
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    `Subject: ${subjectLabel} (${subject})`,
    "",
    "Message:",
    String(message || ""),
    "",
    BRAND_SITE_URL ? `Website: ${BRAND_SITE_URL}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const logoHtml = BRAND_LOGO_URL
    ? `<img src="${escapeHtml(BRAND_LOGO_URL)}" width="140" alt="${escapeHtml(BRAND_NAME)}" style="display:block; max-width:140px; height:auto;" />`
    : `<div style="font-weight:950; font-size:18px; letter-spacing:-0.01em; color:#0f172a;">${escapeHtml(
        BRAND_NAME
      )}</div>`;

  const html = `
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f8fb; padding:24px 0; margin:0;">
    <tr>
      <td align="center" style="padding:0 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:600px;">
          <tr>
            <td style="padding:0 0 14px 0;">
              ${logoHtml}
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff; border:1px solid rgba(15,23,42,0.10); border-radius:16px; overflow:hidden;">
              <div style="height:6px; background:linear-gradient(135deg, ${escapeHtml(
                BRAND_ACCENT_COLOR
              )}, #c8e526);"></div>

              <div style="padding:22px 22px 10px 22px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
                <div style="font-size:20px; font-weight:950; letter-spacing:-0.02em; color:#0f172a;">
                  New contact form message
                </div>
                <div style="margin-top:6px; color:#475569; font-size:14px; line-height:1.6;">
                  Received ${escapeHtml(receivedAt.toLocaleString())}
                </div>

                <div style="margin-top:16px; border:1px solid rgba(15,23,42,0.08); border-radius:14px; padding:14px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px; color:#0f172a;">
                    <tr>
                      <td style="padding:6px 0; width:140px; color:#475569; font-weight:800;">Name</td>
                      <td style="padding:6px 0; font-weight:900;">${escapeHtml(fullName)}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0; width:140px; color:#475569; font-weight:800;">Email</td>
                      <td style="padding:6px 0;">
                        <a href="mailto:${escapeHtml(email)}" style="color:${escapeHtml(
                          BRAND_PRIMARY_COLOR
                        )}; text-decoration:none; font-weight:900;">${escapeHtml(email)}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0; width:140px; color:#475569; font-weight:800;">Phone</td>
                      <td style="padding:6px 0; font-weight:900;">${escapeHtml(phone || "(not provided)")}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0; width:140px; color:#475569; font-weight:800;">Subject</td>
                      <td style="padding:6px 0; font-weight:900;">${escapeHtml(subjectLabel)}</td>
                    </tr>
                  </table>
                </div>

                <div style="margin-top:16px; color:#475569; font-size:13px; font-weight:850;">Message</div>
                <div style="margin-top:8px; padding:14px; border-radius:14px; background:rgba(52,82,163,0.06); border:1px solid rgba(52,82,163,0.12);">
                  <div style="white-space:pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:13px; line-height:1.6; color:#0f172a;">${escapeHtml(
                    message
                  )}</div>
                </div>

                <div style="margin-top:16px; color:#64748b; font-size:12px; line-height:1.6;">
                  Tip: hit “Reply” to respond directly to ${escapeHtml(fullName)} (Reply-To is set automatically).
                </div>
              </div>

              <div style="padding:12px 22px 18px 22px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color:#94a3b8; font-size:12px; line-height:1.6;">
                ${BRAND_SITE_URL ? `Sent from <a href="${escapeHtml(BRAND_SITE_URL)}" style="color:${escapeHtml(
                  BRAND_PRIMARY_COLOR
                )}; text-decoration:none;">${escapeHtml(BRAND_SITE_URL)}</a>` : "Sent from the website contact form"}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 0 0 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color:#94a3b8; font-size:12px; text-align:center;">
              © ${new Date().getFullYear()} ${escapeHtml(BRAND_NAME)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `.trim();

  return { text, html, preheader };
};


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

    const receivedAt = new Date();
    const { text, html } = renderContactEmail({
      fullName,
      email,
      phone,
      subject,
      subjectLabel,
      message,
      receivedAt,
    });

    await transport.sendMail({
      to,
      from: `${CONTACT_FROM_NAME} <${from}>`,
      replyTo: { name: fullName, address: email },
      subject: `[MWTA] ${subjectLabel} — ${fullName}`,
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
