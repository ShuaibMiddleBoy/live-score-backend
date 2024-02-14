require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const colors = require("colors");
const path = require("path");
const { imagesRouter } = require("./routes/imagesRoute");
const { contactRouter } = require("./routes/contactRoute");
const { dbConnect } = require("./connection");
const { userRouter } = require("./routes/userRoute");
const { blogsRouter } = require("./routes/blogsRoute");
const { cookieRouter } = require("./routes/cookieRoute");
const { videoRouter } = require("./routes/videoRoute");
const { chatbotRouter } = require("./routes/chatbotRoutes");
const {commentRouter} = require("./routes/commentRoute")

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/video-uploads",
  express.static(path.join(__dirname, "video-uploads"))
);
app.use(cors());
app.use(cookieParser());

// DB Connection
dbConnect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB Connection Successfull".white.bgGreen);
  })
  .catch((e) => {
    console.log("No DB Connection".white.bgRed + e);
  });

// Routes
app.use("/images", imagesRouter);
app.use("/contact", contactRouter);
app.use("/users", userRouter);
app.use("/blogs", blogsRouter);
app.use("/cookies", cookieRouter);
app.use("/videos", videoRouter);
app.use("/chatbots", chatbotRouter);
app.use("/comments", commentRouter);

// Server Connection
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`.white.bgGreen);
});
