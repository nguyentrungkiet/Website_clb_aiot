import { useTranslations } from "next-intl";
import Image from "next/image";

export function About() {
  const t = useTranslations("About");

  return (
    <section className="w-full bg-[#F5F9FC] py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B2F55] sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t("description")}
            </p>
            <div className="rounded-xl border-l-4 border-[#05A6C8] bg-white p-6 shadow-sm">
              <p className="text-xl font-medium italic text-[#1767A6]">
                "{t("quote")}"
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="aspect-[4/3] rounded-2xl bg-white p-2 shadow-lg border border-light-border">
              <div className="relative h-full w-full rounded-xl overflow-hidden">
                 <Image 
                   src="/aiot-lab.jpg" 
                   alt="AIOT Club Lab Students" 
                   fill 
                   className="object-cover" 
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
