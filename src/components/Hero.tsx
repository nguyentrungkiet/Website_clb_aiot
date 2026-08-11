import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F9FC] py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-[#0B2F55] sm:text-5xl xl:text-6xl/tight">
                {t("headline")}
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                {t("description")}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-[#1767A6]">
              <span>AI</span> &bull; <span>IoT</span> &bull; <span>Embedded</span> &bull; <span>Robotics</span> &bull; <span>UAV</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/gioi-thieu" className="inline-flex h-12 items-center justify-center rounded-md bg-[#1767A6] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0B2F55]">
                {t("explore")}
              </Link>
              <Link href="/tuyen-thanh-vien" className="inline-flex h-12 items-center justify-center rounded-md border border-[#1767A6] px-8 text-sm font-medium text-[#1767A6] shadow-sm transition-colors hover:bg-[#F5F9FC]">
                {t("join")}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="aspect-square rounded-2xl bg-white p-2 shadow-xl border border-light-border relative overflow-hidden">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image 
                  src="/hero-tech.jpg" 
                  alt="AIOT Technology" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                  priority
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -left-4 top-1/4 h-24 w-24 rounded-full bg-[#1767A6] opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 right-1/4 h-32 w-32 rounded-full bg-[#05A6C8] opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
