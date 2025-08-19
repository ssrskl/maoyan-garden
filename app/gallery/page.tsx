"use client"
import { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import { containerVariants, fadeInUp, itemVariants } from "@/styles/animation";
import { PhotoView } from "react-photo-view";

// 定义相册图片类型
interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    tags: string[];
    date: string;
    description?: string;
}

// 模拟相册数据 - 实际项目中可以从API或本地文件加载
const galleryImages: GalleryImage[] = [
    {
        id: "1",
        src: "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/gallery/shanghai-1.jpg?x-oss-process=image/quality,q_80",
        alt: "红绿交错",
        tags: ["自然", "风景"],
        date: "2025-03-02",
        description: "偶步西廊下，幽兰一朵开"
    }
];

export default function GalleryPage() {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(galleryImages);

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
                                    <BreadcrumbLink href="/gallery" className='font-bold text-black'>影函</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <motion.h1
                            className="text-4xl font-bold my-4"
                            variants={itemVariants}
                        >
                            影函
                        </motion.h1>
                        <motion.p variants={itemVariants}>
                            人面不知何处去，桃花依旧笑春风
                        </motion.p>
                    </motion.div>


                    {/* 相册展示网格 */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                        variants={containerVariants}
                    >
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                variants={itemVariants}
                                className="group relative overflow-hidden rounded-lg bg-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="relative aspect-video overflow-hidden">
                                    <PhotoView src={image.src}>
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                                        />
                                    </PhotoView>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
                                        <div className="p-4 text-white">
                                            <h3 className="font-bold text-lg">{image.alt}</h3>
                                            {image.description && (
                                                <p className="text-sm text-gray-200">{image.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        {new Date(image.date).toLocaleDateString()}
                                    </span>
                                    <div className="flex gap-1">
                                        {image.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-gray-200 px-2 py-0.5 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* 空状态提示 */}
                    {filteredImages.length === 0 && (
                        <motion.div
                            className="flex flex-col items-center justify-center py-20 text-center"
                            variants={fadeInUp}
                        >
                            <p className="text-gray-500 text-lg">没有找到符合条件的图片</p>
                            <button
                                onClick={() => setActiveTag(null)}
                                className="mt-4 text-primary hover:underline"
                            >
                                查看全部图片
                            </button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}