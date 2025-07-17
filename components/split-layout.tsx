import React from 'react';
import Image from 'next/image';

interface SplitLayoutProps {
    children: React.ReactNode;
    layout?: "1/3" | "1/2" | "1/4";
    image: string;
    className?: string;
}

const layoutClass = {
    "1/3": "w-full md:w-1/3",
    "1/2": "w-full md:w-1/2",
    "1/4": "w-full md:w-1/4",
};

// 主容器组件
export const SplitLayout = ({ children, image, layout = "1/3", className }: SplitLayoutProps) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <img src={image} className="w-full h-full" />
            {children}
        </div>
    );
};


export default SplitLayout; 