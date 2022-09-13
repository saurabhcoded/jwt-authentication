const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

//middlewares
require("dotenv").config();
const PORT = process.env.PORT || 5000;

require("./DB/db");
app.use(express.json());

// Routes
app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);

//start server
app.listen(PORT, () => {
  console.log("🌐 jwt server is running on port " + PORT);
});
