import { useTranslations } from "next-intl";
import Image from "next/image";

export function About() {
  const t = useTranslations("About");

  return (
    <section className="w-full bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("description")}
            </p>
            <div className="rounded-xl border-l-4 border-secondary bg-white dark:bg-card p-6 shadow-sm">
              <p className="text-xl font-medium italic text-primary">
                "{t("quote")}"
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="aspect-video rounded-2xl bg-white dark:bg-card p-2 shadow-lg border border-border">
              <div className="relative h-full w-full rounded-xl overflow-hidden">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src="https://www.youtube.com/embed/FJQxi4UOo30" 
                   title="Giới thiệu CLB AIOT" 
                   style={{ border: 0 }}
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                   referrerPolicy="strict-origin-when-cross-origin" 
                   allowFullScreen
                   className="w-full h-full"
                 ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
