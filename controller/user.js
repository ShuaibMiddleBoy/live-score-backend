const { userModel } = require("../model/userSch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    // Check if the user with the provided email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the provided email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in signIn:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getIsAdmin = (req, res) => {
  try {
    if (!req.user || typeof req.user.isAdmin === "undefined") {
      return res
        .status(401)
        .json({ error: "Invalid token or missing isAdmin property" });
    }

    const isAdmin = req.user.isAdmin;
    res.status(200).json({ isAdmin });
  } catch (error) {
    console.error("Error in getIsAdmin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signUp, signIn, getIsAdmin };
