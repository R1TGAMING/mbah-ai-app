import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

const fetchGemini = async (
    message: string,
    model: string = "gemini-2.5-flash",
): Promise<string | undefined> => {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: message,
        });

        return response.text;
    } catch (error) {
        console.log(error);
    }
};

export default fetchGemini;
