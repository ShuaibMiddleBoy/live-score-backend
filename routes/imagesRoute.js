const express = require("express");
const imagesRouter = express.Router();
const { getImages } = require("../controller/image");

// Define a route with a parameter for imageId
imagesRouter.get("/get-images/:imageId", getImages);

module.exports = { imagesRouter };
