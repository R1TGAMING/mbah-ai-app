import { GoogleGenAI } from "@google/genai";

const fetchGemini = async (
    message: string,
    model: string,
    api_key: string,
): Promise<string | undefined> => {
    const ai = new GoogleGenAI({
        apiKey: api_key,
    });

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
