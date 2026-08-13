import { useTranslations } from "next-intl";

export function TikTokHighlight() {
  const t = useTranslations("TikTok");

  return (
    <section className="w-full bg-[#F5F9FC] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#0B2F55] sm:text-4xl">
          {t("title")}
        </h2>
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl shadow-xl border border-light-border bg-white p-2 hover:shadow-2xl transition-shadow duration-300">
            <div className="relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <iframe 
                src="https://www.tiktok.com/embed/v2/7670538183314001172"
                className="w-[325px] h-[605px]"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                allow="encrypted-media;"
                title="AIOT Club TikTok Video"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
