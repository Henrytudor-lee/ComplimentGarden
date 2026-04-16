"use client";

import { useLanguage } from "@/lib/i18n";

export default function StyleShowcase() {
  const { t } = useLanguage();

  const styles = [
    {
      icon: "brush",
      titleKey: "ancientPoetry" as const,
      descKey: "ancientPoetrySubtitle" as const,
      tagKey: "ancientPoetryTag" as const,
      bgColor: "bg-secondary-container",
      textColor: "text-on-secondary-container",
    },
    {
      icon: "favorite",
      titleKey: "modernRomantic" as const,
      descKey: "modernRomanticSubtitle" as const,
      tagKey: "passionate" as const,
      bgColor: "bg-primary-fixed",
      textColor: "text-on-primary-fixed",
    },
    {
      icon: "menu_book",
      titleKey: "englishMuse" as const,
      descKey: "englishMuseSubtitle" as const,
      tagKey: "sophisticated" as const,
      bgColor: "bg-tertiary-fixed",
      textColor: "text-on-tertiary-fixed",
      glow: true,
    },
    {
      icon: "auto_awesome_motion",
      titleKey: "playfulCute" as const,
      descKey: "playfulCuteSubtitle" as const,
      tagKey: "enchanting" as const,
      bgColor: "bg-outline-variant/30",
      textColor: "text-primary",
    },
  ];

  return (
    <section id="styles" className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">
            {t.everyMuseDeserves}
          </h2>
          <p className="text-on-surface-variant">{t.selectStyleDescription}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {styles.map((style) => (
            <div
              key={style.titleKey}
              className="p-8 bg-surface-container-lowest rounded-lg group hover:bg-primary-container/10 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-full ${style.bgColor} flex items-center justify-center mb-6 ${style.textColor} ${style.glow ? "glow-chip" : ""}`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {style.icon}
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">
                {t[style.titleKey]}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {t[style.descKey]}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary tracking-widest uppercase">
                <span className="w-4 h-[1px] bg-primary" />
                {t[style.tagKey]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
