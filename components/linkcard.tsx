import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface LinkCardProps {
  href: string;
}

export function LinkCard({
  href,
  ...props
}: LinkCardProps) {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    <a href={href} target="_blank">{href}</a>
                </CardTitle>
            </CardHeader>
        </Card>
    </div>
  );
}
