const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

//conenct to database
connectDB();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/profiles", require("./routes/profileRoute"));
app.use("/api/courses", require("./routes/courseRoute"));
app.use("/api/assignments", require("./routes/assignmentRoute"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
