"use client"
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  // 定义容器动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  // 定义子元素动画变体
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // 定义波浪文字动画
  const waveText = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      }
    }
  };

  const waveLetter = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      }
    }
  };
    // 将文本拆分为单个字符以便应用波浪动画
    const text = "天地之功不可仓促，艰难之业当累日月\\owo/ ~";
    const chars = Array.from(text);
  return (
    <div key={1} className="grid place-content-center">
      <motion.div 
        className="h-screen gap-5 flex flex-col justify-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          className="text-2xl md:text-5xl tracking-widest"
          variants={itemVariants}
        >
          你好，我是
        </motion.p>

        <motion.strong
          className={cn(
            `text-5xl md:text-8xl tracking-widest font-black bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500`
          )}
          style={{
            WebkitTextFillColor: "transparent",
          }}
          variants={itemVariants}
        >
          猫颜
        </motion.strong>
        
        <motion.div
          variants={itemVariants}
        >
          <TypeAnimation
            className="text-2xl tracking-widest"
            sequence={[
              "全栈大数据开发工程师", // Types 'One'
              1000, // Waits 1s
              "Full stack big data development engineer", // Deletes 'One'
              1000, // Waits 1s
            ]}
            speed={50}
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>
        
        <motion.p
          className="text-2xl md:text-5xl tracking-widest"
          variants={waveText}
          initial="hidden"
          animate="visible"
        >
          {chars.map((char, index) => {
            // 针对特定字符应用不同样式
            let className = "";
            if (char === "艰" || char === "难" || char === "之" || char === "业" ) {
              className = "font-semibold text-[#00d8ff] inline-block";
            } else if (char === "当" || char === "累" || char === "日" || char === "月") {
              className = "font-semibold text-[#007acc] inline-block"; 
            } else if (char === "天" || char === "地" || char === "之" || char === "功" || char === "不" || char === "可" || char === "仓" || char === "促") {
              className = "font-semibold text-[#00b4e0] inline-block";
            } else {
              className = "inline-block";
            }
            
            return (
              <motion.span
                key={index}
                className={className}
                variants={waveLetter}
                // 添加永久波浪动画
                animate={{ 
                  y: [0, char === " " ? 0 : -5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "mirror",
                  duration: 1 + Math.random() * 1.5, // 随机持续时间使波动看起来更自然
                  ease: "easeInOut",
                  delay: index * 0.05 % 2, // 错开每个字符的动画时间
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.p>
        
        <motion.p
          className="text-base md:text-2xl text-muted-foreground tracking-widest"
          variants={itemVariants}
        >
          一花一世界，一叶一菩提。
        </motion.p>
        
        <motion.div
          className="flex space-x-4"
          variants={itemVariants}
        >
          <motion.div
            className="border-2 p-2 rounded-lg shadow-md cursor-pointer"
            onClick={() => { navigate({ to: "/blog" }) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            我的博客
          </motion.div>
          <motion.div
            className="border-2 p-2 rounded-lg shadow-md cursor-pointer"
            onClick={() => { navigate({ to: "/about" }) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            关于我
          </motion.div>
        </motion.div>

        <motion.ul
          className="flex space-x-4"
          variants={itemVariants}
        ></motion.ul>
        
        <motion.div 
          className="grid place-content-center bottom-0 inset-x-0 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div 
            className="w-[20px] h-[30px] md:w-[26px] md:h-[38px] rounded-full border-2 border-primary/30 relative grid justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          >
            <div className="w-[2px] h-[5px] md:h-[7px] bg-primary/30 rounded-full"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
