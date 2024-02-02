const { GoogleGenerativeAI } = require("@google/generative-ai");
const { chatbotModel } = require("../model/chatbotSch");

if (!process.env.GEMINI_API_KEY) {
  console.error("API_KEY environment variable is not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Extract title and description from the response
    const titleRegex = /^Title:\s*(.*)/m; // Match "Title:" at the beginning of a line
    const descriptionRegex = /^Description:\s*(.*)/m; // Match "Description:" at the beginning of a line

    const titleMatch = text.match(titleRegex);
    const descriptionMatch = text.match(descriptionRegex);

    let title = titleMatch ? titleMatch[1].trim() : "";
    let description = descriptionMatch ? descriptionMatch[1].trim() : "";

    // Save the response, title, and description to the database
    const chatbotDoc = new chatbotModel({
      prompt: text,
      title,
      description,
      image: imagePath,
    });
    await chatbotDoc.save();

    res.json({ content: text, title, description, image: imagePath });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getGeneratedContent = async (req, res) => {
  try {
    // Retrieve the generated content from the database
    const content = await chatbotModel.find();

    res.json({ content });
  } catch (error) {
    console.error("Error retrieving content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGeneratedContentById = async (req, res) => {
  try {
    const id = req.params.id;
    // Retrieve the generated content by its id from the database
    const content = await chatbotModel.findById(id);
    if (!content) {
      return res.status(404).json({ error: "Generated content not found." });
    }
    res.json({ content });
  } catch (error) {
    console.error("Error retrieving content by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const paraphraseGenerateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Add the static text "paraphrase the following: " to the prompt
    const modifiedPrompt = `paraphrase the following and give me asnwer in 10 words: ${prompt}`;

    const result = await model.generateContent(modifiedPrompt);
    const response = await result.response;
    const text = await response.text();

    // Split the text into lines
    const lines = text.split('\n');

    // Initialize an array to store paraphrased lines
    const paraphrasedLines = [];

    // Check each line for paraphrased content
    for (const line of lines) {
      if (!line.startsWith('Title:') && !line.startsWith('Description:')) {
        paraphrasedLines.push(line);
      }
    }

    // Join the paraphrased lines to form the paraphrased content
    const paraphrasedContent = paraphrasedLines.join('\n').trim();

    if (paraphrasedContent) {
      res.json({ paraphrasedContent });
    } else {
      res.status(500).json({ error: "Paraphrased content not found in the response." });
    }
  } catch (error) {
    console.error("Error generating paraphrased content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  generateContent,
  getGeneratedContent,
  getGeneratedContentById,
  paraphraseGenerateContent
};
