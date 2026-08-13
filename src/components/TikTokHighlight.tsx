import { useTranslations } from "next-intl";

export function TikTokHighlight() {
  const t = useTranslations("TikTok");

  return (
    <section className="w-full overflow-hidden bg-white dark:bg-card py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Text Content (Left side on desktop) */}
          <div className="flex flex-col justify-center space-y-6 lg:pl-10 text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="max-w-[500px] mx-auto lg:mx-0 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("desc")}
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <a 
                href="https://www.tiktok.com/@aiotclub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl gap-2"
              >
                {/* TikTok Icon (SVG) */}
                <svg width="18" height="18" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
                {t("button")}
              </a>
            </div>
          </div>

          {/* Video Content (Right side on desktop) */}
          <div className="relative mx-auto w-full max-w-[340px] order-1 lg:order-2 group">
            {/* Decorative background blobs */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#1767A6]/20 to-[#05A6C8]/20 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 opacity-50"></div>
            
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white bg-black">
              <div className="flex items-center justify-center bg-gray-100 w-full h-[605px]">
                <iframe 
                  src="https://www.tiktok.com/embed/v2/7670538183314001172"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  allow="encrypted-media;"
                  title="AIOT Club TikTok Video"
                ></iframe>
              </div>
            </div>
            
            {/* Floating decoration dots */}
            <div className="absolute -right-6 top-1/4 h-12 w-12 rounded-full bg-secondary/10 blur-md"></div>
            <div className="absolute -left-8 bottom-1/4 h-16 w-16 rounded-full bg-primary/10 blur-md"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
