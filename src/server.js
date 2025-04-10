import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing from .env");
}

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
