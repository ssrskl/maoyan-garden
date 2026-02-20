"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useScroll } from "ahooks";
import { ModeToggle } from "./mode-toggle";
import { FaCat, FaGithub } from "react-icons/fa";
import { SiSearxng } from "react-icons/si";
import { MobileNav } from "./mobile-nav";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import CommandPalette from "./command-palette";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const scroll = useScroll(() => document);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  useEffect(() => {
    try {
      setIsMac(navigator.platform.toUpperCase().includes("MAC"));
    } catch {}
  }, []);
  return (
    <>
      <header
        className={cn(
          "w-full sticky top-0 backdrop-blur transition-[background-color,border-width] border-x-0 flex justify-center z-50",
          (scroll?.top ?? 0) > 60 && "bg-background/50 shadow-sm"
        )}
      >
        <div className="w-full sm:w-2/3 flex justify-between items-center h-16 p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
          {/* Left side: Logo and Site Name */}
          <div className="flex justify-center items-center">
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

          {/* Right side: Desktop Nav and Icons */}
          <div className="flex items-center space-x-4">
            {/* --- 2. Desktop Navigation (hidden on small screens) --- */}
            <nav className="hidden sm:flex items-center gap-3 sm:gap-6 text-base font-medium">
              <Link href="/" className="hover:text-primary hover:font-bold transition-colors">主页</Link>
              <Link href="/blog" className="hover:text-primary hover:font-bold transition-colors">文章</Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hover:text-primary hover:font-bold transition-colors cursor-pointer">花园</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/archive" className="hover:text-primary hover:font-bold transition-colors cursor-pointer">藏籍</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/tags" className="hover:text-primary hover:font-bold transition-colors cursor-pointer">标笺</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/gallery" className="hover:text-primary hover:font-bold transition-colors cursor-pointer">影函</Link>
                  </DropdownMenuItem>   
                  <DropdownMenuItem asChild>
                    <Link href="/moments" className="hover:text-primary hover:font-bold transition-colors cursor-pointer">瞬华</Link>
                  </DropdownMenuItem>   
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/about" className="hover:text-primary hover:font-bold transition-colors">关于我</Link>
            </nav>

            <div className="flex items-center space-x-2">
              <FaGithub
                className="text-base w-8 h-8 p-2 rounded-lg hover:bg-accent cursor-pointer hover:animate-wiggle"
                onClick={() => window.open("https://github.com/ssrskl")}
              />
              <ModeToggle />
              <button onClick={() => setCmdOpen(true)} aria-label="命令面板" className="flex items-center">
                <SiSearxng className="text-base w-8 h-8 p-2 rounded-lg hover:bg-accent cursor-pointer hover:animate-wiggle" />
              </button>
              <span className="hidden md:inline-flex items-center text-xs text-muted-foreground border rounded px-2 py-1">
                {isMac ? "⌘" : "Ctrl"} K
              </span>

              {/* --- 3. Mobile Navigation (only visible on small screens) --- */}
              <div className="sm:hidden">
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Your wiggle animation style remains unchanged */}
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
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
}
      
