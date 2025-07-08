"use client"
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useScroll } from 'ahooks';
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { FaCat, FaGithub, FaRegLightbulb, FaTags } from "react-icons/fa";
import { SiSearxng } from "react-icons/si";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchDialog } from "./search-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { FaBars } from "react-icons/fa6";


export function SiteHeader() {
  const scroll = useScroll(() => document);
  const [searchOpen, setSearchOpen] = useState(false);
  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "j" && e.ctrlKey && e.metaKey) {
  //       e.preventDefault();
  //       setSearchOpen(true);
  //       return;
  //     }
  //   }
  //   window.addEventListener("keydown", down);
  //   return () => window.removeEventListener("keydown", down);
  // }, []);
  return (
    <>
      <header
        className={cn(
          "w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0  flex justify-center z-10",
          (scroll?.top ?? 0) > 60 && "bg-background/50 shadow-sm"
        )}
      >
        <div className="w-full sm:w-2/3 flex justify-between items-center h-16 p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
          <div className=" flex justify-center items-center">
            <FaCat className={"text-3xl"} />
            <Link
              href={"/"}
              className={cn("mr-4 hidden sm:flex")}
              aria-label={"猫颜"}
            >
              <span className="ml-2 font-semibold text-primary text-base">
                {"猫颜的数字花园"}
              </span>
            </Link>
          </div>

          <div className="flex justify-center items-center">
            <div className="h-16  flex justify-end items-center gap-4 sm:gap-12 text-base font-medium mr-8">
              <Link href="/" className=" flex hover:text-primary hover:font-bold hover:underline">主页</Link>
              <Link href="/blog" className=" flex hover:text-primary hover:font-bold hover:underline">文章</Link>
              <Link href="/tags" className=" flex hover:text-primary hover:font-bold hover:underline">标签</Link>
              <Link href="/about" className=" flex hover:text-primary hover:font-bold hover:underline">关于我</Link>
            </div>

            <div className="flex justify-end items-center space-x-2">
              <FaGithub
                className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:animate-wiggle"
                onClick={() => window.open("https://github.com/ssrskl")}
              />
              <ModeToggle />
              <Link href="/search">
                <SiSearxng className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:animate-wiggle" />
              </Link>
            </div>
          </div>

        </div>
        {/* <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} /> */}
      </header>
      {/* <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} /> */}

      {/* 添加摆动动画的样式 */}
      <style>{`
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        .hover\\:animate-wiggle:hover {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
