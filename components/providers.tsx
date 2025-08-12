"use client";

import { ThemeProvider } from "next-themes";
import { PhotoProvider } from "react-photo-view";
import { ReactNode } from "react";
import { Toaster } from "./ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PhotoProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        // disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster position="top-center"/>
    </PhotoProvider>
  );
}
