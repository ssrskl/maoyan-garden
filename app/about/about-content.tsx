"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import {
    FaCss3,
    FaDatabase,
    FaGithub,
    FaHtml5,
    FaJava,
    FaJs,
    FaPython,
    FaReact,
} from "react-icons/fa";
import {
    SiApacheflink,
    SiApachehadoop,
    SiApachehive,
    SiApachekafka,
    SiApachespark,
    SiBilibili,
    SiGmail,
    SiJuejin,
    SiMysql,
    SiSpring,
    SiSpringboot,
    SiSpringsecurity,
    SiTailwindcss,
    SiTypescript,
    SiVite,
    SiDatabricks,
} from "react-icons/si";

// 定义容器动画变体
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            when: "beforeChildren",
            staggerChildren: 0.1,
            duration: 0.3
        }
    }
};

// 定义子元素动画变体
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

// 图标动画变体
const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
            type: "spring", 
            stiffness: 200,
            damping: 10
        }
    }
};


export default function AboutContent() {
    return (
        <motion.div 
            className="flex justify-center pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="grid w-2/3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="gap-5 flex flex-col justify-center px-6">
                    <motion.div
                        className="gap-5 flex flex-col justify-center"
                        variants={itemVariants as any}
                    >
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">首页</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/" className='font-blod text-black'>关于我</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <motion.h1 
                            className="text-4xl font-bold my-4"
                            variants={itemVariants as any}
                        >
                            关于
                        </motion.h1>
                        <motion.p variants={itemVariants as any}>
                            叮~您有一份关于猫颜的简介，请查收
                        </motion.p>
                    </motion.div>
                    
                    <motion.h2
                        className="text-2xl font-bold my-2"
                        variants={itemVariants as any}
                    >
                        我是谁
                    </motion.h2>
                    
                    <motion.p
                        variants={itemVariants as any}
                    >
                        Hi~ 我是猫颜，一个全栈工程师
                    </motion.p>
                    
                    <motion.h2
                        className="text-2xl font-bold my-2"
                        variants={itemVariants as any}
                    >
                        我的技能
                    </motion.h2>
                    
                    <motion.h3
                        className="text-xl font-bold"
                        variants={itemVariants as any}
                    >
                        前端
                    </motion.h3>
                    
                    <motion.ul
                        className="flex flex-col space-y-2"
                        variants={itemVariants as any}
                    >
                        <motion.li 
                            className="flex items-center gap-2 text-md"
                            variants={itemVariants as any}
                            whileHover={{ x: 10 }}
                        >
                            <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
                            <motion.div variants={iconVariants as any}><FaHtml5 /></motion.div>
                            HTML +
                            <motion.div variants={iconVariants as any}><FaCss3 /></motion.div>
                            CSS +
                            <motion.div variants={iconVariants as any}><FaJs /></motion.div>
                            JS
                        </motion.li>
                        <motion.li 
                            className="flex items-center gap-2 text-md"
                            variants={itemVariants as any}
                            whileHover={{ x: 10 }}
                        >
                            <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
                            <motion.div variants={iconVariants as any}><FaReact /></motion.div>
                            React +
                            <motion.div variants={iconVariants as any}><SiVite /></motion.div>
                            Vite +
                            <motion.div variants={iconVariants as any}><SiTailwindcss /></motion.div>
                            Tailwind +
                            <motion.div variants={iconVariants as any}><SiTypescript /></motion.div>
                            TypeScript
                        </motion.li>
                    </motion.ul>

                    <motion.h3
                        className="text-xl font-bold"
                        variants={itemVariants as any}
                    >
                        后端
                    </motion.h3>
                    
                    <motion.ul
                        className="flex flex-col space-y-2"
                        variants={itemVariants as any}
                    >
                        <motion.li 
                            className="flex items-center gap-2 text-md"
                            variants={itemVariants as any}
                            whileHover={{ x: 10 }}
                        >
                            <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
                            <motion.div variants={iconVariants as any}><FaJava /></motion.div>
                            Java
                        </motion.li>
                        <motion.li 
                            className="flex items-center gap-2 text-md"
                            variants={itemVariants as any}
                            whileHover={{ x: 10 }}
                        >
                            <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
                            <motion.div variants={iconVariants as any}><SiSpring /></motion.div>
                            Spring +
                            <motion.div variants={iconVariants as any}><SiSpringboot /></motion.div>
                            SpringBoot +
                            <motion.div variants={iconVariants as any}><SiMysql /></motion.div>
                            MySQL +
                            <motion.div variants={iconVariants as any}><FaDatabase /></motion.div>
                            Mybatis +
                            <motion.div variants={iconVariants as any}><SiSpringsecurity /></motion.div>
                            Satoken
                        </motion.li>
                    </motion.ul>

                    <motion.h3
                        className="text-xl font-bold"
                        variants={itemVariants as any}
                    >
                        大数据
                    </motion.h3>
                    
                    <motion.ul
                        className="flex flex-col space-y-2"
                        variants={itemVariants as any}
                    >
                        <motion.li 
                            className="flex items-center gap-2 text-md"
                            variants={itemVariants as any}
                            whileHover={{ x: 10 }}
                        >
                            <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
                            <motion.div variants={iconVariants as any}><FaJava /></motion.div>
                            Java +
                            <motion.div variants={iconVariants as any}><FaPython /></motion.div>
                            Python
                        </motion.li>
                        <motion.li 
                            className="flex items-center gap-2 text-md"
                            variants={itemVariants as any}
                            whileHover={{ x: 10 }}
                        >
                            <div className="bg-gray-300 rounded-full w-2 h-2 mx-4"></div>
                            <motion.div variants={iconVariants as any}><SiApachehadoop /></motion.div>
                            Hadoop +
                            <motion.div variants={iconVariants as any}><SiApachehive /></motion.div>
                            Hive +
                            <motion.div variants={iconVariants as any}><SiApachespark /></motion.div>
                            Spark +
                            <motion.div variants={iconVariants as any}><SiApachekafka /></motion.div>
                            Kafka +
                            <motion.div variants={iconVariants as any}><SiApacheflink /></motion.div>
                            Flink +
                            <motion.div variants={iconVariants as any}><SiDatabricks /></motion.div>
                            Databricks
                        </motion.li>
                    </motion.ul>

                    <motion.h2
                        className="text-2xl font-bold my-2"
                        variants={itemVariants as any}
                    >
                        联系我
                    </motion.h2>
                    
                    <motion.ul
                        className="flex items-center space-x-3"
                        variants={itemVariants as any}
                    >
                        <motion.div
                            variants={iconVariants as any}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaGithub className="w-10 h-10 border-2 rounded-lg p-1 cursor-pointer" />
                        </motion.div>
                        <motion.div
                            variants={iconVariants as any}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <SiGmail className="w-10 h-10 border-2 rounded-lg p-1 cursor-pointer" />
                        </motion.div>
                        <motion.div
                            variants={iconVariants as any}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <SiBilibili className="w-10 h-10 border-2 rounded-lg p-1 cursor-pointer" />
                        </motion.div>
                        <motion.div
                            variants={iconVariants as any}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <SiJuejin className="w-10 h-10 border-2 rounded-lg p-1 cursor-pointer" />
                        </motion.div>
                    </motion.ul>
                </div>
            </motion.div>
        </motion.div>
    );
}