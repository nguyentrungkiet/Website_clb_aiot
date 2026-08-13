import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function FeaturedProjects() {
  const t = useTranslations("Projects");

  const projects = [
    { id: "1", image: "/proj-iot.jpg" },
    { id: "2", image: "/proj-drone.jpg" },
    { id: "3", image: "/proj-robot.jpg" }
  ];

  return (
    <section className="w-full bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <Link href="/du-an" className="inline-flex items-center text-primary hover:text-secondary font-medium group">
            {t("view_all")}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ id, image }) => (
            <div key={id} className="group overflow-hidden rounded-2xl bg-white dark:bg-card shadow-sm border border-border transition-all hover:shadow-md">
              <div className="aspect-[16/9] w-full bg-gray-200 relative overflow-hidden">
                <Image 
                  src={image} 
                  alt={t(`items.${id}.title` as any)} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <div className="mb-2 text-xs font-semibold text-secondary">
                  {t(`items.${id}.tags` as any)}
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {t(`items.${id}.title` as any)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {t(`items.${id}.desc` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
