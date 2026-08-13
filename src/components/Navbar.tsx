"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          {/* Logo */}
          <div className="relative h-10 w-28 md:h-12 md:w-36">
            {/* Note: In dark mode, if the logo is dark text, we might need a dark mode logo version or invert it. 
                Using a brightness invert filter on dark mode as a quick fix for the logo */}
            <Image 
              src="/logo.png" 
              alt="AIOT Club Logo" 
              fill 
              className="object-contain object-left dark:brightness-200 dark:contrast-100"
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-foreground">
          <Link href="/" className="hover:text-primary transition-colors">{t("home")}</Link>
          <Link href="/gioi-thieu" className="hover:text-primary transition-colors">{t("about")}</Link>
          <Link href="/du-an" className="hover:text-primary transition-colors">{t("projects")}</Link>
          <Link href="/cuoc-thi" className="hover:text-primary transition-colors">{t("competitions")}</Link>
          <Link href="/tin-tuc" className="hover:text-primary transition-colors">{t("news")}</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/tuyen-thanh-vien" className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-primary to-secondary px-4 text-sm font-medium text-white shadow transition-transform hover:scale-105">
            {t("join")}
          </Link>
          
          {/* Language Switcher */}
          <div className="flex gap-2 text-sm font-medium text-foreground">
            <Link href="/" locale="vi" className="hover:text-primary">VI</Link>
            <span className="text-muted">|</span>
            <Link href="/" locale="en" className="hover:text-primary">EN</Link>
          </div>

          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden flex items-center justify-center p-2 text-foreground hover:text-primary"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg flex flex-col p-4 space-y-4">
          <Link href="/" onClick={closeMenu} className="font-medium text-foreground hover:text-primary">{t("home")}</Link>
          <Link href="/gioi-thieu" onClick={closeMenu} className="font-medium text-foreground hover:text-primary">{t("about")}</Link>
          <Link href="/du-an" onClick={closeMenu} className="font-medium text-foreground hover:text-primary">{t("projects")}</Link>
          <Link href="/cuoc-thi" onClick={closeMenu} className="font-medium text-foreground hover:text-primary">{t("competitions")}</Link>
          <Link href="/tin-tuc" onClick={closeMenu} className="font-medium text-foreground hover:text-primary">{t("news")}</Link>
          <div className="pt-2 border-t border-border">
            <Link href="/tuyen-thanh-vien" onClick={closeMenu} className="flex h-10 w-full items-center justify-center rounded-md bg-gradient-to-r from-primary to-secondary px-4 text-sm font-medium text-white shadow">
              {t("join")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
