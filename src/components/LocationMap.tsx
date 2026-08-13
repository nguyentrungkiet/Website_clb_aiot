import { useTranslations } from "next-intl";

export function LocationMap() {
  const t = useTranslations("Location");

  return (
    <section className="w-full bg-white dark:bg-card py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-foreground md:text-4xl">
          {t("title")}
        </h2>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-lg border border-gray-100">
          <iframe 
            src="https://maps.google.com/maps?q=Vi%E1%BB%87n%20C%C3%B4ng%20ngh%E1%BB%87%20s%E1%BB%91%20Tr%C6%B0%E1%BB%9Dng%20%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20Th%E1%BB%A7%20D%E1%BA%A7u%20M%E1%BB%99t&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[300px] md:h-[450px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
