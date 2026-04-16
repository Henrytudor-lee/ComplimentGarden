"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "en" | "zh";

export interface Translations {
  // Project
  projectName: string;
  // NavBar
  home: string;
  create: string;
  about: string;
  // Hero
  artOfAdmiration: string;
  captureRadiance: string;
  giftHerWords: string;
  heroDescription: string;
  uploadPhoto: string;
  exploreStyles: string;
  // Style Showcase
  everyMuseDeserves: string;
  selectStyleDescription: string;
  // Styles
  ancientPoetry: string;
  ancientPoetrySubtitle: string;
  ancientPoetryTag: string;
  englishRomance: string;
  englishRomanceSubtitle: string;
  englishRomanceTag: string;
  activeChoice: string;
  unconditionalDevotion: string;
  unconditionalDevotionSubtitle: string;
  unconditionalDevotionTag: string;
  longArticle: string;
  longArticleSubtitle: string;
  longArticleTag: string;
  minimalist: string;
  minimalistSubtitle: string;
  modernRomantic: string;
  modernRomanticSubtitle: string;
  passionate: string;
  playfulCute: string;
  playfulCuteSubtitle: string;
  playfulCuteTag: string;
  englishMuse: string;
  englishMuseSubtitle: string;
  sophisticated: string;
  refined: string;
  enchanting: string;
  // Bento
  momentsImmortalized: string;
  momentsImmortalizedDesc: string;
  sheIsAPoem: string;
  bridgeGap: string;
  heartRateSpike: string;
  giftTheMoment: string;
  // CTA
  readyToMakeHerBlush: string;
  ctaDescription: string;
  getStartedNow: string;
  // Footer
  privacy: string;
  terms: string;
  contactUs: string;
  support: string;
  copyright: string;
  // Upload
  digitalKeepsake: string;
  chooseYourVoice: string;
  selectLinguisticLens: string;
  dragDropHere: string;
  orClickToBrowse: string;
  photoAnalysis: string;
  photoAnalysisDesc: string;
  generatePraise: string;
  retakePhoto: string;
  wordsAreThreads: string;
  generating: string;
  // Result
  aMomentOf: string;
  yourUploadedMemory: string;
  memoryRecorded: string;
  theStyle: string;
  copyText: string;
  copied: string;
  share: string;
  newPhoto: string;
  exploreOtherAuras: string;
  changeMood: string;
  viewAllStyles: string;
  selectStyle: string;
  resultPageDesc: string;
  // Errors
  noApiKey: string;
  // About
  ourVision: string;
  theDigitalKeepsakeTitle: string;
  theDigitalKeepsakeDesc: string;
  heartOfProject: string;
  heartOfProjectDesc1: string;
  heartOfProjectDesc2: string;
  aiDrivenEloquence: string;
  aiDrivenEloquenceDesc: string;
  theAuraSystem: string;
  elegantArchitecture: string;
  elegantArchitectureDesc: string;
  ourCoreIsOpen: string;
  ourCoreIsOpenDesc: string;
  githubRepository: string;
  connectWithUs: string;
  connectWithUsDesc: string;
  generalInquiry: string;
  technicalSupport: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Project
    projectName: "Compliment Garden",
    // NavBar
    home: "Home",
    create: "Create",
    about: "About",
    // Hero
    artOfAdmiration: "The Art of Admiration",
    captureRadiance: "Capture Her Radiance,",
    giftHerWords: "Gift Her Words.",
    heroDescription:
      "Transform every portrait into a poetic masterpiece. Our AI understands the soul of beauty, crafting personalized praise that resonates with affection and grace.",
    uploadPhoto: "Upload Photo",
    exploreStyles: "Explore Styles",
    // Style Showcase
    everyMuseDeserves: "Every Muse Deserves a Melody",
    selectStyleDescription:
      "Choose from a variety of curated literary styles to match her unique personality and the mood of your photo.",
    // Styles
    ancientPoetry: "Ancient Poetry",
    ancientPoetrySubtitle:
      "Elegant verses inspired by the classics, celebrating timeless beauty with traditional grace.",
    ancientPoetryTag: "Refined",
    englishRomance: "English Romance",
    englishRomanceSubtitle:
      "Direct, heartfelt, and contemporary expressions of love that speak to the heart of today.",
    englishRomanceTag: "Active Choice",
    activeChoice: "Active Choice",
    unconditionalDevotion: "Unconditional Devotion",
    unconditionalDevotionSubtitle:
      "Playful, hyperbolic, and deeply affectionate expressions of loyalty.",
    unconditionalDevotionTag: "Emotional",
    longArticle: "Long Article",
    longArticleSubtitle:
      "A narrative journey detailing every nuance and beautiful detail detected.",
    longArticleTag: "Detailed",
    minimalist: "Minimalist",
    minimalistSubtitle: "Short, punchy, and modern. Less is more.",
    modernRomantic: "Modern Romantic",
    modernRomanticSubtitle:
      "Direct, heartfelt, and contemporary expressions of love that speak to the heart of today.",
    passionate: "Passionate",
    playfulCute: "Playful & Cute",
    playfulCuteSubtitle:
      "Lighthearted, witty, and sweet praises that bring a radiant smile to her face instantly.",
    playfulCuteTag: "Enchanting",
    englishMuse: "English Muse",
    englishMuseSubtitle:
      "Shakespearean depth and Victorian charm, for a sophisticated touch of international flair.",
    sophisticated: "Sophisticated",
    refined: "Refined",
    enchanting: "Enchanting",
    // Bento
    momentsImmortalized: "Moments Immortalized",
    momentsImmortalizedDesc:
      "Beyond just an image, we capture the emotion behind the gaze.",
    sheIsAPoem: "She is a poem without words.",
    bridgeGap:
      "Let our AI bridge that gap with linguistic perfection.",
    heartRateSpike: "Heart Rate Spike",
    giftTheMoment: "Gift the Moment",
    // CTA
    readyToMakeHerBlush: "Ready to make her blush?",
    ctaDescription:
      "Upload a photo now and receive a custom-crafted praise in seconds. No strings attached, just pure affection.",
    getStartedNow: "Get Started Now",
    // Footer
    privacy: "Privacy",
    terms: "Terms",
    contactUs: "Contact Us",
    support: "Support",
    copyright: "Compliment Garden. Crafted with affection.",
    // Upload
    digitalKeepsake: "The Digital Keepsake",
    chooseYourVoice: "Choose Your Voice",
    selectLinguisticLens:
      "Select the linguistic lens through which you wish to praise this moment.",
    dragDropHere: "Drag & drop your photo here",
    orClickToBrowse: "or click to browse",
    photoAnalysis: "Photo Analysis",
    photoAnalysisDesc:
      "We've detected elements of Soft Light, Natural Beauty, and Serenity. Ready to transform these visuals into heartfelt words.",
    generatePraise: "Generate Praise",
    retakePhoto: "Retake Photo",
    wordsAreThreads:
      "Words are the threads that weave our affection into eternity.",
    generating: "Generating...",
    // Result
    aMomentOf: "A Moment of",
    yourUploadedMemory:
      "Your uploaded memory has been paired with a curated reflection. This is your digital keepsake to cherish and share.",
    memoryRecorded: "Memory Recorded",
    theStyle: "The Style",
    copyText: "Copy Text",
    copied: "Copied!",
    share: "Share",
    newPhoto: "New Photo",
    exploreOtherAuras: "Explore Other Auras",
    changeMood:
      "Change the mood of your keepsake with different praise styles.",
    viewAllStyles: "View all styles",
    selectStyle: "Select Style",
    resultPageDesc:
      "This moment captures the essence of beauty. Every detail in this frame speaks to a soul that is unafraid to shine brightly, even in the quietest of hours.",
    // Errors
    noApiKey: "API key not configured",
    // About
    ourVision: "Our Vision",
    theDigitalKeepsakeTitle: "The Digital Keepsake",
    theDigitalKeepsakeDesc:
      "Compliment Garden is more than an application; it is an intention. We empower users to express love and admiration through the delicate intersection of words and digital art.",
    heartOfProject: "The Heart of the Project",
    heartOfProjectDesc1:
      "Compliment Garden was born from a simple observation: the world needs more deliberate kindness. We wanted to create a space that felt like a curated journal—a place where affection isn't just a notification, but a beautiful, tactile-feeling memory.",
    heartOfProjectDesc2:
      "Inspired by the timeless nature of heirlooms, every interaction is designed to feel permanent, warm, and deeply personal.",
    aiDrivenEloquence: "AI-Driven Eloquence",
    aiDrivenEloquenceDesc:
      "Our engine uses advanced semantic modeling to transform simple sentiments into poetic tributes, ensuring every praise feels unique and elevated.",
    theAuraSystem: "The Aura System",
    elegantArchitecture: "Elegant Architecture",
    elegantArchitectureDesc:
      "Built with a focus on 'Organic Depth,' our architecture prioritizes tonal layering over rigid borders, creating a UI that breathes.",
    ourCoreIsOpen: "Our Core is Open",
    ourCoreIsOpenDesc:
      "The beauty of praise belongs to everyone. Compliment Garden is fully open source and community-driven.",
    githubRepository: "GitHub Repository",
    connectWithUs: "Connect with Us",
    connectWithUsDesc:
      "We would love to hear your stories of affection and how Compliment Garden has helped you celebrate the beauty in your world.",
    generalInquiry: "General Inquiry",
    technicalSupport: "Technical Support",
  },
  zh: {
    // Project
    projectName: "赞美花园",
    // NavBar
    home: "首页",
    create: "创作",
    about: "关于",
    // Hero
    artOfAdmiration: "赞美的艺术",
    captureRadiance: "捕捉她的光芒，",
    giftHerWords: "赠予她文字。",
    heroDescription:
      "将每一张照片转化为诗意的杰作。我们的 AI 理解美的本质，创作出充满情感和优雅的个性化赞美。",
    uploadPhoto: "上传照片",
    exploreStyles: "探索风格",
    // Style Showcase
    everyMuseDeserves: "每一位缪斯都值得一首赞歌",
    selectStyleDescription:
      "选择多种精心策划的文学风格，匹配她独特的个性和你照片的情绪。",
    // Styles
    ancientPoetry: "古诗词",
    ancientPoetrySubtitle: "灵感来自唐宋诗词的优雅诗句，永恒而典雅。",
    ancientPoetryTag: "典雅",
    englishRomance: "英式浪漫",
    englishRomanceSubtitle: "直接、真挚、富有现代感的爱情表达。",
    englishRomanceTag: "精选",
    activeChoice: "精选",
    unconditionalDevotion: "无条件奉献",
    unconditionalDevotionSubtitle: "俏皮、夸张、充满深情的表达。",
    unconditionalDevotionTag: "深情",
    longArticle: "长篇文章",
    longArticleSubtitle: "详细叙述每一处细腻的美好细节。",
    longArticleTag: "详细",
    minimalist: "简约风格",
    minimalistSubtitle: "简短、有力、现代。少即是多。",
    modernRomantic: "现代浪漫",
    modernRomanticSubtitle: "直接、真挚、富有现代感的爱情表达。",
    passionate: "热情",
    playfulCute: "俏皮可爱",
    playfulCuteSubtitle: "轻松、俏皮、甜蜜的赞美，让她立刻笑容灿烂。",
    playfulCuteTag: "迷人",
    englishMuse: "英伦缪斯",
    englishMuseSubtitle: "莎士比亚的深度与维多利亚魅力，国际范儿十足。",
    sophisticated: "高雅",
    refined: "精致",
    enchanting: "迷人",
    // Bento
    momentsImmortalized: "定格的瞬间",
    momentsImmortalizedDesc: "超越图像本身，我们捕捉目光背后的情感。",
    sheIsAPoem: "她是一首无字的诗。",
    bridgeGap: "让 AI 用语言完美填补这份空白。",
    heartRateSpike: "心跳加速",
    giftTheMoment: "赠送此刻",
    // CTA
    readyToMakeHerBlush: "准备好让她脸红了吗？",
    ctaDescription:
      "立即上传照片，几秒钟内收到专属定制的赞美。无任何附加条件，只有纯粹的情感。",
    getStartedNow: "立即开始",
    // Footer
    privacy: "隐私",
    terms: "条款",
    contactUs: "联系我们",
    support: "支持",
    copyright: "赞美花园。用心创作。",
    // Upload
    digitalKeepsake: "数字纪念品",
    chooseYourVoice: "选择你的声音",
    selectLinguisticLens: "选择你希望赞美这一刻的语言风格。",
    dragDropHere: "拖放照片到这里",
    orClickToBrowse: "或点击浏览",
    photoAnalysis: "照片分析",
    photoAnalysisDesc:
      "我们检测到柔和光线、自然美与宁静的元素。准备好将这些视觉元素转化为温暖人心的话语。",
    generatePraise: "生成赞美",
    retakePhoto: "重新拍摄",
    wordsAreThreads: "文字是将情感编织成永恒的丝线。",
    generating: "生成中...",
    // Result
    aMomentOf: "此刻的",
    yourUploadedMemory:
      "你上传的记忆已配上一段精心策划的感悟。这是你值得珍藏和分享的数字纪念品。",
    memoryRecorded: "记录时刻",
    theStyle: "风格",
    copyText: "复制文字",
    copied: "已复制！",
    share: "分享",
    newPhoto: "新照片",
    exploreOtherAuras: "探索其他风格",
    changeMood: "用不同的赞美风格改变你纪念品的心情。",
    viewAllStyles: "查看所有风格",
    selectStyle: "选择风格",
    resultPageDesc:
      "这一刻捕捉了美的精髓。画面中的每一个细节都在讲述一个灵魂，它无畏地闪耀着光芒，即使在最寂静的时刻。",
    // Errors
    noApiKey: "未配置 API 密钥",
    // About
    ourVision: "我们的愿景",
    theDigitalKeepsakeTitle: "数字纪念品",
    theDigitalKeepsakeDesc:
      "赞美花园不仅仅是一个应用，更是一种心意。我们让用户能够通过文字与数字艺术的精致交汇来表达爱与赞美。",
    heartOfProject: "项目的核心",
    heartOfProjectDesc1:
      "赞美花园诞生于一个简单的观察：世界需要更多用心的善意。我们想创建一个如同精心策划的日记般的空间——在这里，情感不仅仅是通知，而是一份美丽而富有触感记忆。",
    heartOfProjectDesc2:
      "灵感来自传家宝的永恒特质，每一次交互都被设计成永久、温暖且深具个人意义的体验。",
    aiDrivenEloquence: "AI 驱动的优雅表达",
    aiDrivenEloquenceDesc:
      "我们的引擎使用先进的语义建模，将简单的情感转化为诗意的颂词，确保每一条赞美都独特而升华。",
    theAuraSystem: "光环系统",
    elegantArchitecture: "优雅的架构",
    elegantArchitectureDesc:
      "以'有机深度'为焦点构建，我们的架构优先考虑色调层次而非僵硬边框，创造出呼吸感的界面。",
    ourCoreIsOpen: "我们的核心是开放的",
    ourCoreIsOpenDesc:
      "赞美的美属于每一个人。赞美花园是完全开源且由社区驱动的。",
    githubRepository: "GitHub 仓库",
    connectWithUs: "联系我们",
    connectWithUsDesc:
      "我们很想聆听您的情感故事，以及赞美花园如何帮助您庆祝世界之美。",
    generalInquiry: "一般咨询",
    technicalSupport: "技术支持",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
