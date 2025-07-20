import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post } from "#site/content";
import { slug } from "github-slugger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}
  posts.forEach(post => {
    if (post.published) {
      post.tags?.forEach(tag => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      })
    }
  })

  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  // 对传入的 tag 进行解码，确保中文能够正确匹配
  const decodedTag = decodeURIComponent(tag);
  
  return posts.filter(post => {
    if (!post.tags) return false
    
    // 对每个标签创建 slug，并检查是否匹配
    const slugifiedTags = post.tags.map(tag => slug(tag))
    
    // 同时检查原始标签值（对于中文）和 slug 值（对于英文）
    return slugifiedTags.includes(decodedTag) || post.tags.some(t => slug(t) === decodedTag);
  })
}