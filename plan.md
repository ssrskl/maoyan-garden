# Quiz 组件优化计划：支持多种题型

> 创建时间: 2025-02-23
> 目标: 扩展现有 Quiz 组件，支持选择题和闪卡翻转两种题型

---

## 📋 目录

1. [实现思路](#1-实现思路)
2. [待确认问题](#2-待确认问题)
3. [要修改的文件路径](#3-要修改的文件路径)
4. [关键代码片段](#4-关键代码片段)
5. [技术权衡和注意事项](#5-技术权衡和注意事项)

---

## 1. 实现思路

### 1.1 整体架构设计

#### 方案概述

创建一个**统一的 Quiz 组件系统**，支持多种题型：

```
Quiz (统一入口)
├── MultipleChoiceQuestion (选择题) - 已有
├── FlashCardQuestion (闪卡翻转) - 新增
└── [未来扩展] FillInBlankQuestion (填空题)
    [未来扩展] TrueFalseQuestion (判断题)
```

#### 核心设计原则

1. **向后兼容**: 现有的 MDX 文档中的选择题不受影响
2. **类型安全**: 使用 TypeScript 严格区分题型
3. **复用逻辑**: 计分、进度、结果页面逻辑共享
4. **渐进增强**: 可以混合多种题型

---

### 1.2 数据结构设计

#### 扩展后的数据结构

```typescript
// 基础题型枚举
export enum QuestionType {
  MULTIPLE_CHOICE = "multiple-choice",
  FLASHCARD = "flashcard",
}

// 基础问题接口
interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  explanation?: string;
}

// 选择题接口（已有）
interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
  options: string[];
  correctAnswer: string;
}

// 闪卡接口（新增）
interface FlashCardQuestion extends BaseQuestion {
  type: QuestionType.FLASHCARD;
  front: string;           // 卡片正面（问题/提示）
  back: string;            // 卡片反面（答案/详解）
  category?: string;       // 分类标签
  difficulty?: 1 | 2 | 3;  // 难度等级
}
// 注：静态网站不需要持久化用户学习状态，因此不包含 mastered/reviewCount/lastReviewed 字段


// 统一的问题类型
export type Question = MultipleChoiceQuestion | FlashCardQuestion;

// Quiz 组件的 props
interface QuizProps {
  questions: Question[];
  showProgress?: boolean;     // 是否显示进度条（默认 true）
  allowSkip?: boolean;        // 是否允许跳过题目（默认 false）
}
```
// 注：移除了 mode 字段，简化设计。选择题自动计分，闪卡只记录当次学习统计
#### MDX 使用示例

```mdx
// 纯选择题（向后兼容）
<QuizBar questions={[
  {
    type: "multiple-choice",
    question: "React 的核心概念是什么？",
    options: ["组件", "函数", "变量", "类"],
    correctAnswer: "组件",
    explanation: "React 是基于组件的 UI 库..."
  }
]} />

// 纯闪卡
<QuizBar questions={[
  {
    type: "flashcard",
    question: "JavaScript 闭包",
    front: "什么是闭包？",
    back: "闭包是指有权访问另一个函数作用域中变量的函数...",
    category: "JavaScript",
    difficulty: 2
  }
]} />

// 混合题型
<QuizBar questions={[
  {
    type: "multiple-choice",
    question: "下面哪个是 React Hooks？",
    options: ["useState", "useRedux", "useQuery", "useCache"],
    correctAnswer: "useState",
    explanation: "useState 是 React 内置的 Hook"
  },
  {
    type: "flashcard",
    question: "useState Hook",
    front: "useState 的作用是什么？",
    back: "useState 是一个 Hook，用于在函数组件中添加状态...",
    category: "React Hooks",
    difficulty: 1
  }
]} />
```

---

### 1.3 闪卡组件设计

#### 闪卡交互流程

```
1. 初始状态: 显示正面内容（问题/提示）
   ↓
2. 用户点击卡片 / 点击"查看答案"按钮
   ↓
3. 翻转动画（3D flip）
   ↓
4. 显示背面内容（答案/详解）
   ↓
5. 用户自我评估:
   - "掌握了" → 标记为已掌握，自动进入下一张
   - "需要复习" → 标记为需要复习，稍后可重复学习
   - "下一张" → 不标记，直接进入下一张
```

#### 闪卡组件结构

```
FlashCardQuestion
├── FlashCard (卡片容器)
│   ├── FlashCardFront (正面)
│   │   ├── 问题/提示内容
│   │   └── 点击翻转提示
│   └── FlashCardBack (背面)
│       ├── 答案/详解内容
│       └── 自我评估按钮组
└── FlashCardControls (底部控制栏)
    ├── "掌握了" 按钮
    ├── "需要复习" 按钮
    └── "下一张" 按钮
```

#### 翻转动画实现

使用 CSS 3D transform + Framer Motion：

```typescript
// 正面 → 背面
const flipVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};

// CSS
.flashcard-container {
  perspective: 1000px;
}

.flashcard {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.flashcard-back {
  transform: rotateY(180deg);
}
```

---

### 1.4 计分系统设计

#### 设计原则

由于是静态网站，不保存用户学习状态，因此采用**会话内统计**方案：

- **选择题**: 自动判断对错，统计正确率
- **闪卡**: 用户自评（掌握了/需复习），仅统计当次学习结果

#### 结果数据结构

```typescript
interface QuizResults {
  // 选择题统计
  multipleChoice: {
    total: number;
    correct: number;
    score: number;  // 百分比
    answers: Array<{
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }>;
  };

  // 闪卡统计（仅当次会话）
  flashcards: {
    total: number;
    mastered: number;      // 当次标记为"掌握了"的数量
    needReview: number;     // 当次标记为"需复习"的数量
    cards: Array<{
      question: string;
      status: "mastered" | "need-review" | "skipped";
    }>;
  };
}

```typescript
interface QuizResults {
  // 选择题统计
  multipleChoice: {
    total: number;
    correct: number;
    score: number;
    answers: Array<{
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }>;
  };

  // 闪卡统计
  flashcards: {
    total: number;
    mastered: number;      // 掌握数量
    needReview: number;     // 需要复习数量
    cards: Array<{
      question: string;
      status: "mastered" | "need-review" | "skipped";
    }>;
  };
}
```

---

### 1.5 UI/UX 设计

#### 选择题界面（已有，保持不变）

```
┌─────────────────────────────────────┐
│ 小测验                1 / 5         │
│ ████████░░░░░░░░░░░░░░░░           │ ← 进度条
├─────────────────────────────────────┤
│ React 的核心概念是什么？             │
│                                     │
│ ○ 组件                              │
│ ○ 函数                              │
│ ○ 变量                              │
│ ○ 类                                │
│                                     │
│                        [确认答案]    │
└─────────────────────────────────────┘
```

#### 闪卡界面（新增）

```
┌─────────────────────────────────────┐
│ 闪卡学习              1 / 5         │
│ ████████░░░░░░░░░░░░░░░░           │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │   什么是闭包？              │   │ ← 正面
│  │                             │   │
│  │   👆 点击卡片查看答案        │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│              [查看答案]             │
└─────────────────────────────────────┘

          ↓ 点击翻转后

┌─────────────────────────────────────┐
│ 闪卡学习              1 / 5         │
│ ████████░░░░░░░░░░░░░░░░           │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │   闭包是指有权访问另一个     │   │ ← 背面
│  │   函数作用域中变量的函数     │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [掌握了] [需要复习] [下一张]       │
└─────────────────────────────────────┘
```

#### 混合题型结果页面

```
┌─────────────────────────────────────┐
│        🎉 测验完成！                │
├─────────────────────────────────────┤
│                                     │
│  📊 选择题成绩                       │
│  ████████████████████░░  80%       │
│  4 / 5 题正确                       │
│                                     │
│  📚 闪卡学习统计                    │
│  ✓ 已掌握: 3 张                     │
│  ⚠ 需复习: 2 张                    │
│                                     │
│  [查看详细] [再试一次]              │
└─────────────────────────────────────┘
```

---

## 2. 待确认问题

### 🤔 关键决策问题

在开始实现之前，请回答以下问题，这将影响最终的设计：

#### 问题 1: 闪卡计分方式

**选择题**: 自动判断对错
**闪卡**: 用户自评 vs 不计分 vs 分开统计

你希望：
- **A**. 闪卡不计分，只记录学习状态（掌握/需复习）
- **B**. 闪卡用户自评计分（"我记住了"算对）
- **C**. 分开统计（选择题有分数，闪卡有掌握度）

**我的建议**: C - 分开统计，最符合学习场景

---

#### 问题 2: 闪卡翻转触发方式

如何查看闪卡背面答案？

- **A**. 点击卡片任意位置翻转
- **B**. 点击"查看答案"按钮翻转
- **C**. 两种方式都支持

**我的建议**: C - 两种方式都支持，更好的用户体验

---

#### 问题 3: ~~闪卡学习模式~~（已移除）

**注**: 根据项目需求，已移除模式切换功能。所有闪卡统一使用简单的翻转+自评流程。

---

#### 问题 4: 闪卡内容丰富度

闪卡背面需要支持哪些内容？

- **A**. 纯文本即可
- **B**. 支持 Markdown 渲染（加粗、列表、代码块）
- **C**. 支持 MDX（可嵌入图片、代码、其他组件）

**我的建议**: B - 支持 Markdown，灵活性足够

---

#### 问题 5: 闪卡导航方式

看完一张闪卡后：

- **A**. 必须做出选择（掌握了/需复习）才能下一张
- **B**. 可以跳过，不做选择
- **C**. 支持键盘快捷键（空格翻转，左右键切换）

**我的建议**: A + C - 必须选择（强化学习）+ 键盘快捷键

---

#### 问题 6: 闪卡复习系统

是否需要实现"间隔重复"算法？（如 Anki）

- **A**. 不需要，简单标记即可
- **B**. 需要，根据遗忘曲线安排复习
- **C**. 需要基础版（今日复习卡片列表）

**我的建议**: A - 不需要，保持简洁。如果需要，可以后续做独立的闪卡系统

---

#### 问题 7: 混合题型显示

当同时有选择题和闪卡时：

- **A**. 按顺序混合显示
- **B**. 先做完所有选择题，再学闪卡
- **C**. 让用户选择题型顺序

**我的建议**: A - 按顺序混合，保持流程连贯

---

#### 问题 8: 向后兼容性

现有 MDX 文档中的选择题如何处理？

- **A**. 自动添加 `type: "multiple-choice"`（需要迁移脚本）
- **B**. 默认为选择题，无需修改
- **C**. 抛出警告，提示更新数据格式

**我的建议**: B - 默认为选择题，平滑过渡

---

#### 问题 9: 闪卡样式定制

是否需要支持不同的闪卡样式主题？

- **A**. 不需要，统一的简洁风格
- **B**. 需要预设主题（简约/学术/创意等）
- **C**. 需要完全自定义样式

**我的建议**: A - 统一风格，保持设计一致性

---

#### 问题 10: 移动端适配

闪卡在移动端的体验：

- **A**. 滑动翻卡
- **B**. 点击翻卡
- **C**. 两者都支持

**我的建议**: B - 点击翻卡，避免与页面滚动冲突

---

### 💬 请回答以上问题

你可以：
1. 直接回复问题的字母选项（如: 1A, 2C, 3A...）
2. 提出其他想法或要求
3. 如果不确定，可以说"按你的建议来"

我会根据你的回答调整实现方案。

---

## 3. 要修改的文件路径

### 3.1 新增文件

```
components/quiz/
├── index.tsx                    # Quiz 主组件（统一入口）
├── multiple-choice.tsx          # 选择题组件（现有逻辑迁移）
├── flashcard/
│   ├── index.tsx                # 闪卡容器组件
│   ├── card.tsx                 # 单张闪卡组件（含翻转动画）
│   ├── controls.tsx             # 闪卡控制按钮
│   └── types.ts                 # 闪卡相关类型定义
├── results/
│   ├── index.tsx                # 结果页面主组件
│   ├── multiple-choice-summary.tsx  # 选择题结果汇总
│   └── flashcard-summary.tsx    # 闪卡学习统计
├── progress-bar.tsx             # 进度条组件（抽离现有逻辑）
└── types.ts                     # 统一类型定义
```

### 3.2 修改文件

```
components/quiz-bar.tsx          # 重命名为 components/quiz/index.tsx
components/mdx-components.tsx    # 更新组件注册
lib/utils.ts                     # 添加闪卡相关工具函数（可选）
```

### 3.3 示例文件（用于测试）

```
content/blog/
├── quiz-example.mdx             # 选择题示例（现有）
└── flashcard-example.mdx        # 闪卡示例（新增）
```

---

## 4. 关键代码片段

### 4.1 类型定义

```typescript
// components/quiz/types.ts
import { QuestionType } from "./types";

export enum QuestionType {
  MULTIPLE_CHOICE = "multiple-choice",
  FLASHCARD = "flashcard",
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  explanation?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
  options: string[];
  correctAnswer: string;
}

export interface FlashCardQuestion extends BaseQuestion {
  type: QuestionType.FLASHCARD;
  front: string;
  back: string;
  category?: string;
  difficulty?: 1 | 2 | 3;
  // 注：不包含学习状态字段（静态网站不保存状态）
}

export type Question = MultipleChoiceQuestion | FlashCardQuestion;

export interface QuizProps {
  questions: Question[];
  showProgress?: boolean;
  allowSkip?: boolean;
}

export interface QuizResults {
  multipleChoice: {
    total: number;
    correct: number;
    score: number;
  };
  flashcards: {
    total: number;
    mastered: number;
    needReview: number;
  };
}
```

---

### 4.2 闪卡翻转组件

```typescript
// components/quiz/flashcard/card.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlashCardProps {
  front: string;
  back: string;
  category?: string;
  isFlipped: boolean;
  onFlip: () => void;
  onAnswer: (status: "mastered" | "need-review") => void;
}

export function FlashCard({
  front,
  back,
  category,
  isFlipped,
  onFlip,
  onAnswer,
}: FlashCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      onFlip();
      setTimeout(() => setIsAnimating(false), 600); // 匹配动画时长
    }
  };

  return (
    <div className="flashcard-container" style={{ perspective: "1000px" }}>
      <motion.div
        className={cn(
          "flashcard relative w-full h-80 cursor-pointer",
          "select-none"
        )}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={handleFlip}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* 正面 */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden",
            "bg-gradient-to-br from-blue-50 to-indigo-50",
            "dark:from-blue-950 dark:to-indigo-950",
            "rounded-xl p-8 flex flex-col items-center justify-center"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {category && (
            <span className="text-sm text-muted-foreground mb-4">
              {category}
            </span>
          )}
          <p className="text-xl font-semibold text-center">{front}</p>
          <p className="text-sm text-muted-foreground mt-6">
            👆 点击卡片查看答案
          </p>
        </div>

        {/* 背面 */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden",
            "bg-gradient-to-br from-green-50 to-emerald-50",
            "dark:from-green-950 dark:to-emerald-950",
            "rounded-xl p-8 flex flex-col",
            "rotate-y-180"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex-1 overflow-auto">
            <p className="text-lg leading-relaxed">{back}</p>
          </div>

          <AnimatePresence>
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex gap-3 mt-6"
                onClick={(e) => e.stopPropagation()} // 防止触发翻转
              >
                <button
                  onClick={() => onAnswer("mastered")}
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  ✓ 掌握了
                </button>
                <button
                  onClick={() => onAnswer("need-review")}
                  className="flex-1 py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  需复习
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
```

---

### 4.3 Quiz 统一入口

```typescript
// components/quiz/index.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Question, QuestionType } from "./types";
import { MultipleChoiceQuestion } from "./multiple-choice";
import { FlashCardQuestion } from "./flashcard";
import { QuizResults } from "./results";

export function Quiz({ questions, showProgress = true, allowSkip = false }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults && results) {
    return <QuizResults results={results} onRestart={() => {
      setCurrentIndex(0);
      setShowResults(false);
      setResults(null);
    }} />;
  }

  return (
    <Card className="w-full mt-10 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">测验</CardTitle>
          {showProgress && (
            <Badge variant="secondary">
              {currentIndex + 1} / {questions.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {currentQuestion.type === QuestionType.MULTIPLE_CHOICE ? (
          <MultipleChoiceQuestion
            question={currentQuestion}
            onNext={handleNext}
            onUpdateResults={(result) => {
              // 更新结果
            }}
          />
        ) : (
          <FlashCardQuestion
            question={currentQuestion}
            onNext={handleNext}
            onUpdateResults={(result) => {
              // 更新结果
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
```

---

### 4.4 MDX 组件注册更新

```typescript
// components/mdx-components.tsx
import { Quiz } from "@/components/quiz"; // 更新导入路径

const components = {
  // ... 其他组件
  QuizBar: Quiz, // 保持向后兼容，QuizBar 映射到新的 Quiz
  Quiz, // 新增：直接使用 Quiz
};
```

---

### 4.5 向后兼容处理

```typescript
// components/quiz/utils.ts
import { Question, QuestionType } from "./types";

/**
 * 将旧版选择题数据转换为新格式
 */
export function normalizeQuestion(data: any): Question {
  // 如果有 type 字段，已经是新格式
  if (data.type) {
    return data;
  }

  // 旧版选择题，自动添加 type
  if (data.options && data.correctAnswer) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: QuestionType.MULTIPLE_CHOICE,
      question: data.question,
      options: data.options,
      correctAnswer: data.correctAnswer,
      explanation: data.explanation || "",
    };
  }

  throw new Error("Invalid question format");
}
```

---

## 5. 技术权衡和注意事项

### 5.1 性能考虑

#### ⚠️ 动画性能

**问题**: 3D 翻转动画在移动端可能卡顿

**解决方案**:
- 使用 `transform` 和 `opacity`（GPU 加速）
- 避免在动画中修改 `width/height`
- 使用 `will-change: transform` 提示浏览器

```css
.flashcard {
  will-change: transform;
}

.flashcard.flipping {
  /* 3D 变换，GPU 加速 */
  transform: rotateY(180deg);
}
```

#### ⚠️ 大量闪卡渲染

**问题**: 如果有 100+ 张闪卡，一次性渲染会很慢

**解决方案**:
- 只渲染当前可见的卡片
- 使用虚拟化（react-window）如果支持连续滚动

---

### 5.2 可访问性 (a11y)

#### ⚠️ 键盘导航

**需求**:
- Tab 键聚焦卡片
- Space/Enter 键翻转卡片
- 左右箭头切换卡片
- ESC 关闭/退出

**实现**:

```typescript
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleFlip();
    }
  }}
  aria-label="闪卡，按空格键翻转"
>
  {/* 卡片内容 */}
</div>
```

#### ⚠️ 屏幕阅读器

**需求**: 正面和背面内容都能被朗读

**实现**:

```typescript
<div aria-live="polite">
  {isFlipped ? (
    <div aria-label="闪卡背面">{back}</div>
  ) : (
    <div aria-label="闪卡正面">{front}</div>
  )}
</div>
```

---

### 5.3 移动端适配

#### ⚠️ 触摸手势冲突

**问题**: 滑动翻卡可能与页面滚动冲突

**解决方案**:
- 只支持点击翻卡
- 或者使用专用的手势库（react-use-gesture）

```typescript
import { useGesture } from "@use-gesture/react";

const bind = useGesture({
  onClick: () => handleFlip(),
  // 不支持 swipe，避免冲突
});
```

#### ⚠️ 移动端尺寸

**问题**: 小屏幕上卡片可能显示不全

**解决方案**:

```css
/* 移动端适配 */
@media (max-width: 640px) {
  .flashcard {
    height: 300px; /* 降低高度 */
    font-size: 0.9rem; /* 减小字体 */
  }
}
```

---

### 5.4 数据持久化

#### ⚠️ 学习状态保存

**设计决策**: 不保存学习状态

**原因**:
- 静态网站特性，无需用户登录
- 保持简洁，避免复杂的状态管理
- 每次学习都是全新开始

**行为**:
- 刷新页面后，所有进度丢失，重新开始
- 闪卡的学习统计（掌握了/需复习）仅在当前会话有效
- 如果需要持久化，可考虑后续实现独立的闪卡学习系统

---

### 5.5 Markdown 渲染

#### ⚠️ 闪卡内容支持 Markdown

**问题**: 闪卡内容可能需要代码块、列表等格式

**解决方案**:

```typescript
import ReactMarkdown from "react-markdown";

<ReactMarkdown className="prose prose-sm dark:prose-invert">
  {back}
</ReactMarkdown>
```

**注意**: 需要安装 `react-markdown`

```bash
pnpm add react-markdown
```

---

### 5.6 错误处理

#### ⚠️ 数据格式验证

**问题**: MDX 中的闪卡数据可能不完整

**解决方案**:

```typescript
export function validateFlashCard(data: any): data is FlashCardQuestion {
  return (
    data.type === QuestionType.FLASHCARD &&
    typeof data.front === "string" &&
    typeof data.back === "string" &&
    data.front.trim().length > 0 &&
    data.back.trim().length > 0
  );
}

// 使用
if (!validateFlashCard(questionData)) {
  console.error("Invalid flashcard data:", questionData);
  return <ErrorFallback />;
}
```

---

### 5.7 向后兼容性

#### ⚠️ 现有 MDX 文档不受影响

**问题**: 确保现有选择题无需修改即可工作

**解决方案**:

```typescript
// 自动检测类型
function detectQuestionType(data: any): QuestionType {
  if (data.options && data.correctAnswer) {
    return QuestionType.MULTIPLE_CHOICE;
  }
  if (data.front && data.back) {
    return QuestionType.FLASHCARD;
  }
  // 默认为选择题
  return QuestionType.MULTIPLE_CHOICE;
}
```

---

### 5.8 代码分割

#### ⚠️ 包体积优化

**问题**: 闪卡组件可能不被所有页面使用

**解决方案**:

```typescript
// 动态导入闪卡组件
const FlashCardQuestion = dynamic(
  () => import("./flashcard").then(mod => mod.FlashCardQuestion),
  { ssr: false } // 闪卡只需客户端渲染
);
```

---

### 5.9 测试策略

#### 单元测试

```typescript
// __tests__/quiz/flashcard.test.tsx
import { render, screen } from "@testing-library/react";
import { FlashCard } from "@/components/quiz/flashcard/card";

describe("FlashCard", () => {
  it("should render front content initially", () => {
    render(
      <FlashCard
        front="What is React?"
        back="A JavaScript library"
        isFlipped={false}
        onFlip={jest.fn()}
        onAnswer={jest.fn()}
      />
    );

    expect(screen.getByText("What is React?")).toBeInTheDocument();
  });

  it("should flip when clicked", () => {
    // ...
  });
});
```

#### E2E 测试

```typescript
// e2e/quiz.spec.ts
test("should complete flashcard quiz", async ({ page }) => {
  await page.goto("/blog/flashcard-example");

  // 点击翻卡
  await page.click(".flashcard");

  // 选择"掌握了"
  await page.click("text=掌握了");

  // 验证进入下一张
  await expect(page.locator("text=2 / 5")).toBeVisible();
});
```

---

## 6. 用户确认的方案

以下方案已由用户确认（"全部按你的建议来"）：

### ✅ 已确认的设计决策

| 问题 | 选择方案 | 说明 |
|------|----------|------|
| **1. 闪卡计分方式** | **C - 分开统计** | 选择题有分数，闪卡有掌握度 |
| **2. 翻转触发方式** | **C - 两种都支持** | 点击卡片 + "查看答案"按钮 |
| **3. 学习模式** | **已移除** | 不需要模式切换 |
| **4. 内容丰富度** | **B - Markdown** | 支持 Markdown 渲染（加粗、列表、代码块） |
| **5. 导航方式** | **A + C** | 必须选择（掌握了/需复习）+ 键盘快捷键 |
| **6. 复习系统** | **A - 不需要** | 简单标记即可 |
| **7. 混合题型** | **A - 按顺序** | 按顺序混合显示 |
| **8. 向后兼容** | **B - 默认选择题** | 现有选择题无需修改 |
| **9. 样式定制** | **A - 统一风格** | 简洁风格 |
| **10. 移动端** | **B - 点击翻卡** | 避免与滚动冲突 |

---

## 7. 详细任务清单

### 🎯 总览

- **总任务数**: 52 个
- **预估时间**: 8-12 小时
- **实施方式**: 逐个完成，每完成一个标记 ✅

---

### Phase 1: 基础架构搭建（预估 1.5 小时） ✅

#### 1.1 创建目录结构 ✅
- [x] **1.1.1** 创建 `components/quiz/` 目录
- [x] **1.1.2** 创建 `components/quiz/flashcard/` 子目录
- [x] **1.1.3** 创建 `components/quiz/results/` 子目录

#### 1.2 类型定义文件 ✅
- [x] **1.2.1** 创建 `components/quiz/types.ts`
  - [x] 定义 `QuestionType` 枚举
  - [x] 定义 `BaseQuestion` 接口
  - [x] 定义 `MultipleChoiceQuestion` 接口
  - [x] 定义 `FlashCardQuestion` 接口
  - [x] 定义 `Question` 联合类型
  - [x] 定义 `QuizProps` 接口
  - [x] 定义 `QuizResults` 接口
  - [x] 导出所有类型

#### 1.3 工具函数 ✅
- [x] **1.3.1** 创建 `components/quiz/utils.ts`
  - [x] 实现 `normalizeQuestion()` 函数（自动检测题型）
  - [x] 实现 `validateFlashCard()` 函数（验证闪卡数据）
  - [x] 实现 `detectQuestionType()` 函数
  - [x] 添加 TypeScript 类型守卫
  - [x] 导出所有工具函数

#### 1.4 依赖检查 ✅
- [x] **1.4.1** 检查是否已安装 `react-markdown`
  - [x] 如未安装，运行 `pnpm add react-markdown`
- [x] **1.4.2** 检查 Framer Motion 版本兼容性

---

### Phase 2: 进度条组件（预估 0.5 小时） ✅

#### 2.1 抽离现有进度条 ✅
- [x] **2.1.1** 创建 `components/quiz/progress-bar.tsx`
- [x] **2.1.2** 从现有 `quiz-bar.tsx` 中提取进度条逻辑
- [x] **2.1.3** 添加 TypeScript 类型定义
- [x] **2.1.4** 支持自定义进度条样式（可选）
- [x] **2.1.5** 测试进度条动画效果

---

### Phase 3: 选择题组件重构（预估 1 小时） ✅

#### 3.1 迁移现有逻辑 ✅
- [x] **3.1.1** 创建 `components/quiz/multiple-choice.tsx`
- [x] **3.1.2** 从现有 `quiz-bar.tsx` 中提取选择题逻辑
- [x] **3.1.3** 重构为独立组件，接收 `MultipleChoiceQuestion` props
- [x] **3.1.4** 保留现有动画效果（Framer Motion）
- [x] **3.1.5** 保留现有样式和交互

#### 3.2 接口适配 ✅
- [x] **3.2.1** 调整组件接收新的 `MultipleChoiceQuestion` 类型
- [x] **3.2.2** 添加 `onNext` 回调函数
- [x] **3.2.3** 添加 `onUpdateResults` 回调函数
- [x] **3.2.4】确保向后兼容（旧数据格式）

---

### Phase 4: 闪卡组件实现（预估 3.5 小时） ✅

#### 4.1 基础卡片组件 ✅
- [x] **4.1.1** 创建 `components/quiz/flashcard/card.tsx`
- [x] **4.1.2** 定义 `FlashCardProps` 接口
- [x] **4.1.3** 实现卡片容器（添加 `perspective` 样式）
- [x] **4.1.4** 实现正面内容渲染
- [x] **4.1.5** 实现背面内容渲染
- [x] **4.1.6** 添加 `category` 标签显示（可选）
- [x] **4.1.7** 添加"点击卡片查看答案"提示文字

#### 4.2 翻转动画 ✅
- [x] **4.2.1** 使用 Framer Motion 实现翻转动画
  - [x] 配置 `rotateY` 从 0 到 180 度
  - [x] 设置动画时长（600ms）
  - [x] 添加 `easeInOut` 缓动函数
- [x] **4.2.2** 添加 CSS 3D transform 样式
  - [x] 设置 `transform-style: preserve-3d`
  - [x] 设置 `backface-visibility: hidden`
  - [x] 正面和背面样式分离
- [x] **4.2.3** 添加动画防抖（防止连续点击）
- [x] **4.2.4** 测试动画流畅性

#### 4.3 交互按钮 ✅
- [x] **4.3.1** 在卡片背面添加按钮组
  - [x] "掌握了" 按钮（绿色）
  - [x] "需复习" 按钮（橙色）
  - [x] 使用 AnimatePresence 添加进入动画
- [x] **4.3.2** 实现按钮点击事件
  - [x] 调用 `onAnswer("mastered")` 回调
  - [x] 调用 `onAnswer("need-review")` 回调
- [x] **4.3.3** 阻止按钮点击触发卡片翻转（`stopPropagation`）
- [x] **4.3.4** 测试按钮交互

#### 4.4 Markdown 渲染支持 ✅
- [x] **4.4.1** 集成 `react-markdown`
- [x] **4.4.2** 在正面和背面都支持 Markdown
- [x] **4.4.3** 添加 `prose` 样式类（Tailwind Typography）
- [x] **4.4.4** 支持深色模式
- [x] **4.4.5** 测试代码块渲染

#### 4.5 键盘快捷键 ✅
- [x] **4.5.1** 添加键盘事件监听
  - [x] Space / Enter: 翻转卡片
  - [x] 左箭头: 上一张
  - [x] 右箭头: 下一张
- [x] **4.5.2** 添加 `tabIndex` 和 `role="button"`
- [x] **4.5.3** 添加 `aria-label` 无障碍属性
- [x] **4.5.4** 测试键盘导航

#### 4.6 闪卡容器组件 ✅
- [x] **4.6.1** 创建 `components/quiz/flashcard/index.tsx`
- [x] **4.6.2** 管理翻转状态（`isFlipped`）
- [x] **4.6.3** 管理学习统计（`mastered` / `needReview`）
- [x] **4.6.4** 实现"查看答案"按钮（除点击卡片外的另一种触发方式）
- [x] **4.6.5** 整合 `FlashCard` 子组件
- [x] **4.6.6** 处理闪卡之间的切换逻辑

---

### Phase 5: 结果页面组件（预估 1.5 小时） ✅

#### 5.1 结果页面主组件 ✅
- [x] **5.1.1** 创建 `components/quiz/results/index.tsx`
- [x] **5.1.2** 定义 `QuizResultsProps` 接口
- [x] **5.1.3** 实现结果页面布局
- [x] **5.1.4** 添加"再试一次"按钮
- [x] **5.1.5** 添加"查看详细"按钮（可选展开）

#### 5.2 选择题结果汇总 ✅
- [x] **5.2.1** 创建 `components/quiz/results/multiple-choice-summary.tsx`
- [x] **5.2.2** 显示选择题得分（X / Y 题）
- [x] **5.2.3** 显示正确率百分比
- [x] **5.2.4** 列出每题详情
  - [x] 题目
  - [x] 用户答案
  - [x] 正确答案
  - [x] 对错标记
- [x] **5.2.5** 显示解析（如果有）

#### 5.3 闪卡学习统计 ✅
- [x] **5.3.1** 创建 `components/quiz/results/flashcard-summary.tsx`
- [x] **5.3.2** 显示闪卡总数
- [x] **5.3.3** 显示"掌握了"数量
- [x] **5.3.4** 显示"需复习"数量
- [x] **5.3.5** 列出每张闪卡状态
- [x] **5.3.6** 不显示详细内容（避免作弊）

#### 5.4 混合题型结果展示 ✅
- [x] **5.4.1** 实现分区域显示（选择题区 + 闪卡区）
- [x] **5.4.2** 添加分隔线
- [x] **5.4.3】使用不同图标区分题型
- [x] **5.4.4】优化移动端显示

---

### Phase 6: Quiz 统一入口（预估 1 小时） ✅

#### 6.1 主组件实现 ✅
- [x] **6.1.1** 创建 `components/quiz/index.tsx`
- [x] **6.1.2** 定义 `QuizProps` 接口（使用之前定义的类型）
- [x] **6.1.3** 管理当前题目索引（`currentIndex`）
- [x] **6.1.4** 管理结果显示状态（`showResults`）
- [x] **6.1.5** 管理结果数据（`results`）
- [x] **6.1.6】实现 `handleNext()` 函数

#### 6.2 题型路由 ✅
- [x] **6.2.1** 根据题目类型渲染对应组件
  - [x] `MULTIPLE_CHOICE` → 渲染 `MultipleChoiceQuestion`
  - [x] `FLASHCARD` → 渲染 `FlashCardQuestion`
- [x] **6.2.2** 添加类型守卫确保类型安全

#### 6.3 结果收集 ✅
- [x] **6.3.1** 从选择题组件收集答案
- [x] **6.3.2** 从闪卡组件收集学习状态
- [x] **6.3.3】合并结果到 `QuizResults` 对象
- [x] **6.3.4】计算选择题正确率

#### 6.4 UI 整合 ✅
- [x] **6.4.1** 使用 `Card` 组件包裹
- [x] **6.4.2** 显示题目进度（可选，通过 `showProgress` 控制）
- [x] **6.4.3】显示题目总数和当前序号
- [x] **6.4.4】使用 `ProgressBar` 组件

---

### Phase 7: MDX 集成（预估 0.5 小时） ✅

#### 7.1 组件注册 ✅
- [x] **7.1.1** 打开 `components/mdx-components.tsx`
- [x] **7.1.2** 导入新的 `Quiz` 组件
- [x] **7.1.3** 注册 `QuizBar` 别名（向后兼容）
- [x] **7.1.4】注册 `Quiz` 组件
- [x] **7.1.5】测试组件导出

#### 7.2 向后兼容处理 ✅
- [x] **7.2.1** 确保 `QuizBar` 继续工作
- [x] **7.2.2** 测试旧格式选择题数据
- [x] **7.2.3】验证自动类型检测功能

---

### Phase 8: 测试文件创建（预估 1 小时） ✅

#### 8.1 选择题示例 ✅
- [x] **8.1.1** 创建 `content/blog/quiz-example.mdx`
- [x] **8.1.2** 添加旧格式选择题（测试向后兼容）
- [x] **8.1.3** 添加新格式选择题
- [x] **8.1.4】添加解析字段
- [x] **8.1.5】添加 frontmatter

#### 8.2 闪卡示例 ✅
- [x] **8.2.1** 创建 `content/blog/flashcard-example.mdx`
- [x] **8.2.2** 添加简单闪卡（只有 front/back）
- [x] **8.2.3** 添加带 category 的闪卡
- [x] **8.2.4】添加带 difficulty 的闪卡
- [x] **8.2.5】在 back 中使用 Markdown（列表、代码块）
- [x] **8.2.6】添加 frontmatter

#### 8.3 混合题型示例 ✅
- [x] **8.3.1** 创建 `content/blog/mixed-quiz-example.mdx`
- [x] **8.3.2** 添加 2-3 道选择题
- [x] **8.3.3】添加 2-3 张闪卡
- [x] **8.3.4】混合排列（非全部选择题在前）
- [x] **8.3.5】添加 frontmatter

---

### Phase 9: 清理和优化（预估 0.5 小时） ✅

#### 9.1 旧文件处理 ✅
- [x] **9.1.1** 备份原有 `components/quiz-bar.tsx`
- [x] **9.1.2】评估是否需要删除或保留
- [x] **9.1.3】如有必要，添加迁移注释

#### 9.2 代码优化 ✅
- [x] **9.2.1** 移除未使用的导入
- [x] **9.2.2】统一代码风格（使用 Prettier）
- [x] **9.2.3】添加必要的注释（特别是复杂逻辑）
- [x] **9.2.4】确保所有组件都有 `displayName`（便于调试）

#### 9.3 TypeScript 检查 ✅
- [x] **9.3.1** 运行 `pnpm lint` 检查类型错误
- [x] **9.3.2】修复所有 TypeScript 错误
- [x] **9.3.3】确保没有 `any` 类型（除了必要的地方）

---

### Phase 10: 测试和验证（预估 1 小时） ✅

#### 10.1 本地开发测试 ✅
- [x] **10.1.1** 启动开发服务器 `pnpm dev`
- [x] **10.1.2** 访问选择题示例页面
  - [x] 验证选择题正常显示
  - [x] 测试答题逻辑
  - [x] 测试结果页面
- [x] **10.1.3** 访问闪卡示例页面
  - [x] 验证闪卡正常显示
  - [x] 测试翻转动画
  - [x] 测试"掌握了"/"需复习"按钮
  - [x] 测试键盘快捷键
- [x] **10.1.4** 访问混合题型示例页面
  - [x] 验证题型切换
  - [x] 验证进度条
  - [x] 验证结果页面统计

#### 10.2 向后兼容性测试 ✅
- [x] **10.2.1** 找到现有使用 `QuizBar` 的 MDX 文件
- [x] **10.2.2】验证旧格式选择题仍然正常工作
- [x] **10.2.3】验证旧数据被正确识别为选择题

#### 10.3 边界情况测试 ⚠️
- [ ] **10.3.1** 测试只有 1 题的情况
- [ ] **10.3.2】测试只有闪卡的情况
- [ ] **10.3.3】测试只有选择题的情况
- [ ] **10.3.4】测试空题目数组（应显示错误）
- [ ] **10.3.5】测试无效的闪卡数据（缺少 front/back）

#### 10.4 移动端测试 ⚠️
- [ ] **10.4.1** 使用浏览器开发者工具模拟移动端
- [ ] **10.4.2】测试卡片在移动端的显示
- [ ] **10.4.3】测试点击翻卡（不与滚动冲突）
- [ ] **10.4.4】测试按钮在移动端的大小和间距

#### 10.5 性能检查 ✅
- [x] **10.5.1** 使用 React DevTools 检查不必要的重渲染
- [x] **10.5.2】验证 `React.memo` 的使用（如有）
- [x] **10.5.3】检查动画性能（使用 Performance 面板）
- [x] **10.5.4】验证大量题目时的性能（100+）

---

### Phase 11: 文档更新（预估 0.5 小时） ✅

#### 11.1 更新 plan.md ✅
- [x] **11.1.1** 将完成的任务标记为 ✅
- [x] **11.1.2】记录实施过程中的问题和解决方案
- [x] **11.1.3】更新实际耗时（对比预估）

#### 11.2 使用文档（可选） ⏭️
- [ ] **11.2.1** 在 `CLAUDE.md` 中添加 Quiz 组件使用说明
- [ ] **11.2.2】添加 MDX 示例代码
- [ ] **11.2.3】添加数据结构说明

---

### Phase 12: 发布准备（预估 0.5 小时） ⏭️

#### 12.1 代码审查 ⏭️
- [ ] **12.1.1** 自我审查所有代码
- [ ] **12.1.2】检查是否有硬编码值
- [ ] **12.1.3】检查是否有 TODO 注释未处理
- [ ] **12.1.4】检查是否有 console.log 未移除

#### 12.2 Git 提交 ⏭️
- [ ] **12.2.1** 运行 `pnpm lint` 确保无错误
- [ ] **12.2.2】运行 `pnpm build` 确保构建成功
- [ ] **12.2.3】暂存所有更改 `git add .`
- [ ] **12.2.4】创建提交 `git commit -m "feat: 添加闪卡题型，扩展 Quiz 组件"`
- [ ] **12.2.5】（可选）推送 `git push`

---

## 8. 预估工作量

| 阶段 | 任务数 | 预估时间 | 关键产出 |
|------|--------|----------|----------|
| **Phase 1**: 基础架构搭建 | 13 | 1.5 小时 | 类型定义、工具函数 |
| **Phase 2**: 进度条组件 | 5 | 0.5 小时 | 可复用的进度条 |
| **Phase 3**: 选择题重构 | 7 | 1 小时 | 重构后的选择题组件 |
| **Phase 4**: 闪卡组件实现 | 25 | 3.5 小时 | 完整的闪卡功能 |
| **Phase 5**: 结果页面 | 13 | 1.5 小时 | 统一的结果展示 |
| **Phase 6**: Quiz 统一入口 | 12 | 1 小时 | 主入口组件 |
| **Phase 7**: MDX 集成 | 5 | 0.5 小时 | MDX 组件注册 |
| **Phase 8**: 测试文件 | 15 | 1 小时 | 3 个示例文件 |
| **Phase 9**: 清理优化 | 7 | 0.5 小时 | 代码质量提升 |
| **Phase 10**: 测试验证 | 17 | 1 小时 | 全面测试 |
| **Phase 11**: 文档更新 | 3 | 0.5 小时 | 使用文档 |
| **Phase 12**: 发布准备 | 5 | 0.5 小时 | 代码审查和提交 |
| **总计** | **127** | **12 小时** | **完整的闪卡 Quiz 系统** |

---

## 9. 实施注意事项

### 9.1 依赖安装

在开始实施前，确保安装以下依赖：

```bash
# Markdown 渲染支持
pnpm add react-markdown

# 如需更好的 Markdown 样式（可选）
pnpm add @tailwindcss/typography
```

### 9.2 关键文件清单

**需要创建的文件**（15 个）:
```
components/quiz/
├── index.tsx                      # 主入口
├── types.ts                       # 类型定义
├── utils.ts                       # 工具函数
├── progress-bar.tsx              # 进度条
├── multiple-choice.tsx            # 选择题组件
├── flashcard/
│   └── card.tsx                  # 闪卡组件
└── results/
    ├── index.tsx                 # 结果页面主组件
    ├── multiple-choice-summary.tsx
    └── flashcard-summary.tsx

content/blog/
├── quiz-example.mdx              # 选择题示例
├── flashcard-example.mdx         # 闪卡示例
└── mixed-quiz-example.mdx        # 混合题型示例
```

**需要修改的文件**（2 个）:
```
components/mdx-components.tsx     # 组件注册
components/quiz-bar.tsx           # (可选) 备份或删除
```

### 9.3 实施顺序建议

1. **先创建基础**：Phase 1 → Phase 2 → Phase 3
2. **核心功能**：Phase 4（闪卡组件是重点）
3. **整合**：Phase 5 → Phase 6
4. **测试**：Phase 7 → Phase 8 → Phase 10
5. **收尾**：Phase 9 → Phase 11 → Phase 12

### 9.4 调试技巧

- **React DevTools**: 查看组件层级和 state
- **Console.log**: 在关键位置添加日志
- **TypeScript**: 利用类型检查提前发现问题
- **分步测试**: 每完成一个 Phase 就测试一次

---

## 10. 开始实施

所有准备工作已完成，可以开始实施了！

**建议**:
1. 按照 Phase 顺序逐个完成
2. 每完成一个任务，在 plan.md 中标记 ✅
3. 遇到问题先查看本文档的"技术权衡和注意事项"部分
4. 完成每个 Phase 后进行测试

**准备好了吗？开始吧！** 🚀
