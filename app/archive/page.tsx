"use client";
import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  containerVariants,
  fadeInUp,
  itemVariants,
} from "@/styles/animation";
import { TimeFormatter } from "@/lib/time";
import { Tag } from "@/components/tag";

export default function ArchivePage() {
  const sorted = sortPosts(posts.filter((post) => post.published));

  const postsByYear = sorted.reduce<Record<string, typeof sorted>>(
    (acc, post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {}
  );

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <motion.div
      className="flex justify-center pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex w-full md:w-2/3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full gap-5 flex flex-col justify-center px-6">
          <motion.div
            className="gap-5 flex flex-col justify-center"
            variants={fadeInUp}
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/archive"
                    className="font-bold text-black"
                  >
                    归档
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <motion.h1
              className="text-4xl font-bold my-4"
              variants={itemVariants}
            >
              文章归档
            </motion.h1>
            <motion.p variants={itemVariants}>
              在这里，时光被镌刻成了文字。
            </motion.p>
          </motion.div>

          <div className="mt-8">
            {years.map((year) => (
              <motion.div key={year} className="mb-12" variants={fadeInUp}>
                <h2 className="sticky top-16 z-10 bg-background/80 backdrop-blur-sm text-3xl font-bold mb-6 pb-2 border-b-2">
                  {year}
                </h2>
                <ul className="flex flex-col">
                  {postsByYear[year].map((post) => (
                    <motion.li
                      key={post.slug}
                      variants={itemVariants}
                      whileHover={{x:10}}
                      className="py-1"
                    >
                      {/* --- 主要响应式布局改动点 --- */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        {/* 左侧：日期和标题 */}
                        <div className="flex items-baseline gap-4">
                          <span className="text-muted-foreground text-sm font-mono flex-shrink-0">
                            {post.date.substring(5, 10)}
                          </span>
                          <Link
                            href={`/${post.slug}`}
                            className="font-medium text-lg hover:text-primary transition-colors truncate"
                            title={post.title}
                          >
                            {post.title}
                          </Link>
                        </div>

                        {/* 右侧：标签 (在小屏幕上会换行) */}
                        <div className="flex items-center gap-2 flex-shrink-0 pt-2 sm:pt-0 pl-12 sm:pl-0">
                          {post.tags?.map((tag) => (
                            <Tag key={tag} tag={tag} />
                          ))}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}