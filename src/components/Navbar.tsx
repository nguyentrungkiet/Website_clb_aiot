"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-border bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          {/* Logo */}
          <div className="relative h-10 w-28 md:h-12 md:w-36">
            <Image 
              src="/logo.png" 
              alt="AIOT Club Logo" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-[#0B2F55]">
          <Link href="/" className="hover:text-[#05A6C8] transition-colors">{t("home")}</Link>
          <Link href="/gioi-thieu" className="hover:text-[#05A6C8] transition-colors">{t("about")}</Link>
          <Link href="/du-an" className="hover:text-[#05A6C8] transition-colors">{t("projects")}</Link>
          <Link href="/cuoc-thi" className="hover:text-[#05A6C8] transition-colors">{t("competitions")}</Link>
          <Link href="/tin-tuc" className="hover:text-[#05A6C8] transition-colors">{t("news")}</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/tuyen-thanh-vien" className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-[#1767A6] to-[#05A6C8] px-4 text-sm font-medium text-white shadow transition-colors hover:opacity-90">
            {t("join")}
          </Link>
          
          {/* Language Switcher */}
          <div className="flex gap-2 text-sm font-medium">
            <Link href="/" locale="vi" className="hover:text-[#05A6C8]">VI</Link>
            <span>|</span>
            <Link href="/" locale="en" className="hover:text-[#05A6C8]">EN</Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden flex items-center justify-center p-2 text-[#0B2F55] hover:text-[#05A6C8]"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-light-border shadow-lg flex flex-col p-4 space-y-4">
          <Link href="/" onClick={closeMenu} className="font-medium text-[#0B2F55] hover:text-[#05A6C8]">{t("home")}</Link>
          <Link href="/gioi-thieu" onClick={closeMenu} className="font-medium text-[#0B2F55] hover:text-[#05A6C8]">{t("about")}</Link>
          <Link href="/du-an" onClick={closeMenu} className="font-medium text-[#0B2F55] hover:text-[#05A6C8]">{t("projects")}</Link>
          <Link href="/cuoc-thi" onClick={closeMenu} className="font-medium text-[#0B2F55] hover:text-[#05A6C8]">{t("competitions")}</Link>
          <Link href="/tin-tuc" onClick={closeMenu} className="font-medium text-[#0B2F55] hover:text-[#05A6C8]">{t("news")}</Link>
          <div className="pt-2 border-t border-gray-100">
            <Link href="/tuyen-thanh-vien" onClick={closeMenu} className="flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-r from-[#1767A6] to-[#05A6C8] px-4 text-sm font-medium text-white shadow">
              {t("join")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
