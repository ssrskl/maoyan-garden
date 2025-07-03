"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // 在客户端渲染后提取标题
  useEffect(() => {
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const headings: Heading[] = Array.from(headingElements).map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: parseInt(el.tagName.substring(1)),
      }));
      setHeadings(headings);
    };
    // 页面加载后提取标题
    extractHeadings();
    // 监听滚动事件来高亮当前标题
    const handleScroll = () => {
      const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();

        if (rect.top <= 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleItemClick = (id: string) => {
    // 默认行为：滚动到锚点
    const element = document.getElementById(id);
    if (element) {
      element.getBoundingClientRect();
      const scrollY = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: scrollY, behavior: 'smooth' });
    }

  };
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="mb-3 text-lg font-medium">文章目录</h3>
      <div className="space-y-1 border-l-2 border-gray-200">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-sm transition-colors hover:text-primary",
              heading.level === 1 && "font-semibold pl-2",
              heading.level === 2 && "pl-4",
              heading.level === 3 && "pl-6",
              heading.level === 4 && "pl-8",
              heading.level === 5 && "pl-10",
              heading.level === 6 && "pl-12",
              activeId === heading.id && "text-primary font-medium border-l-2 border-primary -ml-0.5"
            )}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(heading.id);
            }}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </div>
  );
} 