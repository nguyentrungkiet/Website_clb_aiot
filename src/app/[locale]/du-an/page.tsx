import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";

export default async function ProjectsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  const projects = getAllPosts("projects", locale);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-white dark:bg-card">
        <section className="bg-navy dark:bg-card py-20 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">{t("title")}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto relative z-10">
            {t("desc")}
          </p>
        </section>

        <section className="py-16 container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length === 0 && (
              <p className="text-center text-gray-500 py-10 col-span-full">Dự án đang được cập nhật...</p>
            )}
            {projects.map((project) => (
              <Link href={`/du-an/${project.slug}`} key={project.slug}>
                <div className="group rounded-2xl border border-border bg-white dark:bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="h-48 relative w-full flex items-center justify-center overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <span className="text-xs font-bold text-[#05A6C8] uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
                    {project.status && (
                      <div className="mt-auto">
                        <div className="inline-block px-3 py-1 bg-background text-[#1767A6] text-xs font-semibold rounded-full">
                          {project.status}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
