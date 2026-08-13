import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, ChevronLeft, Tag } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = await props.params;
  const post = getPostBySlug("projects", params.locale, params.slug);
  if (!post) return { title: "Không tìm thấy dự án" };
  
  return {
    title: `${post.meta.title} | AIOT Club Projects`,
    description: post.meta.description,
    openGraph: {
      images: [post.meta.image]
    }
  };
}

export default async function ProjectDetailPage(
  props: { params: Promise<{ locale: string; slug: string }> }
) {
  const params = await props.params;
  const { locale, slug } = params;
  
  const post = getPostBySlug("projects", locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-background">
        <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
          <Link href="/du-an" className="inline-flex items-center text-primary hover:underline mb-8 font-medium">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Quay lại Dự án
          </Link>
          
          <header className="mb-10 text-center">
            <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
              <span className="text-xs font-bold text-white bg-secondary px-3 py-1 rounded-full uppercase tracking-wider">
                {post.meta.category}
              </span>
              {post.meta.status && (
                <span className="inline-flex items-center px-3 py-1 bg-muted text-primary text-xs font-semibold rounded-full">
                  <Tag className="w-3 h-3 mr-1" />
                  {post.meta.status}
                </span>
              )}
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
          <div className="prose prose-lg dark:prose-invert prose-headings:text-primary max-w-none mx-auto">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
