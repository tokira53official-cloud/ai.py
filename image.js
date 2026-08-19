import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

function detectSize(prompt) {
  const text = prompt.toLowerCase();

  if (
    text.includes("16:9") ||
    text.includes("1920x1080") ||
    text.includes("banner") ||
    text.includes("landscape")
  ) {
    return "1792x1024";
  }

  return "1024x1024";
}

export async function generateImage(prompt) {
  const size = detectSize(prompt);

  try {
    // Try real image generation
    const response = await client.images.generate({
      model: "openai/gpt-image-1",
      prompt,
      size
    });

    return {
      url: response.data[0].url,
      size
    };
  } catch (err) {
    console.error("REAL IMAGE API FAILED:", err.message);

    // Fallback placeholder so bot never crashes
    return {
      url:
        "https://placehold.co/" +
        size +
        "/png?text=" +
        encodeURIComponent("AlphaX AI Image"),
      size
    };
  }
}