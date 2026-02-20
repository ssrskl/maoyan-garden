"use client"

import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerContainer } from "@/styles/animation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "#site/content";
import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";

interface TagContentProps {
  tag: string;
  posts: Post[];
  allTags: Record<string, number>;
}

export default function TagContent({ tag, posts, allTags }: TagContentProps) {
  // 解码标签，确保中文能够正确显示
  const decodedTag = decodeURIComponent(tag);
  // 尝试查找原始标签（对于中文标签）
  const originalTag = Object.keys(allTags).find(t => slug(t) === decodedTag) || decodedTag;
  // 标题使用原始标签或 slug 转换为空格分隔的文本
  const title = originalTag.includes("-") ? originalTag.split("-").join(" ") : originalTag;
  const sortedTags = sortTagsByCount(allTags);

  return (
    <div className="flex justify-center pt-10 w-full">
      <div className="flex md:w-4/5 lg:w-2/3 w-full max-w-screen-xl px-4">
        <div className="gap-5 flex flex-col justify-center w-full">
          <motion.div
            className="gap-5 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tags">标签</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/tags/${tag}`} className="font-bold text-foreground capitalize">
                    {title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className='flex flex-col lg:flex-row'>
              {/* 内容部分 */}
              <motion.div
                className='w-full lg:w-2/3'
                variants={slideUp}
              >
                <div className='lg:border-r-2 lg:border-border pt-8 lg:pr-6'>
                  <motion.div
                    className="text-4xl font-black capitalize mb-6"
                    variants={slideUp}
                  >
                    {title}
                  </motion.div>

                  <motion.div
                    className="mt-6"
                    variants={slideUp}
                  >
                    {posts?.length > 0 ? (
                      <ul className="flex flex-col">
                        {posts.map((post) => {
                          const { slug, date, title, description, tags, status } = post;
                          return (
                            <li key={slug}>
                              <PostItem
                                slug={slug}
                                date={date}
                                title={title}
                                description={description}
                                tags={tags}
                                status={status}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">此标签下暂无文章</p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
              
              {/* 侧边栏 */}
              <motion.div
                className="w-full lg:w-1/3 lg:pl-8 mt-8 lg:mt-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="sticky top-32">
                  <CardHeader>
                    <CardTitle>所有标签</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    <motion.div
                      className='flex flex-wrap gap-2'
                      variants={staggerContainer}
                    >
                      {sortedTags?.map((t) => (
                        <Tag tag={t} key={t} count={allTags[t]} current={slug(t) === decodedTag} />
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
