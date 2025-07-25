"use client"
import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { posts } from "#site/content";
import { Tag } from "@/components/tag";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import { containerVariants, fadeInUp, itemVariants } from "@/styles/animation";

export default async function TagsPage() {
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
                  <BreadcrumbLink href="/" className='font-blod text-black'>标签</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <motion.h1
              className="text-4xl font-bold my-4"
              variants={itemVariants}
            >
              标签
            </motion.h1>
            <motion.p variants={itemVariants}>
              片叶不知秋，孤木不成林
            </motion.p>
          </motion.div>
          <motion.div className="my-3 border-b" variants={itemVariants} />
          <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
            {sortedTags?.map((tag) => (
              <Tag tag={tag} count={tags[tag]} key={tag} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>


  );
}