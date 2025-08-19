"use client"
import { useState, useEffect } from "react";
import {
  Heart,
  Share2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { toFromNow } from "@/lib/time";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { containerVariants, fadeInUp, itemVariants } from "@/styles/animation";
import { PhotoView } from "react-photo-view";
import {Moment,initialMoments} from "./moments"

// 格式化时间显示
const formatTime = (date: Date) => {
  return toFromNow(date);
};

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>(initialMoments);

  // 处理点赞（仅展示效果，不实际提交）
  const handleLike = (momentId: string) => {
    setMoments(moments.map(moment => {
      if (moment.id === momentId) {
        return {
          ...moment,
          liked: !moment.liked,
          likes: moment.liked ? moment.likes - 1 : moment.likes + 1
        };
      }
      return moment;
    }));
  };

  return (
    <motion.div
      className="flex justify-center pt-10 pb-20"
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
                <BreadcrumbLink href="/moments" className='font-bold text-black'>瞬华</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <motion.h1
            className="text-4xl font-bold my-4"
            variants={itemVariants}
          >
            瞬华
          </motion.h1>
          <motion.p variants={itemVariants}>
            墨染风云呈画卷，文描岁月载沧桑
          </motion.p>
          <main className="">
            {/* 朋友圈动态列表 */}
            {[...moments].reverse().map((moment) => (
              <motion.article
                key={moment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 mb-12"
              >
                {/* 作者信息 */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 relative">
                    <AvatarImage src={"/avatar.png"} />
                    <AvatarFallback>MY</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{moment.user.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
                      <span>{formatTime(moment.timestamp)}</span>
                      {moment.location && (
                        <>
                          <span>·</span>
                          <span>{moment.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 内容 */}
                {moment.content && (
                  <div className="mt-2 text-gray-900 whitespace-pre-line">
                    {moment.content}
                  </div>
                )}

                {/* 图片 */}
                {moment.images && moment.images.length > 0 && (
                  <div className={`grid w-4/5 gap-3 mt-3 grid-cols-3 p-3`}>
                    {moment.images.map((src, index) => (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden rounded-md bg-gray-100 relative group cursor-zoom-in"
                      >
                        <PhotoView src={src}>
                          <img
                            src={src}
                            alt={`动态图片 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </PhotoView>
                      </div>
                    ))}
                  </div>
                )}

                {/* 互动按钮 */}
                <div className="flex justify-start space-x-60 items-center mt-4 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(moment.id)}
                    className={`flex items-center gap-1 text-sm px-4 py-1 rounded-full transition-colors ${moment.liked
                      ? 'text-red-500 hover:bg-red-50'
                      : 'text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    <Heart className={`h-4 w-4 ${moment.liked ? 'fill-red-500' : ''}`} />
                    <span>点赞</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm px-4 py-1 rounded-full text-gray-500 hover:bg-gray-50 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>分享</span>
                  </button>
                </div>

                {/* 点赞数 */}
                {moment.likes > 0 && (
                  <div className="mt-3 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{moment.likes}</span> 人觉得很赞
                  </div>
                )}
              </motion.article>
            ))}
          </main>

        </motion.div>
      </motion.div>
    </motion.div>
  );
}
