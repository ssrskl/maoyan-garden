import { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "关于我 | 猫颜的数字花园",
  description: "关于猫颜 (Maoyan) 的故事、技能和技术旅程。",
};

export default function AboutPage() {
  return (
      <AboutContent />
  );
}