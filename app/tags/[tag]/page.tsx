import { posts } from "#site/content";
import { getAllTags, getPostsByTagSlug } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";
import TagContent from "./tag-content";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  // 使用标签的原始值和 slug 值创建路径
  const paths = Object.keys(tags).map((tag) => {
    // 为标签创建 slug 路径
    const slugPath = { tag: slug(tag) };
    return slugPath;
  });
  return paths;
};

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const allPosts = getPostsByTagSlug(posts, tag);
  const displayPosts = allPosts.filter((post) => post.published);
  const tags = getAllTags(posts);

  return <TagContent tag={tag} posts={displayPosts} allTags={tags} />;
}
