// components/algorithm-visualizer.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  StepBack,
  StepForward,
  RotateCcw,
  FastForward,
  Rewind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PhotoView } from "react-photo-view";

// 定义算法步骤类型 - 新增imageUrl用于可视化图片
interface AlgorithmStep {
  id: number;
  title: string;
  description: string;
  codeSnippet: string;
  highlightedLines?: number[];
  imageUrl: string; // 可视化图片URL
  imageAlt: string; // 图片描述
}

// 定义可视化器属性
interface AlgorithmVisualizerProps {
  steps: AlgorithmStep[];
  title: string;
  initialSpeed?: number; // 0-100
}

// 代码行动画变体
const codeLineVariants = {
  default: { opacity: 0.6 },
  highlighted: { opacity: 1, scale: 1.01, backgroundColor: "rgba(255, 255, 0, 0.1)" },
  executed: { opacity: 0.4 }
};

export function AlgorithmVisualizer({
  steps,
  title,
  initialSpeed = 50,
}: AlgorithmVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // 计算延迟时间（速度反转：值越大延迟越小）
  const delay = 3000 - (speed * 25);

  // 自动播放逻辑
  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        setCurrentStep((prev) => 
          prev < steps.length - 1 ? prev + 1 : (setIsPlaying(false), prev)
        );
      }, delay);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, delay]);

  // 控制函数
  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleReset = () => setCurrentStep(0);
  const handleFastForward = () => setCurrentStep(steps.length - 1);
  const handleFastRewind = () => setCurrentStep(0);

  // 当前步骤数据
  const current = steps[currentStep];

  // 渲染代码行
  const renderCodeLines = () => {
    const lines = current.codeSnippet.split("\n");
    return lines.map((line, index) => {
      const lineNumber = index + 1;
      const isHighlighted = current.highlightedLines?.includes(lineNumber) || false;
      const isExecuted = lineNumber < (current.highlightedLines?.[0] || Infinity);

      return (
        <motion.div
          key={index}
          variants={codeLineVariants}
          initial="default"
          animate={isHighlighted ? "highlighted" : isExecuted ? "executed" : "default"}
          transition={{ duration: 0.3 }}
          className="px-4 py-1 text-sm font-mono"
        >
          <span className="inline-block w-8 text-gray-500">{lineNumber}</span>
          {line}
        </motion.div>
      );
    });
  };

  return (
    <Card className="w-full my-4 overflow-hidden">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* 控制栏 */}
        <div className="flex flex-wrap items-center justify-between p-4 border-b bg-muted/30 gap-4">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleFastRewind}
              disabled={currentStep === 0}
            >
              <Rewind size={16} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <StepBack size={16} />
              上一步
            </Button>
            <Button 
              size="sm" 
              variant="default" 
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? "暂停" : "播放"}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              下一步
              <StepForward size={16} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleFastForward}
              disabled={currentStep === steps.length - 1}
            >
              <FastForward size={16} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleReset}
            >
              <RotateCcw size={16} />
              重置
            </Button>
          </div>
          
          <div className="flex items-center gap-2 w-48">
            <span className="text-xs">速度</span>
            <Slider
              value={[speed]}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) => setSpeed(value[0])}
            />
          </div>
          
          <div className="text-sm text-gray-500">
            步骤 {currentStep + 1} / {steps.length}
          </div>
        </div>
        
        {/* 内容区域 - 同时显示可视化图片和代码 */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium">{current.title}</h3>
            <p className="text-muted-foreground mt-2">{current.description}</p>
          </div>
          
          {/* 可视化与代码并排显示，响应式布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 可视化图片区域 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden border bg-muted/30"
            >
              <PhotoView src={current.imageUrl}>
                <img
                  src={current.imageUrl}
                  alt={current.imageAlt}
                  className="w-full h-auto object-contain"
                />
              </PhotoView>
            </motion.div>
            
            {/* 代码区域 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-md overflow-hidden font-mono text-sm max-h-[400px] overflow-y-auto"
            >
              {renderCodeLines()}
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}