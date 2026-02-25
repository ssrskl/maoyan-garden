"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun, Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const THEMES = [
  { value: "light", label: "明亮", icon: "☀️" },
  { value: "dark", label: "暗色", icon: "🌙" },
  { value: "system", label: "跟随系统", icon: "💻" },
  { value: "bai-li-wu-se", label: "白立五色", icon: "🎨" },
] as const;

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const Icon =
    resolvedTheme === "bai-li-wu-se" ? Palette
      : resolvedTheme === "dark" ? Moon
        : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-base w-8 h-8 p-2 rounded-lg hover:bg-gray-200 cursor-pointer hover:animate-wiggle">
          <Icon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">切换主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              theme === t.value && "font-semibold"
            )}
          >
            <span className="text-sm">{t.icon}</span>
            <span className="flex-1">{t.label}</span>
            {theme === t.value && <Check className="h-3.5 w-3.5 ml-1 opacity-70" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
