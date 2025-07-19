// components/book-card.tsx
import { Card } from "@/components/ui/card";
import Image, { type StaticImageData } from "next/image"; // 1. 导入 StaticImageData 类型
import Link from "next/link";
import { Star, BookOpen } from "lucide-react";

interface BookCardProps {
    href: string;
    coverImage: string | StaticImageData; // 2. 修改类型以接受静态图片
    title: string;
    author: string;
    rating: number;
    summary: string;
    tags?: string[];
}

export function BookCard({
    href,
    coverImage,
    title,
    author,
    rating,
    summary,
    tags,
}: BookCardProps) {
    return (
        <Link href={href} target="_blank" className="no-underline group">
            <Card className="flex flex-col md:flex-row items-start gap-6 p-6 my-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/50">
                {/* 书籍封面 */}
                <div className="flex-shrink-0 w-full md:w-1/4 flex justify-center">
                    <div className="relative w-[150px] h-[225px] shadow-2xl group-hover:scale-105 transition-transform duration-300 ease-in-out">
                        <Image
                            src={coverImage} // 3. 无需其他更改，Next.js 的 Image 组件能直接处理
                            alt={`${title} 封面`}
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>

                {/* 书籍信息 (这部分保持不变) */}
                <div className="flex flex-col gap-3 flex-1">
                    <div className="text-2xl font-bold text-primary group-hover:text-primary/90">
                        {title}
                    </div>
                    <p className="text-md text-muted-foreground font-medium">作者：{author}</p>

                    <div className="flex items-center gap-1.5" title={`评分: ${rating} / 5`}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                size={20}
                                className={`transition-colors duration-300 ${i < Math.round(rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                    }`}
                            />
                        ))}
                        <span className="text-sm font-semibold text-muted-foreground ml-2">({rating.toFixed(1)})</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {summary}
                    </p>


                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {tags.map((tag) => (
                                <div key={tag} className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex items-center text-sm text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <BookOpen className="mr-2" size={16} />
                        查看详情
                    </div>
                </div>
            </Card>
        </Link>
    );
}