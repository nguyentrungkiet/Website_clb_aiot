import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function NewsPage() {
  const t = useTranslations("NewsPage");

  const newsIds = ["0", "1", "2", "3"];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white dark:bg-card">
        <ScrollReveal direction="none">
          <section className="bg-background py-20 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("title")}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("desc")}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <section className="py-16 container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid gap-8">
              {newsIds.map((idx) => (
                <div key={idx} className="flex flex-col md:flex-row bg-white dark:bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                  <div className="w-full md:w-1/3 min-h-[200px] relative overflow-hidden flex items-center justify-center">
                    <Image 
                      src={t(`items.${idx}.image`)} 
                      alt={t(`items.${idx}.title`)} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-bold text-white bg-[#05A6C8] px-3 py-1 rounded-full uppercase tracking-wider">{t(`items.${idx}.cat`)}</span>
                      <div className="flex items-center text-sm text-gray-500 font-medium">
                        <Calendar className="w-4 h-4 mr-1" />
                        {t(`items.${idx}.date`)}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#1767A6] transition-colors">{t(`items.${idx}.title`)}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{t(`items.${idx}.desc`)}</p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-[#1767A6] font-semibold">
                        {t("read_more")} <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
