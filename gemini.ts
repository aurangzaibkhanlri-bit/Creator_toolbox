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

export interface HashtagResult {
  hashtags: string[];
  relatedTopics: string[];
}

export async function analyzeThumbnail(
  imageBase64: string
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

    const prompt = `You are a YouTube thumbnail expert analyst. Analyze this thumbnail image and provide a detailed critique.

Return your analysis in this EXACT JSON format (no markdown, no code blocks, just raw JSON):
{
  "regionalAppeal": {
    "usa": <number 0-100 for USA audience appeal>,
    "uk": <number 0-100 for UK audience appeal>,
    "global": <number 0-100 for global audience appeal>
  },
  "attentionFlow": [
    {"time": "0s", "interest": <number 0-100>},
    {"time": "0.5s", "interest": <number 0-100>},
    {"time": "1s", "interest": <number 0-100>},
    {"time": "1.5s", "interest": <number 0-100>},
    {"time": "2s", "interest": <number 0-100>},
    {"time": "2.5s", "interest": <number 0-100>},
    {"time": "3s", "interest": <number 0-100>}
  ],
  "textReadability": <number 0-100>,
  "contrastBalance": <number 0-100>,
  "critique": "<2-3 sentence overall critique>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
}

Consider:
- Color psychology and contrast
- Text visibility and font choices
- Face/emotion prominence
- Composition and visual hierarchy
- Cultural appeal differences between USA, UK, and global audiences
- How attention flows across the thumbnail over ~3 seconds of viewing`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      },
    ]);

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
  videoTitle: string,
  channelName?: string
): Promise<DescriptionTagsResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API key not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a YouTube SEO expert. Generate an optimized video description and tags based ONLY on this video title.

Video Title: "${videoTitle}"
${channelName ? `Channel Name: ${channelName}` : ""}

Return in this EXACT JSON format (no markdown, no code blocks, just raw JSON):
{
  "description": "<full YouTube description (200-300 words) with:
    - Engaging opening hook (2-3 sentences about the video topic)
    - What viewers will learn/see (bullet points)
    - Call to action (subscribe, like, comment)
    - Note: Do NOT include timestamps or social links as they were not provided>",
  "tags": ["<tag1>", "<tag2>", ... exactly 15 relevant SEO tags for YouTube],
  "hashtags": ["#<hashtag1>", "#<hashtag2>", "#<hashtag3>", "#<hashtag4>", "#<hashtag5>"],
  "keywords": ["<keyword1>", "<keyword2>", "<keyword3>", "<keyword4>", "<keyword5>", "<keyword6>", "<keyword7>", "<keyword8>", "<keyword9>", "<keyword10>"]
}

IMPORTANT: 
- Generate exactly 10 trending/relevant keywords based on the video title topic
- Keywords should be terms people actively search for on YouTube
- Make the description compelling and SEO-optimized
- Tags should include both specific and broad terms`;

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

    return JSON.parse(jsonMatch[0]) as DescriptionTagsResult;
  } catch (error) {
    console.error("[v0] Description generation error:", error);
    throw error;
  }
}

export async function generateHashtags(videoTitle: string): Promise<HashtagResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API key not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a YouTube and social media hashtag expert. Generate trending and relevant hashtags for this video.

Video Title: "${videoTitle}"

Return in this EXACT JSON format (no markdown, no code blocks, just raw JSON):
{
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8"],
  "relatedTopics": ["<related topic 1>", "<related topic 2>", "<related topic 3>", "<related topic 4>", "<related topic 5>"]
}

IMPORTANT:
- Generate exactly 5-8 highly relevant hashtags
- Hashtags should be trending and searchable on YouTube/social media
- Include a mix of specific and broad hashtags
- Do NOT include spaces in hashtags
- All hashtags must start with #
- Related topics are suggestions for similar content`;

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

    return JSON.parse(jsonMatch[0]) as HashtagResult;
  } catch (error) {
    console.error("[v0] Hashtag generation error:", error);
    throw error;
  }
}
