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


export function SiteHeader() {
  const scroll = useScroll(() => document);
  // const [searchOpen, setSearchOpen] = useState(false);
  return (
    // <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    //   <div className="container flex h-14 max-w-screen-2xl items-center">
    //     <MainNav />
    //     <div className="flex flex-1 items-center justify-end space-x-2">
    //       <nav className="flex items-center">
    //         <Link
    //           href={siteConfig.links.github}
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           <div
    //             className={cn(
    //               buttonVariants({ variant: "ghost" }),
    //               "w-10 px-0 hidden sm:inline-flex"
    //             )}
    //           >
    //             <Icons.gitHub className="h-4 w-4" />
    //             <span className="sr-only">GitHub</span>
    //           </div>
    //         </Link>
    //         <Link
    //           href={siteConfig.links.twitter}
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           <div
    //             className={cn(
    //               buttonVariants({ variant: "ghost" }),
    //               "w-10 px-0 hidden sm:inline-flex"
    //             )}
    //           >
    //             <Icons.twitter className="h-4 w-4" />
    //             <span className="sr-only">Twitter</span>
    //           </div>
    //         </Link>
    //         <ModeToggle />
    //         <MobileNav />
    //       </nav>
    //     </div>
    //   </div>
    // </header>
    <>
      <header
        className={cn(
          "w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0  flex justify-center z-10",
          (scroll?.top ?? 0) > 60 && "bg-background/50 border-b border-border/70"
        )}
      >
        <div className="w-full flex items-center h-16 p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
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
          <div className="h-16 flex-1 hidden sm:flex justify-end items-center gap-12 text-base font-medium mr-8">
            <Link href="/" className="hidden sm:flex hover:text-primary hover:font-bold hover:underline">主页</Link>
            <Link href="/blog" className="hidden sm:flex hover:text-primary hover:font-bold hover:underline">博客</Link>
            <Link href="/tags" className="hidden sm:flex hover:text-primary hover:font-bold hover:underline">标签</Link>
            {/* <Link href="/markdown-demo" className="hidden sm:flex hover:text-primary hover:font-bold hover:underline">测试</Link> */}
            <Link href="/about" className="hidden sm:flex hover:text-primary hover:font-bold hover:underline">关于我</Link>
          </div>

          <div className="flex sm:flex-none justify-end items-center space-x-2">
            <FaGithub
              className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:animate-wiggle"
              onClick={() => window.open("https://github.com/ssrskl")}
            />
            <FaRegLightbulb className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:animate-wiggle" />
            <Link href="/tags" className="sm:hidden">
              <FaTags className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:animate-wiggle" />
            </Link>
            <SiSearxng
              className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:animate-wiggle"
              onClick={() => {
                // setSearchOpen(true);
              }}
            />
          </div>
        </div>
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
