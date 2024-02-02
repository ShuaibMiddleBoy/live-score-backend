const { contactModel } = require("../model/contactSch");
const bcrypt = require("bcrypt");

const createContactUs = async (req, res) => {
  try {
    const { Name, Email, PhoneNo, Message } = req.body;

    // Hash Email and PhoneNo using bcrypt
    const hashedEmail = await bcrypt.hash(Email, 10);
    const hashedPhoneNo = await bcrypt.hash(String(PhoneNo), 10);

    // Create a new contact
    const contact = new contactModel({
      Name,
      Email: hashedEmail,
      PhoneNo: hashedPhoneNo,
      Message,
    });

    // Save the contact to the database
    await contact.save();

    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createContactUs };
