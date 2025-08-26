"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  PenTool,
  TrendingUp,
  Target,
  Moon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  containerVariants,
  fadeInUp,
  itemVariants
} from "@/styles/animation";

// 模拟阅读数据
const readingData = [
  { month: "1月", books: 3, pages: 450 },
  { month: "2月", books: 2, pages: 320 },
  { month: "3月", books: 4, pages: 680 },
  { month: "4月", books: 3, pages: 520 },
  { month: "5月", books: 5, pages: 750 },
  { month: "6月", books: 4, pages: 620 },
];

// 模拟写作数据
const writingData = [
  { month: "1月", articles: 5, words: 8500 },
  { month: "2月", articles: 3, words: 4200 },
  { month: "3月", articles: 6, words: 12000 },
  { month: "4月", articles: 4, words: 7800 },
  { month: "5月", articles: 7, words: 14500 },
  { month: "6月", articles: 5, words: 9200 },
];

// 模拟习惯数据
const habits = [
  {
    id: 1,
    name: "阅读",
    icon: <BookOpen className="h-5 w-5" />,
    currentStreak: 42,
    bestStreak: 67,
    completionRate: 85,
    weeklyData: [true, true, true, true, true, false, true]
  },
  {
    id: 2,
    name: "写作",
    icon: <PenTool className="h-5 w-5" />,
    currentStreak: 18,
    bestStreak: 30,
    completionRate: 65,
    weeklyData: [true, true, false, true, true, false, false]
  },
  {
    id: 3,
    name: "冥想",
    icon: <Moon className="h-5 w-5" />,
    currentStreak: 7,
    bestStreak: 21,
    completionRate: 45,
    weeklyData: [true, false, true, true, false, false, true]
  },
  {
    id: 4,
    name: "运动",
    icon: <Target className="h-5 w-5" />,
    currentStreak: 25,
    bestStreak: 42,
    completionRate: 75,
    weeklyData: [true, true, true, false, true, true, false]
  }
];

// 模拟时间分配数据
const timeDistribution = [
  { name: "阅读", value: 35, color: "#3b82f6" },
  { name: "写作", value: 25, color: "#10b981" },
  { name: "学习", value: 20, color: "#f59e0b" },
  { name: "休息", value: 15, color: "#8b5cf6" },
  { name: "其他", value: 5, color: "#6b7280" }
];

// 格式化大数字显示
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

// 计算总计数据
const calculateTotals = () => {
  const totalBooks = readingData.reduce((sum, item) => sum + item.books, 0);
  const totalPages = readingData.reduce((sum, item) => sum + item.pages, 0);
  const totalArticles = writingData.reduce((sum, item) => sum + item.articles, 0);
  const totalWords = writingData.reduce((sum, item) => sum + item.words, 0);
  
  return { totalBooks, totalPages, totalArticles, totalWords };
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { totalBooks, totalPages, totalArticles, totalWords } = calculateTotals();
  
  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 页面标题 */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">个人数据仪表板</h1>
            <p className="text-gray-600 dark:text-gray-400">
              追踪你的阅读、写作和习惯养成进度
            </p>
          </motion.div>

          {/* 数据概览卡片 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8"
            variants={fadeInUp}
          >
            {isLoading ? (
              // 加载状态骨架屏
              Array(4).fill(0).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      总阅读书籍
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{totalBooks}</span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">本</span>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>较上期增长 12%</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50 pt-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      总页数: {formatNumber(totalPages)}
                    </div>
                  </CardFooter>
                </Card>

                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      总写作字数
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{formatNumber(totalWords)}</span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">字</span>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>较上期增长 8%</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50 pt-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      文章数: {totalArticles} 篇
                    </div>
                  </CardFooter>
                </Card>

                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      最长习惯连续
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">
                        {Math.max(...habits.map(h => h.bestStreak))}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">天</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">阅读</span> 创下的记录
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50 pt-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      当前连续: {Math.max(...habits.map(h => h.currentStreak))} 天
                    </div>
                  </CardFooter>
                </Card>

                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      平均习惯完成率
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">
                        {Math.round(habits.reduce((sum, h) => sum + h.completionRate, 0) / habits.length)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${Math.round(habits.reduce((sum, h) => sum + h.completionRate, 0) / habits.length)}%`
                        }}
                      ></div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50 pt-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      共 {habits.length} 个追踪习惯
                    </div>
                  </CardFooter>
                </Card>
              </>
            )}
          </motion.div>

          {/* 详细数据标签页 */}
          <Tabs defaultValue="reading" className="w-full">
            <motion.div variants={fadeInUp}>
              <TabsList className="mb-6">
                <TabsTrigger value="reading">阅读数据</TabsTrigger>
                <TabsTrigger value="writing">写作数据</TabsTrigger>
                <TabsTrigger value="habits">习惯追踪</TabsTrigger>
                <TabsTrigger value="time">时间分配</TabsTrigger>
              </TabsList>
            </motion.div>

            {/* 阅读数据标签页 */}
            <TabsContent value="reading" className="focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                variants={fadeInUp}
              >
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>阅读趋势 (近6个月)</CardTitle>
                    <CardDescription>书籍数量与总页数统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-80 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"></div>
                    ) : (
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={readingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                            <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                            <Tooltip />
                            <Bar yAxisId="left" dataKey="books" name="书籍数量" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="pages" name="阅读页数" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>阅读分类占比</CardTitle>
                    <CardDescription>各类别书籍阅读比例</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse rounded-full"></div>
                    ) : (
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "技术", value: 45, color: "#3b82f6" },
                                { name: "文学", value: 25, color: "#10b981" },
                                { name: "历史", value: 15, color: "#f59e0b" },
                                { name: "哲学", value: 10, color: "#8b5cf6" },
                                { name: "其他", value: 5, color: "#6b7280" }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {timeDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 justify-center">
                    {[
                      { name: "技术", color: "#3b82f6" },
                      { name: "文学", color: "#10b981" },
                      { name: "历史", color: "#f59e0b" },
                      { name: "哲学", color: "#8b5cf6" },
                      { name: "其他", color: "#6b7280" }
                    ].map((item, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                        {item.name}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            {/* 写作数据标签页 */}
            <TabsContent value="writing" className="focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                variants={fadeInUp}
              >
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>写作趋势 (近6个月)</CardTitle>
                    <CardDescription>文章数量与总字数统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-80 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"></div>
                    ) : (
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={writingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" orientation="left" stroke="#8b5cf6" />
                            <YAxis yAxisId="right" orientation="right" stroke="#ec4899" />
                            <Tooltip />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="articles"
                              name="文章数量"
                              stroke="#8b5cf6"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="words"
                              name="总字数"
                              stroke="#ec4899"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>写作效率</CardTitle>
                    <CardDescription>平均每篇文章字数</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoading ? (
                      Array(3).fill(0).map((_, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                      ))
                    ) : (
                      <>
                        {[
                          { name: "技术文章", avg: 2400, color: "#3b82f6" },
                          { name: "随笔感悟", avg: 1200, color: "#10b981" },
                          { name: "读书笔记", avg: 1800, color: "#f59e0b" }
                        ].map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{item.name}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatNumber(item.avg)} 字/篇
                              </span>
                            </div>
                            <Progress
                              value={(item.avg / 3000) * 100}
                              className="h-2"
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* 习惯追踪标签页 */}
            <TabsContent value="habits" className="focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={fadeInUp}
              >
                {habits.map((habit) => (
                  <Card key={habit.id} className="overflow-hidden group hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
                            {habit.icon}
                          </span>
                          {habit.name}
                        </CardTitle>
                        <Badge variant="outline" className="font-normal">
                          {habit.completionRate}% 完成率
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                          <div className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"></div>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            当前连续: <span className="font-medium text-blue-600 dark:text-blue-400">{habit.currentStreak} 天</span> | 
                            最佳记录: <span className="font-medium text-green-600 dark:text-green-400">{habit.bestStreak} 天</span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">本周完成情况</span>
                            <span className="text-xs font-medium">
                              {habit.weeklyData.filter(Boolean).length}/7
                            </span>
                          </div>
                          
                          <div className="flex gap-1">
                            {habit.weeklyData.map((completed, index) => (
                              <div
                                key={index}
                                className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium transition-transform group-hover:scale-110`}
                                style={{
                                  backgroundColor: completed 
                                    ? "rgba(16, 185, 129, 0.1)" 
                                    : "rgba(229, 231, 235, 1)",
                                  color: completed ? "#10b981" : "#9ca3af"
                                }}
                              >
                                {["一", "二", "三", "四", "五", "六", "日"][index]}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            {/* 时间分配标签页 */}
            <TabsContent value="time" className="focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                variants={fadeInUp}
              >
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>每日时间分配</CardTitle>
                    <CardDescription>平均每日各类活动时长占比</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse rounded-full"></div>
                    ) : (
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={timeDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {timeDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2 items-start">
                    {timeDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 w-full">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-sm flex-1">{item.name}</span>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </CardFooter>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>每日专注时长</CardTitle>
                    <CardDescription>过去7天的专注时间统计 (小时)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-80 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"></div>
                    ) : (
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { day: "周一", hours: 4.5 },
                              { day: "周二", hours: 3.2 },
                              { day: "周三", hours: 5.1 },
                              { day: "周四", hours: 2.8 },
                              { day: "周五", hours: 6.3 },
                              { day: "周六", hours: 4.0 },
                              { day: "周日", hours: 3.5 }
                            ]}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                              dataKey="hours"
                              name="专注小时数"
                              fill="#8b5cf6"
                              radius={[4, 4, 0, 0]}
                              barSize={40}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                    <div className="w-full flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">平均每日专注时间</span>
                        <div className="text-xl font-bold mt-1">4.2 小时</div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500 dark:text-gray-400">本周总专注时间</span>
                        <div className="text-xl font-bold mt-1">29.4 小时</div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}