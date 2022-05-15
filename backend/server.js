const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//conenct to database
connectDB();

const PORT = process.env.PORT || 8000;

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

let users = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (userId) => {
    console.log(userId, socket.id);
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId: socket.id });
    console.log(users);
  });

  socket.on("sendMessage", ({ senderId, recieverId, text }) => {
    const user = users.find((user) => user.userId === recieverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else console.log("user isnt online");
  });

  socket.on("disconnect", () => {
    console.log("a user has disconnected!");
    users = users.filter((user) => user.socketId !== socket.id);
    console.log(users);
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
