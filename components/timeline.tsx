
"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TimelineEvent } from "@/config/timeline";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface TimelineProps {
    items: TimelineEvent[];
}

export function Timeline({ items }: TimelineProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={ref} className="relative container mx-auto px-4 py-12 max-w-4xl">
            {/* Central Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] h-full bg-border -translate-x-1/2">
                <motion.div
                    className="absolute top-0 w-full bg-primary origin-top"
                    style={{ scaleY, height: "100%" }}
                />
            </div>

            <div className="space-y-12">
                {items.map((item, index) => (
                    <TimelineItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}

function TimelineItem({ item, index }: { item: TimelineEvent; index: number }) {
    const isEven = index % 2 === 0;
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "relative flex flex-col md:flex-row gap-8 md:gap-0",
                isEven ? "md:flex-row-reverse" : ""
            )}
        >
            {/* Spacer for desktop layout */}
            <div className="hidden md:block md:w-1/2" />

            {/* Node on the line */}
            <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 bg-background rounded-full p-2 border-2 border-primary shadow-sm">
                {Icon ? <Icon className="w-5 h-5 text-primary" /> : <div className="w-5 h-5 bg-primary rounded-full" />}
            </div>

            {/* Content Card */}
            <div className={cn(
                "pl-12 md:pl-0 md:w-1/2",
                isEven ? "md:pr-12 md:text-right" : "md:pl-12"
            )}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <div className={cn("flex items-center gap-2 mb-2 text-sm text-muted-foreground", isEven ? "md:justify-end" : "")}>
                            <time>{item.date}</time>
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base mb-4">
                            {item.description}
                        </CardDescription>
                        {item.link && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    {item.linkText || "Learn more"}
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
