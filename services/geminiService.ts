import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ImageSize } from "../types";

// Note: In a real production app, this should be handled securely. 
// For this demo, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getGeminiChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const chat: Chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history,
      config: {
        systemInstruction: `你是一个专业的决算会审辅助助手。
        你的任务是帮助财务人员和审计人员分析财务问题、提供法规依据建议、优化问题描述以及提供一般性的财务咨询。
        请保持回答专业、严谨、简洁。`,
      },
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "无法生成回复";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};

export const generateGeminiImage = async (prompt: string, size: ImageSize): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size, // 1K, 2K, 4K
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    throw new Error("未生成图片数据");
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
};
