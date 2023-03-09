import { ChatGPTAPI } from "chatgpt";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.get("/api", async (req, res) => {
  try {
    const { word } = req.query;

    const api = new ChatGPTAPI({
      apiKey: process.env.API_OPENAI_KEY,
      completionParams: {
        temperature: 0.5,
        top_p: 0.8,
      },
    });

    const response = await api.sendMessage(word);
    res.json({ ask: word, content: response.text });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
