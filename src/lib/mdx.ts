import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
  description: string;
  status?: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

/**
 * Lấy tất cả bài viết của một mục (VD: 'news' hoặc 'projects') theo ngôn ngữ
 */
export function getAllPosts(type: 'news' | 'projects', locale: string): PostMeta[] {
  const directory = path.join(contentDir, type, locale);
  
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);
  
  const posts = files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(directory, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      const slug = file.replace(/\.mdx?$/, '');
      
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        image: data.image || '/logo.png',
        category: data.category || '',
        description: data.description || '',
        status: data.status || '',
      };
    });

  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Lấy nội dung chi tiết của một bài viết dựa vào slug
 */
export function getPostBySlug(type: 'news' | 'projects', locale: string, slug: string): Post | null {
  const directory = path.join(contentDir, type, locale);
  
  let filePath = path.join(directory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(directory, `${slug}.md`);
  }
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title || '',
      date: data.date || '',
      image: data.image || '/logo.png',
      category: data.category || '',
      description: data.description || '',
      status: data.status || '',
    },
    content,
  };
}
