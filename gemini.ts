"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface ThumbnailAnalysis {
  regionalAppeal: {
    usa: number;
    uk: number;
    global: number;
  };
  attentionFlow: {
    time: string;
    interest: number;
  }[];
  textReadability: number;
  contrastBalance: number;
  critique: string;
  strengths: string[];
  improvements: string[];
}

export interface TitleAnalysis {
  hookStrength: number;
  seoWeight: number;
  lengthOptimization: number;
  clickProbability: number;
  emotionalHook: string;
  searchOptimization: string;
  clarity: string;
  suggestions: string[];
  overallScore: number;
}

export interface DescriptionTagsResult {
  description: string;
  tags: string[];
  hashtags: string[];
  keywords: string[];
}

export interface TagResult {
  tags: string[];
  relatedTopics: string[];
}

export async function analyzeThumbnail(
  imageBase64: string,
  videoTitle?: string
): Promise<ThumbnailAnalysis> {
  if (!process.env.GEMINI_API_KEY) {
    console.error("[v0] GEMINI_API_KEY is not set");
    throw new Error("API key not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Extract the base64 data properly
    let base64Data = imageBase64;
    let mimeType = "image/jpeg";
    
    if (imageBase64.startsWith("data:")) {
      const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        base64Data = matches[2];
      }
    }

    const prompt = `You are a YouTube thumbnail expert analyst. Analyze this thumbnail image and provide a detailed critique.${videoTitle ? ` Use the following video title for relevance and context: "${videoTitle}".` : ""}\n\nReturn your analysis in this EXACT JSON format (no markdown, no code blocks, just raw JSON):\n{\n  "regionalAppeal": {\n    "usa": <number 0-100 for USA audience appeal>,\n    "uk": <number 0-100 for UK audience appeal>,\n    "global": <number 0-100 for global audience appeal>\n  },\n  "attentionFlow": [\n    {"time": "0s", "interest": <number 0-100>},\n    {"time": "0.5s", "interest": <number 0-100>},\n    {"time": "1s", "interest": <number 0-100>},\n    {"time": "1.5s", "interest": <number 0-100>},\n    {"time": "2s", "interest": <number 0-100>},\n    {"time": "2.5s", "interest": <number 0-100>},\n    {"time": "3s", "interest": <number 0-100>}\n  ],\n  "textReadability": <number 0-100>,\n  "contrastBalance": <number 0-100>,\n  "critique": "<2-3 sentence overall critique>",\n  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],\n  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]\n}\n\nConsider:\n- Color psychology and contrast\n- Text visibility and font choices\n- Face/emotion prominence\n- Composition and visual hierarchy\n- Cultural appeal differences between USA, UK, and global audiences\n- How attention flows across the thumbnail over ~3 seconds of viewing`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
      responseMimeType: "application/json",
    });

    const response = await result.response;
    const text = response.text();

    // Parse JSON from response - handle code blocks
    let jsonStr = text;
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1];
    }
    
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[v0] Failed to parse JSON from response:", text);
      throw new Error("Failed to parse AI response");
    }

    return JSON.parse(jsonMatch[0]) as ThumbnailAnalysis;
  } catch (error) {
    console.error("[v0] Thumbnail analysis error:", error);
    throw error;
  }
}

export async function analyzeTitle(title: string): Promise<TitleAnalysis> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API key not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a YouTube title optimization expert. Analyze this video title for viral potential:

Title: "${title}"

Return your analysis in this EXACT JSON format (no markdown, no code blocks, just raw JSON):
{
  "hookStrength": <number 0-100 measuring how compelling the opening hook is>,
  "seoWeight": <number 0-100 measuring search optimization potential>,
  "lengthOptimization": <number 0-100 measuring title length effectiveness (60-70 chars is ideal)>,
  "clickProbability": <number 0-100 predicting click-through rate potential>,
  "emotionalHook": "<detailed analysis of emotional triggers and psychological hooks used>",
  "searchOptimization": "<analysis of keyword placement, searchability, and discoverability>",
  "clarity": "<analysis of how clear and understandable the title is>",
  "suggestions": ["<specific improvement 1>", "<specific improvement 2>", "<specific improvement 3>"],
  "overallScore": <number 0-100 overall virality score>
}

Consider:
- Power words and emotional triggers
- Numbers and specificity
- Curiosity gaps
- Search keywords and SEO
- Length optimization (60-70 characters ideal)
- Clarity vs. clickbait balance`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let jsonStr = text;
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1];
    }

    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    return JSON.parse(jsonMatch[0]) as TitleAnalysis;
  } catch (error) {
    console.error("[v0] Title analysis error:", error);
    throw error;
  }
}

export async function generateDescriptionAndTags(
  videoTitle: string
): Promise<DescriptionTagsResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API key not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a YouTube SEO expert. Generate an optimized video description and tags based ONLY on this video title.

Video Title: "${videoTitle}"

Return in this EXACT JSON format (no markdown, no code blocks, just raw JSON):
{
  "description": "<full YouTube description (200-300 words) with:
    - Engaging opening hook (2-3 sentences about the video topic)
    - What viewers will learn/see (bullet points)
    - Call to action (subscribe, like, comment)
    - Note: Do NOT include timestamps or social links as they were not provided>",
  "tags": ["<tag1>", "<tag2>", "<tag3>", "<tag4>", "<tag5>", "<tag6>", "<tag7>", "<tag8>"],
  "hashtags": ["#<hashtag1>", "#<hashtag2>", "#<hashtag3>", "#<hashtag4>", "#<hashtag5>"],
  "keywords": ["<keyword1>", "<keyword2>", "<keyword3>", "<keyword4>", "<keyword5>", "<keyword6>", "<keyword7>", "<keyword8>", "<keyword9>", "<keyword10>"]
}

IMPORTANT: 
- Generate exactly 10 trending/relevant keywords based on the video title topic
- Keywords should be terms people actively search for on YouTube
- Make the description compelling and SEO-optimized
- Tags should include 5-8 specific and broad terms`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      responseMimeType: "application/json",
    });
    const response = await result.response;
    const text = response.text();

    let jsonStr = text;
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1];
    }

    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    return JSON.parse(jsonMatch[0]) as DescriptionTagsResult;
  } catch (error) {
    console.error("[v0] Description generation error:", error);
    throw error;
  }
}

export async function generateTags(videoTitle: string): Promise<TagResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API key not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a YouTube tag expert. Generate 5-8 highly relevant YouTube tags based ONLY on this video title.

Video Title: "${videoTitle}"

Return in this EXACT JSON format (no markdown, no code blocks, just raw JSON):
{
  "tags": ["<tag1>", "<tag2>", "<tag3>", "<tag4>", "<tag5>", "<tag6>", "<tag7>", "<tag8>"],
  "relatedTopics": ["<related topic 1>", "<related topic 2>", "<related topic 3>", "<related topic 4>", "<related topic 5>"]
}

IMPORTANT:
- Generate exactly 5-8 highly relevant tags
- Tags should be searchable and closely tied to the video title topic
- Include both specific and broader terms
- Do NOT include hashtags or the '#' symbol
- Related topics are suggestions for similar content`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      responseMimeType: "application/json",
    });
    const response = await result.response;
    const text = response.text();

    let jsonStr = text;
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1];
    }

    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    return JSON.parse(jsonMatch[0]) as TagResult;
  } catch (error) {
    console.error("[v0] Tag generation error:", error);
    throw error;
  }
}
