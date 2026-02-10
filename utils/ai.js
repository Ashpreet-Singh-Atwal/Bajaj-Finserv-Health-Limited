const axios = require("axios");

exports.askAI = async (question) => {
  if (!question || typeof question !== "string") {
    const err = new Error("Invalid AI input");
    err.code = 400;
    throw err;
  }

  if (!process.env.GROQ_API_KEY) {
    const err = new Error("AI API key missing");
    err.code = 500;
    throw err;
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an API. Answer with exactly ONE WORD only. No articles, no explanations, no punctuation."
          },
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 10,
        temperature: 0
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        timeout: 8000
      }
    );

    const text =
      response?.data?.choices?.[0]?.message?.content;

    if (!text || typeof text !== "string") {
      const err = new Error("Invalid AI response format");
      err.code = 502;
      throw err;
    }

    return text.trim().split(/\s+/)[0];

  } catch (e) {
    const err = new Error("AI service unavailable");
    err.code = 503;
    throw err;
  }
};
