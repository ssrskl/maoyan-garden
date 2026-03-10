import React from 'react';
import Image from 'next/image';

interface SplitLayoutProps {
    children: React.ReactNode;
    layout?: "1/3" | "1/2" | "1/4";
    image?: string;
    imageAlt?: string;
    reverse?: boolean;
    className?: string;
}

const layoutClass = {
    "1/3": "w-full md:w-1/3",
    "1/2": "w-full md:w-1/2",
    "1/4": "w-full md:w-1/4",
};

// 主容器组件
export const SplitLayout = ({ children, image, imageAlt = "Illustration", layout = "1/2", reverse = false, className }: SplitLayoutProps) => {
    // 将子元素转换为数组，方便处理
    const childrenArray = React.Children.toArray(children);
    const imageContainer = (src: string) => (
        <div className={`${layoutClass[layout]} overflow-hidden rounded-2xl border border-border/70 shadow-[var(--shadow-soft)] relative aspect-[4/3]`}>
            <Image
                src={src}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
            />
        </div>
    );
    
    // 如果有image属性，说明是图片+内容的布局
    if (image) {
        return (
            <div className={`flex flex-col md:flex-row items-center justify-center gap-4 ${className}`}>
                {!reverse ? (
                    <>
                        {imageContainer(image)}
                        <div className={`${layout === "1/2" ? layoutClass[layout] : "w-full md:w-2/3"} overflow-hidden`}>
                            {children}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`${layout === "1/2" ? layoutClass[layout] : "w-full md:w-2/3"} overflow-hidden`}>
                            {children}
                        </div>
                        {imageContainer(image)}
                    </>
                )}
            </div>
        );
    }
    
    // 如果有两个子元素，说明是内容+内容的布局
    if (childrenArray.length === 2) {
        return (
            <div className={`flex flex-col md:flex-row items-center justify-center gap-4 p-2 ${className}`}>
                {!reverse ? (
                    <>
                        <div className={`${layoutClass[layout]} overflow-hidden`}>
                            {childrenArray[0]}
                        </div>
                        <div className={`${layout === "1/2" ? layoutClass[layout] : "w-full md:w-2/3"} overflow-hidden`}>
                            {childrenArray[1]}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`${layout === "1/2" ? layoutClass[layout] : "w-full md:w-2/3"} overflow-hidden`}>
                            {childrenArray[1]}
                        </div>
                        <div className={`${layoutClass[layout]} overflow-hidden`}>
                            {childrenArray[0]}
                        </div>
                    </>
                )}
            </div>
        );
    }
    
    // 默认情况，只显示子元素
    return (
        <div className={`p-2 ${className}`}>
            {children}
        </div>
    );
};

// 并排图片组件
interface SplitImageProps {
    src1: string;
    src2: string;
    layout?: "1/3" | "1/2" | "1/4";
    className?: string;
}

export const SplitImage = ({ src1, src2, layout = "1/2", className }: SplitImageProps) => {
    return (
        <div className={`flex flex-col md:flex-row items-center justify-center gap-4 p-2 ${className}`}>
            <div className={`${layoutClass[layout]} overflow-hidden rounded-2xl border border-border/70 shadow-[var(--shadow-soft)] relative aspect-[4/3]`}>
                <Image src={src1} alt="Split image A" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className={`${layout === "1/2" ? layoutClass[layout] : "w-full md:w-2/3"} overflow-hidden rounded-2xl border border-border/70 shadow-[var(--shadow-soft)] relative aspect-[4/3]`}>
                <Image src={src2} alt="Split image B" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
        </div>
    );
};

export default SplitLayout; 
