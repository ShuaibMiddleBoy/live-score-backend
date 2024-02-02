const express = require("express");
const contactRouter = express.Router();
const { createContactUs } = require("../controller/contact");
contactRouter.post("/create-contact-us", createContactUs);
module.exports = { contactRouter };