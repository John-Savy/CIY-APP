import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  // Priority 1: Platform-injected key (from the Select Key dialog)
  // Priority 2: Environment variable (from the Secrets tab)
  const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
  
  if (!key || key === 'undefined' || key === 'null' || key === '') {
    return '';
  }
  return key;
};

export const extractRecipeFromYoutube = async (url: string) => {
  // 1. Try to get the key from the platform's dynamic injection first
  // 2. Fallback to our server-side config
  let apiKey = (window as any).process?.env?.API_KEY || (window as any).API_KEY;
  
  if (!apiKey) {
    const configRes = await fetch('/api/config');
    const config = await configRes.json();
    apiKey = config.apiKey;
  }

  // Aggressive Cleaning: Remove quotes, spaces, and common prefixes like "API_KEY="
  if (apiKey) {
    apiKey = apiKey.toString().trim();
    apiKey = apiKey.replace(/^(API_KEY|GEMINI_API_KEY)[:=]\s*/i, '');
    apiKey = apiKey.replace(/["']/g, '').trim();
  }

  // Prevent using placeholder keys from .env.example
  if (!apiKey || 
      apiKey === 'undefined' || 
      apiKey === 'null' || 
      apiKey === '' || 
      apiKey === 'MY_GEMINI_API_KEY' ||
      apiKey.includes('YOUR_API_KEY')) {
    throw new Error("No valid API key found. Please use the 'Connect Gemini Key' button or set your Secrets.");
  }

  // Log prefix for debugging (safe to show first 4 chars)
  console.log(`[Gemini] Using key starting with: ${apiKey.substring(0, 4)}...`);

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `YOU MUST ANALYZE THIS SPECIFIC YOUTUBE URL: ${url}
      
      TASK: Extract the recipe EXACTLY as shown in the video at the link above.
      
      STRICT CONSTRAINTS:
      1. ONLY extract the recipe from the provided URL. 
      2. If the URL is for "Nasi Goreng", do NOT return "Baked Alaska" or any other dish.
      3. Use your 'googleSearch' tool to find the transcript or description for this SPECIFIC video if you don't have it in your immediate context.
      4. If you cannot find the specific recipe for THIS video, return "Unknown Recipe".
      
      Return the data in the specified JSON format.`,
      config: {
        systemInstruction: "You are a highly accurate culinary data extractor. You must use Google Search to verify the contents of the specific YouTube URL provided. Hallucination is strictly forbidden. You must match the dish name in the video title exactly.",
        tools: [{ googleSearch: {} }],
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            prepTime: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            description: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.STRING }
                },
                required: ["name", "amount"]
              }
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["title", "content"]
              }
            }
          },
          required: ["title", "subtitle", "prepTime", "calories", "ingredients", "steps", "description"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    // Clean the response text in case there's markdown wrapping
    const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    throw error;
  }
};
