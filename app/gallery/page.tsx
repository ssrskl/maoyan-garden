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

import { galleryImages as data } from "@/lib/gallery-images";

export default function GalleryPage() {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(data.map((d) => ({
        id: d.id,
        src: d.src,
        alt: d.alt,
        tags: d.tags || [],
        date: new Date().toISOString().slice(0,10),
        description: d.description,
    })));

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
                                    <BreadcrumbLink href="/gallery" className='font-bold text-foreground'>影函</BreadcrumbLink>
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


                    {/* 瀑布流展示 */}
                    <motion.div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-6" variants={containerVariants}>
                        {filteredImages.map((image) => (
                            <motion.div key={image.id} variants={itemVariants} className="break-inside-avoid mb-4 group overflow-hidden rounded-lg bg-muted shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="relative">
                                    <PhotoView src={image.src}>
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03] cursor-pointer"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </PhotoView>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end">
                                        <div className="p-4 text-white w-full">
                                            {image.description && <p className="text-sm leading-relaxed">{image.description}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 flex justify-between items-center">
                                    <span className="text-xs text-muted-foreground">{new Date(image.date).toLocaleDateString()}</span>
                                    <div className="flex gap-1">
                                        {image.tags.map((tag) => (
                                            <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{tag}</span>
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
                            <p className="text-muted-foreground text-lg">没有找到符合条件的图片</p>
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
