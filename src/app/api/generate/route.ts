import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type StyleType = "ancient" | "romantic" | "devotion" | "article" | "minimal";

const stylePrompts: Record<StyleType, string> = {
  ancient: `You are a master poet specializing in classical Chinese Tang and Song dynasty poetry. Write elegant, concise verses (4-7 lines) that praise the beauty captured in this image. Use imagery inspired by classical Chinese poetry - mountains, moonlight, flowers, mist. Be poetic and profound. Respond ONLY with the poem, nothing else.`,
  romantic: `You are a Victorian-era romantic poet. Write flowing, elegant prose in the style of romantic poets like Keats or Shelley. Create a single paragraph of heartfelt praise (2-4 sentences) that captures the essence of beauty in this image. Be passionate yet refined. Respond ONLY with the paragraph, nothing else.`,
  devotion: `You are a devoted admirer who expresses unconditional love and admiration. Write a playful, hyperbolic, deeply affectionate expression of devotion (2-3 sentences). Be dramatic, sweet, and slightly over-the-top in a charming way. Respond ONLY with the expression, nothing else.`,
  article: `You are an editorial writer for a prestigious lifestyle magazine. Write a detailed, narrative exploration (3-4 paragraphs) that examines every beautiful detail in this image. Describe the interplay of light, composition, emotion, and aesthetic elements. Be insightful and eloquent. Respond ONLY with the narrative, nothing else.`,
  minimal: `You are a modern minimalist copywriter. Write a short, punchy, impactful statement (1-2 sentences max) that captures the essence of beauty in this image. Think modern advertising meets haiku - powerful but brief. Respond ONLY with the statement, nothing else.`,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, style } = body as { image: string; style: StyleType };

    if (!image || !style) {
      return NextResponse.json(
        { error: "Missing image or style" },
        { status: 400 }
      );
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;

    if (!apiKey) {
      // Return a fallback praise if no API key is configured
      const fallbackPraises: Record<StyleType, string> = {
        ancient: "月华如练，清辉满地。此影此景，动人心弦。",
        romantic:
          "There is a light you carry that doesn't just illuminate the room—it ignites the spirit of everyone within it. Like golden hour captured in a single smile.",
        devotion:
          "You are absolutely breathtaking! Every angle, every moment, every single detail about you is perfection itself! I'm completely enchanted!",
        article:
          "The interplay of light and shadow in this composition creates a dance of visual poetry. The subject's essence shines through with an authenticity that speaks directly to the soul, reminding us why certain moments deserve to be frozen in time.",
        minimal: "Pure radiance. Timeless beauty.",
      };

      return NextResponse.json({ praise: fallbackPraises[style] });
    }

    const prompt = stylePrompts[style];

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    // Build the messages for Qwen
    const messages: any[] = [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ];

    // Call Qwen API via OpenAI compatible interface
    const response = await openai.chat.completions.create({
      model: "qwen-vl-plus", // Vision model that supports image input
      messages: messages,
      max_tokens: 500,
    });

    const praise = response.choices[0]?.message?.content;

    if (!praise) {
      console.error("Qwen response:", JSON.stringify(response, null, 2));
      return NextResponse.json(
        { error: "No praise generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ praise: praise.trim() });
  } catch (error) {
    console.error("Generate error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate praise", details: message },
      { status: 500 }
    );
  }
}
