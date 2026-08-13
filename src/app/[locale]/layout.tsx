import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AIOT Club - Thu Dau Mot University",
  description: "Câu lạc bộ AIOT trực thuộc Viện Công nghệ số – ĐH Thủ Dầu Một. Nơi sinh viên cùng học tập, nghiên cứu, phát triển sản phẩm thực tế về AI, IoT, Robotics và UAV.",
  keywords: ["AIOT", "AIOT Club", "TDMU", "Đại học Thủ Dầu Một", "Viện Công nghệ số", "AI", "IoT", "Robotics", "UAV", "Sinh viên", "Công nghệ"],
  authors: [{ name: "AIOT Club TDMU" }],
  openGraph: {
    title: "AIOT Club - Thu Dau Mot University",
    description: "Khám phá Câu lạc bộ Công nghệ hàng đầu tại TDMU. Bắt đầu từ con số 0. Kiến tạo sản phẩm công nghệ thật.",
    url: "https://www.aiot-tdmu.edu.vn", 
    siteName: "AIOT Club TDMU",
    images: [
      {
        url: "/aiot-lab.jpg", 
        width: 1200,
        height: 630,
        alt: "AIOT Club TDMU Cover Image",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIOT Club - Thu Dau Mot University",
    description: "Bắt đầu từ con số 0. Kiến tạo sản phẩm công nghệ thật.",
    images: ["/aiot-lab.jpg"],
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
