import { 
    FaTag, 
    FaReact, 
    FaNodeJs, 
    FaJava, 
    FaPython, 
    FaDatabase, 
    FaCloud, 
    FaCode, 
    FaMobile,
    FaDesktop,
    FaAngular,
    FaVuejs,
    FaAws,
    FaGithub,
    FaHtml5,
    FaCss3,
    FaLinux,
    FaWindows,
    FaApple
  } from "react-icons/fa";
  import { 
    SiJavascript, 
    SiTypescript, 
    SiGo, 
    SiRust, 
    SiDocker, 
    SiKubernetes, 
    SiMongodb,
    SiMysql,
    SiRedis,
    SiNextdotjs,
    SiSvelte,
    SiElectron,
    SiGraphql,
    SiServerless,
    SiSpring,
    SiDjango,
    SiFlask,
    SiTailwindcss,
    SiCplusplus,
    SiSharp,
    SiSwift,
    SiFlutter,
    SiKotlin
  } from "react-icons/si";
  import type { ReactNode } from "react";
  
  // 标签名称到图标的映射
  export const TAG_ICONS: Record<string, ReactNode> = {
    "React": <FaReact />,
    "Angular": <FaAngular />,
    "Vue": <FaVuejs />,
    "Next.js": <SiNextdotjs />,
    "Svelte": <SiSvelte />,
    "JavaScript": <SiJavascript />,
    "TypeScript": <SiTypescript />,
    "HTML": <FaHtml5 />,
    "CSS": <FaCss3 />,
    "Tailwind": <SiTailwindcss />,
    "Node.js": <FaNodeJs />,
    "Java": <FaJava />,
    "Spring": <SiSpring />,
    "Python": <FaPython />,
    "Django": <SiDjango />,
    "Flask": <SiFlask />,
    "Go": <SiGo />,
    "Rust": <SiRust />,
    "C++": <SiCplusplus />,
    "C#": <SiSharp />,
    "Swift": <SiSwift />,
    "Kotlin": <SiKotlin />,
    "Flutter": <SiFlutter />,
    "数据库": <FaDatabase />,
    "MongoDB": <SiMongodb />,
    "MySQL": <SiMysql />,
    "Redis": <SiRedis />,
    "GraphQL": <SiGraphql />,
    "Docker": <SiDocker />,
    "Kubernetes": <SiKubernetes />,
    "云计算": <FaCloud />,
    "AWS": <FaAws />,
    "Serverless": <SiServerless />,
    "前端": <FaCode />,
    "后端": <FaDesktop />,
    "移动端": <FaMobile />,
    "Electron": <SiElectron />,
    "Linux": <FaLinux />,
    "Windows": <FaWindows />,
    "macOS": <FaApple />,
    "Git": <FaGithub />
  };
  
  // 根据标签名获取图标，如果没有找到对应的图标则返回默认图标
  export function getTagIcon(tagName: string): ReactNode {
    return TAG_ICONS[tagName] || <FaTag />;
  } 