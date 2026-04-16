import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type StyleType = "ancient" | "romantic" | "devotion" | "article" | "minimal";
type Language = "en" | "zh";

// Rate limiting: store IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 requests
const RATE_LIMIT_PERIOD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: Date } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // If no record or expired, create new record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_PERIOD });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetTime: new Date(now + RATE_LIMIT_PERIOD) };
  }

  // If under limit, increment
  if (record.count < RATE_LIMIT) {
    record.count++;
    return { allowed: true, remaining: RATE_LIMIT - record.count, resetTime: new Date(record.resetTime) };
  }

  // Rate limit exceeded
  return { allowed: false, remaining: 0, resetTime: new Date(record.resetTime) };
}

const stylePrompts: Record<Language, Record<StyleType, string>> = {
  en: {
    ancient: `You are a bilingual poet who writes English verse inspired by classical Chinese Tang and Song dynasty poetry aesthetics. First, analyze the image carefully:
- If there is a person in the image: praise the person, focusing on their most attractive features. If the person is female, emphasize her facial beauty, hairstyle, elegant demeanor, clothing, and overall feminine charm. If male, focus on his distinctive features and masculine charm.
- If there is no person: praise the scenic beauty, atmosphere, composition, and aesthetic elements of the image.
Write 4-7 lines of English poetry that captures the essence of classical Chinese verse - use imagery like moonlight, flowers, mist, mountains, clouds, snow, bamboo, plum blossoms, autumn waters. Create parallel structure and musical rhythm typical of classical Chinese poetry. Use END RHYME instead of Chinese characters. Be poetic and profound. Respond ONLY with the English poem, nothing else.`,
    romantic: `You are a Victorian-era romantic poet. First, analyze the image carefully:
- If there is a person in the image: praise the person with heartfelt admiration, focusing on their most captivating qualities. If female, emphasize her facial elegance, graceful hairstyle, refined clothing, and feminine allure that touches the heart. If male, focus on his distinctive charm and presence.
- If there is no person: praise the romantic atmosphere, scenic beauty, and emotional resonance of the image.
Write flowing, elegant prose in the style of romantic poets like Keats or Shelley. Create a single paragraph of heartfelt praise (2-4 sentences). Be passionate yet refined. Respond ONLY with the paragraph, nothing else.`,
    devotion: `You are a devoted admirer who expresses unconditional love and admiration. First, analyze the image carefully:
- If there is a person in the image: direct your passionate praise toward them. If female, celebrate her beauty, radiant smile, beautiful features, lovely hairstyle, charming outfit, and everything that makes her enchanting. If male, celebrate his unique attractiveness and appeal.
- If there is no person: express your admiration for the beautiful scenery or scene.
Write a playful, hyperbolic, deeply affectionate expression of devotion (2-3 sentences). Be dramatic, sweet, and slightly over-the-top in a charming way. Respond ONLY with the expression, nothing else.`,
    article: `You are an editorial writer for a prestigious lifestyle magazine. First, analyze the image carefully:
- If there is a person in the image: provide a detailed narrative exploration focusing on the person. If female, examine her facial features, hairstyle, clothing style, accessories, and overall feminine elegance. Capture her essence and the emotion she conveys. If male, focus on his distinctive features, demeanor, and personal style.
- If there is no person: examine the scenic beauty, composition, lighting, color palette, and emotional atmosphere of the image.
Write a detailed, narrative exploration (3-4 paragraphs) that examines every beautiful detail. Be insightful and eloquent. Respond ONLY with the narrative, nothing else.`,
    minimal: `You are a modern minimalist copywriter. First, analyze the image briefly:
- If there is a person in the image: identify their most striking feature. If female, it could be her radiant beauty, elegant style, or captivating presence. If male, his distinctive charm or presence.
- If there is no person: focus on the most impactful visual element or atmosphere.
Write a short, punchy, impactful statement (1-2 sentences max). Think modern advertising meets haiku - powerful but brief. Respond ONLY with the statement, nothing else.`,
  },
  zh: {
    ancient: `你是一位专精唐宋诗词的大师诗人。首先仔细分析图片：
- 如果图片中有人物：重点关注其最吸引人的特质。如果是女性，强调她的面容之美（如眉如远黛、目若秋波）、发型、优雅气质、服饰。如果是男性，关注他独特的面容和气质。
- 如果没有人物：关注风景的氛围、光影、色彩。
用五言绝句、七言律诗或词牌名的风格，写4-7句古典诗词。必须使用以下古典意象中的至少3种：月、花、云、风、水、雪、竹、梅、雁、柳、烟、露。要对仗工整、平仄协调、意境深远。严禁使用现代词汇如"房间"、"灵魂"、"微笑"。只回复诗词本身，不要任何解释或描述。`,
    romantic: `你是一位维多利亚时代的浪漫主义诗人。首先仔细分析图片：
- 如果图片中有人物：发自内心地夸赞人物，重点关注最吸引人的特质。如果是女性，强调她优雅的面容、柔美的发型、精致的穿搭以及打动人心女性魅力。如果是男性，关注他独特的魅力和气质。
- 如果没有人物：夸赞浪漫的氛围、风景之美和情感共鸣。
用济慈或雪莱等浪漫主义诗人的风格，写一段流畅优雅的散文（2-4句）。充满热情又不失优雅。只回复散文，不要其他内容。`,
    devotion: `你是一位表达无条件的爱与仰慕的忠诚信徒。首先仔细分析图片：
- 如果图片中有人物：把你的热情夸赞直接送给他们。如果是女性，赞美她的美丽、灿烂的笑容、漂亮的五官、可爱的发型、迷人的穿搭，以及一切让她魅力四射的特质。如果是男性，赞美他独特的吸引力和魅力。
- 如果没有人物：表达你对美丽风景或场景的欣赏。
写一段俏皮的、夸张的、深情的表白（2-3句）。戏剧化的、甜蜜的、略带夸张但很可爱。只回复表白，不要其他内容。`,
    article: `你是一位著名生活方式杂志的编辑。首先仔细分析图片：
- 如果图片中有人物：提供以人物为中心的详细叙述。如果是女性，审视她的五官、发型、穿搭风格、配饰和整体女性优雅。捕捉她的本质和她传达的情感。如果是男性，关注他独特的特征、举止和个人风格。
- 如果没有人物：审视风景之美、构图、光线、色彩和情感氛围。
写一篇详细的叙述性探索（3-4段），审视每一个美丽细节。有洞察力的、雄辩的。只回复文章，不要其他内容。`,
    minimal: `你是一位现代极简主义文案。首先简要分析图片：
- 如果图片中有人物：找出他们最引人注目的特质。如果是女性，可能是她耀眼的美、优雅的风格或迷人的气质。如果是男性，他独特的魅力或气质。
- 如果没有人物：关注最有冲击力的视觉元素或氛围。
写一段简短、有力、有影响力的陈述（最多1-2句）。现代广告遇上俳句的感觉——强大但简洁。只回复陈述，不要其他内容。`,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    // Add rate limit headers
    const headers = new Headers();
    headers.set("X-RateLimit-Limit", RATE_LIMIT.toString());
    headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
    headers.set("X-RateLimit-Reset", rateLimitResult.resetTime.toISOString());

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `您今天的生成次数已用完。每天可生成 ${RATE_LIMIT} 次。明天 ${rateLimitResult.resetTime.toLocaleTimeString()} 重置。`,
          resetTime: rateLimitResult.resetTime.toISOString(),
        },
        { status: 429, headers }
      );
    }

    const body = await request.json();
    const { image, style, lang = "en" } = body as { image: string; style: StyleType; lang?: Language };

    if (!image || !style) {
      return NextResponse.json(
        { error: "Missing image or style" },
        { status: 400, headers }
      );
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;
    const language = lang === "zh" ? "zh" : "en";

    if (!apiKey) {
      // Return fallback praises if no API key is configured
      const fallbackPraises: Record<Language, Record<StyleType, string>> = {
        en: {
          ancient: "Moonlight like silk, clear radiance fills the ground. This scene, this moment, touches the heart.",
          romantic: "There is a light you carry that doesn't just illuminate the room—it ignites the spirit of everyone within it. Like golden hour captured in a single smile.",
          devotion: "You are absolutely breathtaking! Every angle, every moment, every single detail about you is perfection itself! I'm completely enchanted!",
          article: "The interplay of light and shadow in this composition creates a dance of visual poetry. The subject's essence shines through with an authenticity that speaks directly to the soul, reminding us why certain moments deserve to be frozen in time.",
          minimal: "Pure radiance. Timeless beauty.",
        },
        zh: {
          ancient: "月华如练，清辉满地。此影此景，动人心弦。",
          romantic: "你身上散发的光芒不仅照亮了房间——它点燃了每个人内心的灵魂。如同金色的时光被捕捉在一个微笑之中。",
          devotion: "你简直美得令人窒息！每一个角度、每一个瞬间、你身上的每一个细节都是完美的化身！我完全被迷住了！",
          article: "这幅作品的光影交织谱写了一曲视觉诗篇。主体的本质闪耀着真实的光芒，直击灵魂，提醒我们为何某些时刻值得被永远定格。",
          minimal: "纯粹的光芒。永恒的美丽。",
        },
      };

      return NextResponse.json(
        { praiseEn: fallbackPraises.en[style], praiseZh: fallbackPraises.zh[style], remaining: rateLimitResult.remaining },
        { headers }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    // Generate both English and Chinese versions
    const generateForLang = async (lang: Language, style: StyleType): Promise<string> => {
      const prompt = stylePrompts[lang][style];
      const langMessages: any[] = [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: image },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ];

      const response = await openai.chat.completions.create({
        model: "qwen-vl-plus",
        messages: langMessages,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error(`No ${lang} praise generated`);
      }
      return content.trim();
    };

    // Generate both versions in parallel
    const [praiseEn, praiseZh] = await Promise.all([
      generateForLang("en", style),
      generateForLang("zh", style),
    ]);

    return NextResponse.json(
      { praiseEn, praiseZh, remaining: rateLimitResult.remaining },
      { headers }
    );
  } catch (error) {
    console.error("Generate error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate praise", details: message },
      { status: 500 }
    );
  }
}
