const axios = require("axios");

const getImages = async (req, res) => {
  // Extract the dynamic imageId from the request parameters
  const { imageId } = req.params;

  const options = {
    method: "GET",
    url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg`,
    headers: {
      "X-RapidAPI-Key": `${process.env.RAPIDAPI_KEY}`,
      "X-RapidAPI-Host": `${process.env.RAPIDAPI_HOST}`,
    },
    responseType: "arraybuffer", // Set the response type to arraybuffer to handle binary data
  };

  try {
    // Simulate a delay of 1 to 3 seconds before sending the response
    setTimeout(async () => {
      const response = await axios.request(options);

      // Set the appropriate content type header
      res.setHeader("Content-Type", "image/jpeg");

      // Send the image data as a response
      res.send(response.data);
    }, Math.floor(Math.random() * 5000) + 1000);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

module.exports = { getImages };
