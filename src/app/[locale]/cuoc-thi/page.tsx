import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Trophy, Medal, Award } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Medal,
  Award,
};

export default function CompetitionsPage() {
  const t = useTranslations("CompetitionsPage");
  
  const competitionIds = ["0", "1", "2", "3", "4", "5"];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-background">
        <ScrollReveal direction="none">
          <section className="bg-white dark:bg-card py-20 text-center px-4 border-b border-border">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("title")}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("desc")}
            </p>
          </section>
        </ScrollReveal>

        <section className="py-20 container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="relative border-l-4 border-primary ml-6 md:ml-0 md:pl-0">
            {competitionIds.map((idx, i) => {
              const Icon = iconMap[t(`items.${idx}.icon`)] || Trophy;
              return (
                <ScrollReveal key={idx} direction="left" delay={i * 0.1}>
                  <div className="mb-12 ml-8 md:ml-12 relative">
                    <div className="absolute -left-[45px] md:-left-[63px] top-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary border-4 border-background flex items-center justify-center text-white">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition">
                      <span className="text-sm font-bold text-secondary">{t(`items.${idx}.year`)}</span>
                      <h3 className="text-xl font-bold text-foreground mt-1">{t(`items.${idx}.name`)}</h3>
                      <div className="mt-4 inline-block bg-background text-primary px-4 py-1.5 rounded-full font-bold text-sm">
                        {t("award_label")}: {t(`items.${idx}.award`)}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
