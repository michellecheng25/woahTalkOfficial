const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

//conenct to database
connectDB();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); //true vs false?
app.use(cors());

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/uploads", require("./routes/uploadRoute"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/profiles", require("./routes/profileRoute"));
app.use("/api/courses", require("./routes/courseRoute"));
app.use("/api/chat", require("./routes/conversationRoute"));
app.use("/api/search", require("./routes/searchRoute"));
app.use("/api/coursepage", require("./routes/coursePageRoute"));

//serve frontend
if (process.env.NODE_ENV === "production") {
  //set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../", "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
