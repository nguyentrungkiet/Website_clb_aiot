import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-white border-t border-light-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-12 w-36">
              <Image 
                src="/logo.png" 
                alt="AIOT Club Logo" 
                fill 
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-500 max-w-sm">
              {t("desc")}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#0B2F55]">{t("quick_links")}</h4>
            <nav className="flex flex-col space-y-2 text-sm text-gray-600">
              <Link href="/gioi-thieu" className="hover:text-[#1767A6]">Về chúng mình</Link>
              <Link href="/du-an" className="hover:text-[#1767A6]">Dự án</Link>
              <Link href="/cuoc-thi" className="hover:text-[#1767A6]">Cuộc thi</Link>
              <Link href="/tin-tuc" className="hover:text-[#1767A6]">Tin tức & Hoạt động</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#0B2F55]">{t("contact")}</h4>
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
              <p>{t("address")}</p>
              <p>Email: <a href="mailto:aiotclub.tdmu@gmail.com" className="hover:underline hover:text-blue-600">aiotclub.tdmu@gmail.com</a></p>
              <p>Fanpage: <a href="https://www.facebook.com/aiotclub" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600">facebook.com/aiotclub</a></p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-light-border text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
