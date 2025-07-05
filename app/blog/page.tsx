"use client"
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MdOutlineDateRange, MdOutlineRemoveRedEye } from "react-icons/md";
import { toFromNow } from "@/lib/time";
import Link from "next/link";
import { containerVariants, fadeInUp, itemVariants } from "@/styles/animation";

// export const metadata: Metadata = {
//   title: "My blog",
//   description: "This is a description",
// };

const POSTS_PER_PAGE = 8;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <motion.div
      className="flex justify-center pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex md:w-2/3 sm:w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="gap-5 flex flex-col justify-center px-6 w-full">
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
                  <BreadcrumbLink href="/" className='font-blod text-black'>博客</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <motion.h1
              className="text-4xl font-bold my-4"
              variants={itemVariants}
            >
              文章
            </motion.h1>
            <motion.p variants={itemVariants}>
            文以载道，言以明志。
            </motion.p>
          </motion.div>

          {/* 博客文章列表 */}

          <motion.ul
            className="columns-1 md:columns-2 gap-4 w-full mt-6 list-none space-y-4"
            variants={containerVariants}
          >
            {displayPosts.length > 0 ? (
              displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <motion.li
                    key={slug}
                    className="rounded-lg break-inside-avoid mb-4"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </motion.li>
                )
              })
            ) : (
              <div>暂无数据</div>
            )}
            
          </motion.ul>

          {/* 分页器 */}
          {totalPages > 1 && (
            <QueryPagination 
              totalPages={totalPages} 
              className="justify-end mt-4"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
