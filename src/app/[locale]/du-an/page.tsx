import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");

  const projectIds = ["0", "1", "2", "3", "4", "5"];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white">
        <section className="bg-[#0B2F55] py-20 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">{t("title")}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto relative z-10">
            {t("desc")}
          </p>
        </section>

        <section className="py-16 container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectIds.map((idx) => (
              <div key={idx} className="group rounded-2xl border border-light-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="h-48 relative w-full flex items-center justify-center overflow-hidden">
                  <Image 
                    src={t(`items.${idx}.image`)} 
                    alt={t(`items.${idx}.name`)} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-[#05A6C8] uppercase tracking-wider">{t(`items.${idx}.category`)}</span>
                  <h3 className="text-xl font-bold text-[#0B2F55] mt-2 mb-3">{t(`items.${idx}.name`)}</h3>
                  <p className="text-gray-600 mb-4">{t(`items.${idx}.desc`)}</p>
                  <div className="inline-block px-3 py-1 bg-[#F5F9FC] text-[#1767A6] text-xs font-semibold rounded-full">
                    {t(`items.${idx}.status`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
