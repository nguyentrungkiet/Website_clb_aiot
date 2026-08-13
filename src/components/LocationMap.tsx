import { useTranslations } from "next-intl";

export function LocationMap() {
  const t = useTranslations("Location");

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#0B2F55] md:text-4xl">
          {t("title")}
        </h2>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-lg border border-gray-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.745167015509!2d106.66611361111956!3d10.982559555319808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d112d8a59913%3A0xc34b07106cf2c2f7!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBUaOG7pyBE4bqndSBN4buZdA!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s" 
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
