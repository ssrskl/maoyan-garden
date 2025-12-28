
import { Rocket, Star, Code, GraduationCap, Briefcase, Heart } from "lucide-react";

export type TimelineEvent = {
  id: number;
  date: string;
  title: string;
  description: string;
  icon?: any; // Lucide icon component
  link?: string;
  linkText?: string;
};

export const timelineData: TimelineEvent[] = [
  {
    id: 1,
    date: "2024-03-01",
    title: "Maoyan Garden 诞生",
    description: "建立了这个数字花园，开始记录学习成长的点滴。选择了 Next.js 和 Velite 作为技术栈。",
    icon: Rocket,
  },
  {
    id: 2,
    date: "2023-12-01",
    title: "深入 React 生态",
    description: "开始系统性学习 Next.js App Router 和服务端组件，探索现代前端开发的最佳实践。",
    icon: Code,
  },
  {
    id: 3,
    date: "2023-06-15",
    title: "我的第一个开源贡献",
    description: "向一个喜欢的开源项目提交了第一个 PR 并被合并，感受到了开源社区的魅力。",
    icon: Star,
    link: "https://github.com",
    linkText: "查看 GitHub",
  },
  {
    id: 4,
    date: "2022-09-01",
    title: "开启编程之旅",
    description: "写下了第一行 Hello World，决定踏入计算机科学的神奇世界。",
    icon: GraduationCap,
  },
];
