"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaEnvelope,
  FaGithub,
  FaJava,
  FaReact,
  FaServer,
  FaBrain,
} from "react-icons/fa";
import { SiBilibili, SiJuejin, SiSpring } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/styles/animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// 子组件：技能卡片
const SkillCard = ({
  icon,
  title,
  skills,
}: {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}) => (
  <motion.div variants={itemVariants}>
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </CardContent>
    </Card>
  </motion.div>
);

// 子组件：时间线
const TimelineItem = ({
  date,
  title,
  description,
  isLast = false,
}: {
  date: string;
  title: string;
  description: string;
  isLast?: boolean;
}) => (
  <motion.li variants={itemVariants} className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="h-4 w-4 rounded-full bg-primary border-2 border-background ring-2 ring-primary" />
      {!isLast && <div className="w-px h-full bg-border" />}
    </div>
    <div className="pb-8">
      <p className="text-sm text-muted-foreground">{date}</p>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </motion.li>
);

export default function AboutLayout() {
  const skills = {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    backend: ["Java", "Spring Boot", "MySQL", "MyBatis", "Redis", "Sa-Token"],
    bigData: ["Hadoop", "Hive", "Spark", "Kafka", "Flink", "Databricks"],
  };

  return (
    <div className="flex justify-center pt-10 pb-20">
      <div className="w-full max-w-4xl px-6">
        {/* Section 1: 个人简介 */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20 text-center md:text-left"
        >
          <motion.div variants={itemVariants} className="relative">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20">
              <AvatarImage src="/avatar.png" alt="猫颜" />
              <AvatarFallback>MY</AvatarFallback>
            </Avatar>
             <span className="absolute bottom-2 right-2 text-3xl animate-wave">👋</span>
          </motion.div>
          <div className="flex-1">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-2">
              你好，我是猫颜
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-4">
              一名热爱探索技术边界的全栈大数据工程师。<br/>
              “一花一世界，一叶一追寻”，代码亦是修行。
            </motion.p>
            <motion.div variants={itemVariants} className="flex justify-center md:justify-start gap-4">
              <Link href="https://github.com/ssrskl" target="_blank" className="hover:text-primary transition-colors"><FaGithub size={24} /></Link>
              <Link href="https://juejin.cn/user/your-id" target="_blank" className="hover:text-primary transition-colors"><SiJuejin size={24} /></Link>
              <Link href="https://space.bilibili.com/your-id" target="_blank" className="hover:text-primary transition-colors"><SiBilibili size={24} /></Link>
              <Link href="mailto:your-email@example.com" className="hover:text-primary transition-colors"><FaEnvelope size={24} /></Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 2: 我的技能 */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-10">我的技能栈</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillCard icon={<FaReact size={24} className="text-blue-500"/>} title="前端" skills={skills.frontend} />
            <SkillCard icon={<SiSpring size={24} className="text-green-600"/>} title="后端" skills={skills.backend} />
            <SkillCard icon={<FaServer size={24} className="text-orange-500"/>} title="大数据" skills={skills.bigData} />
          </div>
        </motion.section>

        {/* Section 3: 我的旅程 */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-10">我的旅程</motion.h2>
          <ul className="relative">
            <TimelineItem date="2020 - 至今" title="大数据开发工程师" description="在数字的海洋中航行，专注于数据处理与分析，构建高效、稳定的数据流水线。" />
            <TimelineItem date="2018 - 2020" title="Java 后端开发" description="从 Spring Boot 开始，搭建稳固的后端服务，探索微服务的奥秘。" />
            <TimelineItem date="2017" title="踏入代码世界" description="从一行 `Hello, World` 开始，对用代码创造价值产生了浓厚的兴趣。" isLast={true} />
          </ul>
        </motion.section>
      </div>
      
       <style jsx global>{`
        @keyframes wave-animation {
            0% { transform: rotate( 0.0deg) }
           10% { transform: rotate(14.0deg) }
           20% { transform: rotate(-8.0deg) }
           30% { transform: rotate(14.0deg) }
           40% { transform: rotate(-4.0deg) }
           50% { transform: rotate(10.0deg) }
           60% { transform: rotate( 0.0deg) }
          100% { transform: rotate( 0.0deg) }
        }
        .animate-wave {
          animation: wave-animation 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}