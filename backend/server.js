// backend/server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://your-domain.com" : "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Mike White Tennis Academy API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Staff routes
app.get("/api/staff", (req, res) => {
  const staff = [
    {
      id: 1,
      name: "Mike White",
      title: "Head Pro & Owner",
      image: "mikeportrait.png",
      email: "mike@mwtennis.com",
      phone: "(801) 735-9434",
      yearsExperience: 15,
      mainCertification: "USPTA Certified Professional",
      keySpecialties: ["Junior Development", "Competitive Training", "Match Strategy"],
      active: true,
    },
    {
      id: 2,
      name: "Becca Little",
      title: "Assistant Coach",
      image: "beccaportrait.png",
      email: "becca@mwtennis.com",
      phone: "(801) 735-9435",
      yearsExperience: 8,
      mainCertification: "USPTA Certified Professional",
      keySpecialties: ["Beginner Instruction", "Youth Programs", "Group Clinics"],
      active: true,
    },
    {
      id: 3,
      name: "",
      title: "",
      image: "",
      email: "",
      phone: "",
      yearsExperience: 0,
      mainCertification: "",
      keySpecialties: [],
      active: false,
    },
    {
      id: 4,
      name: "",
      title: "",
      image: "",
      email: "",
      phone: "",
      yearsExperience: 0,
      mainCertification: "",
      keySpecialties: [],
      active: false,
    },
  ];

  res.json(staff);
});

// Programs routes
app.get("/api/programs", (req, res) => {
  const programs = [
    {
      id: 1,
      name: "Junior Clinics (K-12)",
      description: "Age-grouped training focused on fundamentals and competitive development.",
      ageGroup: "K-12",
      price: 120,
      maxParticipants: 8,
      currentParticipants: 5,
      schedule: "Weekdays 4:00 PM - 5:30 PM",
      active: true,
    },
    {
      id: 2,
      name: "Adult Clinics",
      description: "Drills & match play for beginners through advanced adults.",
      ageGroup: "18+",
      price: 150,
      maxParticipants: 6,
      currentParticipants: 4,
      schedule: "Evenings & Weekends",
      active: true,
    },
    {
      id: 3,
      name: "Private Lessons",
      description: "One-on-one coaching to fine-tune technique and strategy.",
      ageGroup: "All Ages",
      price: 75,
      maxParticipants: 1,
      currentParticipants: 0,
      schedule: "By Appointment",
      active: true,
    },
    {
      id: 4,
      name: "Tournaments",
      description: "Multi-day competitive tournaments for all skill levels.",
      ageGroup: "All Ages",
      price: 50,
      maxParticipants: 32,
      currentParticipants: 12,
      schedule: "Monthly Events",
      active: true,
    },
  ];

  res.json(programs);
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "MWTA API" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🎾 MWTA Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
