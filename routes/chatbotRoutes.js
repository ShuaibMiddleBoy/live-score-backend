const express = require("express");
const chatbotRouter = express.Router();
const multer = require("multer");
const { generateContent,paraphraseGenerateContent, getGeneratedContent, getGeneratedContentById } = require("../controller/chatbot");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
chatbotRouter.post("/generate-content", upload.single("image"), generateContent);
chatbotRouter.post("/paraphrase-generated-content", paraphraseGenerateContent);
chatbotRouter.get("/get-generated-content", getGeneratedContent);
chatbotRouter.get("/get-generated-content/:id", getGeneratedContentById); 
chatbotRouter.post("/generate-content", upload.single("image"), generateContent);
module.exports = { chatbotRouter };