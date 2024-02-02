const acceptCookie = (req, res) => {
  // Set a cookie named 'acceptedDisclaimer' with the value 'true'
  res.cookie("acceptedDisclaimer", "true", {
    maxAge: 365 * 24 * 60 * 60 * 1000,
  }); // 1 year expiration

  // Send a response indicating success
  res.status(200).json({ message: "Cookie accepted" });
};
module.exports = {acceptCookie}