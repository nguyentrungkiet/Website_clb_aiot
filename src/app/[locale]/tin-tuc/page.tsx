import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getAllPosts } from "@/lib/mdx";

export default async function NewsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "NewsPage" });

  // Get posts from MDX
  const posts = getAllPosts("news", locale);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white dark:bg-card">
        <ScrollReveal direction="none">
          <section className="bg-background py-20 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("title")}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("desc")}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <section className="py-16 container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid gap-8">
              {posts.length === 0 && (
                <p className="text-center text-gray-500 py-10">Bài viết đang được cập nhật...</p>
              )}
              {posts.map((post) => (
                <Link href={`/tin-tuc/${post.slug}`} key={post.slug}>
                  <div className="flex flex-col md:flex-row bg-white dark:bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer h-full">
                    <div className="w-full md:w-1/3 min-h-[200px] relative overflow-hidden flex items-center justify-center">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs font-bold text-white bg-secondary px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                        <div className="flex items-center text-sm text-gray-500 font-medium">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{post.description}</p>
                      <div className="mt-auto">
                        <span className="inline-flex items-center text-primary font-semibold">
                          {t("read_more")} <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
