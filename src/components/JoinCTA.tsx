import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function JoinCTA() {
  const t = useTranslations("CTA");

  return (
    <section className="relative w-full overflow-hidden bg-navy dark:bg-card py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      {/* Decorative gradient circles */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary opacity-20 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-300 md:text-xl">
            {t("desc")}
          </p>
          <div className="pt-4">
            <Link 
              href="/tuyen-thanh-vien" 
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-primary px-10 text-base font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              {t("button")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
