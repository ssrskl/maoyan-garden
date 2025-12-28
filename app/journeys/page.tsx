
"use client";

import { motion } from "framer-motion";
import { containerVariants, fadeInUp, itemVariants } from "@/styles/animation";
import { Timeline } from "@/components/timeline";
import { timelineData } from "@/config/timeline";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function JourneysPage() {
  return (
    <motion.div
      className="flex justify-center pt-10 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="gap-5 flex flex-col justify-center px-6 w-full">
          {/* Header Section */}
          <motion.div className="gap-5 flex flex-col justify-center items-center text-center" variants={fadeInUp}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/journeys" className="font-bold text-black dark:text-white">成长历程</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-2xl mx-auto space-y-4">
              <motion.h1 className="text-4xl font-bold my-4" variants={itemVariants}>
                成长·足迹
              </motion.h1>
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
                这里记录了我作为开发者和探索者的每一个重要里程碑。
                <br />
                每一步都算数。
              </motion.p>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div variants={itemVariants} className="mt-8">
            <Timeline items={timelineData} />
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}