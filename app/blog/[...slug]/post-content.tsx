"use client"

import { MDXContent } from "@/components/mdx-components";
import { Tag } from "@/components/tag";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideUp, staggerContainer } from "@/styles/animation";
import { Post } from "#site/content";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MdOutlineDateRange } from "react-icons/md";
import { toFromNow } from "@/lib/time";
import { ArrowUp } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaLink } from "react-icons/fa6";
import { SiFacebook, SiGmail, SiSinaweibo, SiTencentqq, SiWechat, SiX, SiZhihu } from "react-icons/si";
import ShareButton from "./ShareButton";
import TableOfContents from "@/components/table-of-contents";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import Giscus from "@giscus/react";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 向下滚动时显示按钮，向上滚动时隐藏按钮
      if (currentScrollY > lastScrollY) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className="flex justify-center pt-10 w-full">
      <div className="flex md:w-2/3 lg:w-2/3 w-full max-w-screen-xl px-4">
        <div className="gap-5 flex flex-col justify-center w-full">
          <motion.div
            className="gap-5 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">文章</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className='font-bold text-black'>{post.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className='flex'>
              {/* 内容 */}
              <motion.div
                className='w-full lg:w-3/4'
                variants={slideUp}
              >
                <div className='lg:border-r-2 lg:border-gray-200 pt-16 lg:pr-6'>
                  <motion.div
                    className="text-3xl font-bold mt-4"
                    variants={slideUp}
                  >
                    {post.title}
                  </motion.div>
                  {/* 状态 */}
                  <motion.div
                    className="flex items-center flex-wrap gap-x-4 gap-y-2 my-6"
                    variants={slideUp}
                  >
                    <StatusBadge status={post.status} />
                    <div className="flex items-center text-gray-500 text-sm">
                      <MdOutlineDateRange className="mr-1" />
                      {toFromNow(Date.parse(post.date))}
                    </div>
                  </motion.div>
                  {/* 标签 */}
                  <motion.div
                    className='flex flex-wrap gap-2 my-6'
                    variants={staggerContainer}
                  >
                    {post.tags?.map((tag: any, index: number) => (
                      <Tag tag={tag} key={index} />
                    ))}
                  </motion.div>
                  <motion.div
                    className="flex items-center text-gray-500 text-sm my-2"
                    variants={slideUp}
                  >
                    <MdOutlineDateRange className="mr-1" />
                    {toFromNow(Date.parse(post.date))}
                  </motion.div>

                  {/* 目录，只在移动视图中显示 */}
                  <motion.div
                    className="mt-4 lg:hidden"
                    variants={slideUp}
                  >
                    <TableOfContents />
                  </motion.div>

                  <motion.div
                    className="mt-6 prose prose-slate max-w-none dark:prose-invert"
                    variants={slideUp}
                  >
                    <MDXContent code={post.body} />
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold mt-12 mb-4">评论</div>
                      <Giscus
                        id="comments"
                        repo="ssrskl/maoyan-garden"
                        repoId="R_kgDOPGLUOA"
                        category="Announcements"
                        categoryId="DIC_kwDOPGLUOM4CuM02"
                        mapping="pathname"
                        strict="0"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="bottom"
                        theme="light"
                        lang="zh-CN"
                        loading="eager"
                      />
                    </div>

                  </motion.div>
                </div>
              </motion.div>
              {/* 侧边栏 */}
              <motion.div
                className="hidden lg:flex lg:flex-col pl-8 pt-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-xl my-10">作者</div>
                <motion.div
                  className="flex items-center space-x-3 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                >
                  <Avatar>
                    <AvatarImage src='/avatar.png' />
                  </Avatar>
                  <div className="flex flex-col space-y-3 ">
                    <div className="font-bold text-sm">猫颜</div>
                    <div className="text-sm text-zinc-500">
                      一花一世界，一叶一追寻
                    </div>
                  </div>
                </motion.div>
                <div className="text-xl my-10">分享至</div>
                <motion.ul
                  className="grid grid-cols-4 gap-2 list-none"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { icon: <FaLink />, platform: '复制链接' },
                    { icon: <SiTencentqq />, platform: 'QQ' },
                    { icon: <SiWechat />, platform: '微信' },
                    { icon: <SiSinaweibo />, platform: '微博' },
                    { icon: <SiX />, platform: 'X' },
                    { icon: <SiFacebook />, platform: 'Facebook' },
                    { icon: <SiGmail />, platform: 'Gmail' },
                    { icon: <SiZhihu />, platform: '知乎' }
                  ].map((shareItem, index) => (
                    <motion.li
                      key={index}
                      variants={slideUp}
                    >
                      <ShareButton
                        icon={shareItem.icon}
                        platform={shareItem.platform}
                        title={post.title}
                      />
                    </motion.li>
                  ))}
                </motion.ul>
                {/* 桌面版目录 */}
                <motion.div
                  className='sticky top-32 mt-16 max-w-64'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <TableOfContents />
                </motion.div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-8 right-14 md:right-8 lg:right-8 bg-primary text-white p-2 rounded-full shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}