import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default async function NewsDetailPage(
  props: { params: Promise<{ locale: string; slug: string }> }
) {
  const params = await props.params;
  const { locale, slug } = params;
  
  const post = getPostBySlug("news", locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-background">
        <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
          <Link href="/tin-tuc" className="inline-flex items-center text-[#1767A6] hover:underline mb-8 font-medium">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Quay lại
          </Link>
          
          <header className="mb-10 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="text-xs font-bold text-white bg-[#05A6C8] px-3 py-1 rounded-full uppercase tracking-wider">
                {post.meta.category}
              </span>
              <div className="flex items-center text-sm text-gray-500 font-medium">
                <Calendar className="w-4 h-4 mr-1" />
                {post.meta.date}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.meta.title}
            </h1>
          </header>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl border border-border">
            <Image 
              src={post.meta.image} 
              alt={post.meta.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>

          {/* Prose class provided by @tailwindcss/typography */}
          <div className="prose prose-lg dark:prose-invert prose-headings:text-[#1767A6] max-w-none mx-auto">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
