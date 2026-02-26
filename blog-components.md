# MDX 组件使用指南

本文档详细介绍了博客中可用的所有 MDX 组件，包括默认组件和自定义组件的使用方法、使用场景以及示例。

## 目录

- [默认组件](#默认组件)
  - [基础 HTML 标签](#基础-html-标签)
  - [图片 (img)](#图片-img)
  - [链接 (Link)](#链接-link)
  - [代码块 (pre)](#代码块-pre)
- [自定义组件](#自定义组件)
  - [提示框 (Callout)](#提示框-callout)
  - [旁注 (Sidenote)](#旁注-sidenote)
  - [对话 (Dialogue)](#对话-dialogue)
  - [书籍卡片 (BookCard)](#书籍卡片-bookcard)
  - [测验 (QuizBar)](#测验-quizbar)
  - [算法可视化 (AlgorithmVisualizer)](#算法可视化-algorithmvisualizer)（暂时不使用）
  - [分栏布局 (SplitLayout)](#分栏布局-splitlayout)
  - [术语提示 (DictTooltip)](#术语提示-dicttooltip)
  - [数据库表格 (DatabaseTable)](#数据库表格-databasetable)
  - [手风琴 (Accordion)](#手风琴-accordion)（暂时不使用）
  - [标签页 (Tabs)](#标签页-tabs)

---

## 默认组件

### 基础 HTML 标签

所有标准 Markdown 语法在 MDX 中都可用：

**使用方法：**

```mdx
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*
~~删除线~~

- 无序列表项
- 另一个列表项
  - 嵌套列表项

1. 有序列表项
2. 第二个列表项

> 引用块内容

| 表头1 | 表头2 |
|-------|-------|
| 内容1 | 内容2 |
| 内容3 | 内容4 |

---

[链接文本](https://example.com)

![图片描述](./path/to/image.png)
```

**使用场景：**
- 日常文档编写
- 内容格式化
- 表格数据展示

---

### 图片 (img)

图片组件被增强为支持点击放大查看。

**使用方法：**

```mdx
![图片描述](./imgs/example.png)

<img src="./imgs/example.png" alt="描述" />
```

**使用场景：**
- 文章配图
- 截图展示
- 图表说明

**特性：**
- 支持点击放大查看（使用 react-photo-view）
- 响应式布局
- 懒加载优化

---

### 链接 (Link)

Next.js 的 Link 组件，支持客户端路由。

**使用方法：**

```mdx
<Link href="/blog/hello-world">跳转到 Hello World</Link>

<Link href="https://example.com" target="_blank">外部链接</Link>
```

**Props：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `href` | string | 链接地址 |
| `target` | string | 可选，`_blank` 表示新窗口打开 |

**使用场景：**
- 站内文章跳转
- 外部资源引用
- 导航链接

---

### 代码块 (pre)

代码块组件支持语法高亮和一键复制功能。

**使用方法：**

````mdx
```javascript
function hello() {
  console.log("Hello, World!");
}
```

```python
# Python 代码示例
def hello():
    print("Hello, World!")
```

```java
// Java 代码示例
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```
````

**使用场景：**
- 代码示例展示
- 配置文件说明
- 命令行操作演示

**特性：**
- 自动语法高亮
- 右上角一键复制按钮
- 支持所有主流编程语言

---

## 自定义组件

### 提示框 (Callout)

用于突出显示重要信息、警告或提示。

**使用方法：**

```mdx
<Callout type="info">
  这是信息提示，用于补充说明重要内容。
</Callout>

<Callout type="warning">
  这是警告提示，用于提醒注意事项。
</Callout>

<Callout type="danger">
  这是危险提示，用于强调严重问题。
</Callout>
```

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `"info" \| "warning" \| "danger"` | `"info"` | 提示框类型 |
| `children` | ReactNode | - | 提示框内容 |

**使用场景：**
- 重要概念强调
- 注意事项提醒
- 最佳实践建议
- 错误警告提示

**示例：**

<Callout type="info">
  **垃圾回收（Garbage Collection，简称 GC）** 是一种自动内存管理机制，它负责自动识别程序中不再使用的内存对象，并将其回收释放。
</Callout>

<Callout type="warning">
  **循环引用问题**：当两个或多个对象相互引用，但没有被外部引用时，它们的引用计数都不为 0，但实际上已经无法被访问到。
</Callout>

<Callout type="danger">
  老年代空间不足时会触发 Full GC，应尽量避免！
</Callout>

---

### 旁注 (Sidenote)

用于添加补充说明，桌面端显示在侧边，移动端显示为强调块。

**使用方法：**

```mdx
正文内容<Sidenote>这是旁注内容，用于补充说明</Sidenote>继续正文。

<Sidenote>
  这是一个较长的旁注，可以包含多个段落和**格式化内容**。
</Sidenote>
```

**Props：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `children` | ReactNode | 旁注内容 |
| `className` | string | 可选，自定义样式类 |

**使用场景：**
- 补充说明不打扰主阅读流
- 引用来源标注
- 附加技术细节
- 相关概念链接

**示例：**

现代 GC 的设计目标不仅是回收垃圾，更是在吞吐量、延迟和内存占用之间寻找最佳平衡。<Sidenote>Stage 的划分是根据 Shuffle 类型的算子来进行划分的，Shuffle 类型的算子包括 `groupByKey`、`reduceByKey`、`join`、`cogroup` 等。</Sidenote>

---

### 对话 (Dialogue)

用于创建对话式内容，模拟聊天场景。

**使用方法：**

```mdx
<Dialogue>
  <SpeechBubble 
    speaker="猫颜" 
    avatar="/avatar.png" 
    side="left"
  >
    传统的博客感觉有点像单向输出，我一直在想，怎么才能让它更有生命力？
  </SpeechBubble>
  
  <SpeechBubble 
    speaker="AI 伙伴" 
    avatar="/avatar.png" 
    side="right"
  >
    "数字花园"是一个很好的概念！它不强调时间线，而是强调**知识的连接**。就像我们现在这样，通过对话来碰撞和深化想法。
  </SpeechBubble>
</Dialogue>
```

**Dialogue Props：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `children` | ReactNode | 包含多个 SpeechBubble |
| `className` | string | 可选，自定义样式类 |

**SpeechBubble Props：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `speaker` | string | 发言人名称 |
| `avatar` | string | 头像图片路径 |
| `side` | `"left" \| "right"` | 气泡显示位置 |
| `children` | ReactNode | 对话内容（支持 Markdown） |

**使用场景：**
- 问答式内容展示
- 观点碰撞讨论
- 教学对话场景
- 读书笔记分享

---

### 书籍卡片 (BookCard)

用于展示书籍信息，包含封面、评分、标签等。

**使用方法：**

```mdx
<BookCard
  href="https://weread.qq.com/web/reader/xxx"
  coverImage="/imgs/book-cover.png"
  title="用心理学拯救行为上瘾"
  author="【美】 布莱恩·利特尔"
  rating={4.1}
  summary="数字时代，我们比身处人类历史上的其他任何时代都更容易上瘾..."
  tags={["心理学", "必读"]}
/>
```

**Props：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `href` | string | 书籍链接地址 |
| `coverImage` | string \| StaticImageData | 书籍封面图片路径 |
| `title` | string | 书名 |
| `author` | string | 作者 |
| `rating` | number | 评分（0-5） |
| `summary` | string | 书籍简介 |
| `tags` | string[] | 可选，标签列表 |

**使用场景：**
- 读书笔记页面
- 书籍推荐列表
- 年度阅读总结

---

### 测验 (QuizBar)

用于创建交互式测验，支持多选题。

**使用方法：**

```mdx
<QuizBar questions={[
  {
    question: "什么是垃圾回收？",
    options: [
      "手动释放内存",
      "自动识别并回收不再使用的内存对象",
      "增加内存容量",
      "优化 CPU 使用"
    ],
    correctAnswer: "自动识别并回收不再使用的内存对象",
    explanation: "垃圾回收（GC）是一种自动内存管理机制，负责自动识别程序中不再使用的内存对象并回收。"
  },
  {
    question: "Java 默认使用什么垃圾收集器？",
    options: [
      "Serial GC",
      "Parallel GC",
      "G1 GC",
      "ZGC"
    ],
    correctAnswer: "G1 GC",
    explanation: "从 JDK 9 开始，G1（Garbage First）成为默认的垃圾收集器。"
  }
]} />
```

**Props：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `questions` | Question[] | 题目数组 |

**Question 结构：**

```typescript
interface Question {
  question: string;        // 题目内容
  options: string[];       // 选项列表
  correctAnswer: string;   // 正确答案
  explanation: string;     // 答案解析
}
```

**使用场景：**
- 知识检验
- 学习效果评估
- 互动式教程
- 概念巩固练习

---

### 算法可视化 (AlgorithmVisualizer) （暂时不使用）

用于展示算法执行过程的交互式可视化组件。

**使用方法：**

```mdx
<AlgorithmVisualizer
  title="快速排序算法演示"
  steps={[
    {
      id: 1,
      title: "初始数组",
      description: "这是我们要排序的初始数组...",
      codeSnippet: `function quickSort(arr, left, right) {
  if (left < right) {
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}`,
      highlightedLines: [1],
      imageUrl: "/images/quick-sort-step-1.png",
      imageAlt: "快速排序初始数组状态"
    },
    {
      id: 2,
      title: "选择基准元素",
      description: "我们选择数组的第一个元素作为基准...",
      codeSnippet: `function quickSort(arr, left, right) {
  if (left < right) {
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}`,
      highlightedLines: [2, 3],
      imageUrl: "/images/quick-sort-step-2.png",
      imageAlt: "选择基准元素后的数组状态"
    }
  ]}
  initialSpeed={50}
/>
```

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | - | 可视化标题 |
| `steps` | AlgorithmStep[] | - | 算法步骤数组 |
| `initialSpeed` | number | 50 | 初始播放速度（0-100） |

**AlgorithmStep 结构：**

```typescript
interface AlgorithmStep {
  id: number;              // 步骤ID
  title: string;           // 步骤标题
  description: string;     // 步骤描述
  codeSnippet: string;     // 代码片段
  highlightedLines?: number[];  // 高亮行号
  imageUrl: string;        // 可视化图片URL
  imageAlt: string;        // 图片描述
}
```

**使用场景：**
- 算法教学
- 代码执行过程演示
- 数据结构可视化
- 技术原理讲解

---

### 分栏布局 (SplitLayout)

用于创建图文并排或双栏内容布局。

**使用方法：**

```mdx
<!-- 图片 + 内容布局 -->
<SplitLayout layout="1/2" image="./imgs/example.png">
  这里是与图片并排显示的内容。
  支持 Markdown 格式。
</SplitLayout>

<!-- 内容 + 内容布局 -->
<SplitLayout layout="1/2">
  <div>
    左侧内容
  </div>
  <div>
    右侧内容
  </div>
</SplitLayout>

<!-- 反向布局（图片在右） -->
<SplitLayout layout="1/3" image="./imgs/example.png" reverse>
  内容在左侧，图片在右侧。
</SplitLayout>
```

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `layout` | `"1/3" \| "1/2" \| "1/4"` | `"1/2"` | 布局比例 |
| `image` | string | - | 可选，图片路径 |
| `reverse` | boolean | false | 是否反向布局 |
| `className` | string | - | 可选，自定义样式类 |
| `children` | ReactNode | - | 内容 |

**使用场景：**
- 图文并排展示
- 对比内容呈现
- 产品特性介绍
- 步骤说明配图

---

### 术语提示 (DictTooltip)

用于在术语上显示定义提示的组件。

**使用方法：**

```mdx
<DictTooltip>React</DictTooltip> 是一个用于构建用户界面的 JavaScript 库。

在 <DictTooltip>Flink</DictTooltip> 中，数据以流的形式处理。
```

**工作原理：**
- 组件会在 `content/dict/glossary.ts` 中查找匹配的术语定义
- 如果找到，则显示悬停提示卡片
- 支持术语别名匹配

**使用场景：**
- 专业术语解释
- 概念首次出现时标注
- 降低阅读门槛
- 建立知识链接

**配置术语词典：**

在 `content/dict/glossary.ts` 中添加术语定义：

```typescript
export const glossary = [
  {
    term: "React",
    definition: "A JavaScript library for building user interfaces.",
    contributors: "猫颜",
    type: "前端/框架",
    links: [
      { name: "React 官方文档", url: "https://reactjs.org/" }
    ]
  },
  {
    term: "Flink",
    definition: "Apache Flink 是一个在有界数据流和无界数据流上进行有状态计算的分布式处理引擎。",
    contributors: "猫颜",
    type: "大数据/计算引擎",
    aliases: ["Apache Flink"],  // 别名
    links: [
      { name: "Flink 文档", url: "https://flink.apache.org/" }
    ]
  }
];
```

---

### 数据库表格 (DatabaseTable)

用于展示可交互的数据库风格表格。

**使用方法：**

```mdx
<DatabaseTable initialData={{
  columns: [
    { id: "name", title: "姓名", type: "text", width: 150 },
    { id: "age", title: "年龄", type: "number", width: 100 },
    { 
      id: "status", 
      title: "状态", 
      type: "select", 
      width: 120,
      options: [
        { id: "active", label: "活跃", bg_color: "#22c55e", text_color: "#ffffff" },
        { id: "inactive", label: "停用", bg_color: "#ef4444", text_color: "#ffffff" }
      ]
    },
    { id: "email", title: "邮箱", type: "url", width: 200 }
  ],
  rows: [
    { 
      id: "1", 
      cells: { 
        name: "张三", 
        age: 25, 
        status: "active",
        email: "zhangsan@example.com"
      } 
    },
    { 
      id: "2", 
      cells: { 
        name: "李四", 
        age: 30, 
        status: "inactive",
        email: "lisi@example.com"
      } 
    }
  ]
}} />
```

**Props：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `initialData` | DatabaseData | 表格初始数据 |
| `className` | string | 可选，自定义样式类 |

**列类型（ColumnType）：**

| 类型 | 说明 |
|------|------|
| `text` | 文本输入 |
| `number` | 数字输入 |
| `select` | 单选下拉框 |
| `multi-select` | 多选下拉框 |
| `url` | URL 链接 |

**使用场景：**
- 数据展示
- 配置说明
- 对比表格
- 可编辑数据演示

---

### 手风琴 (Accordion)（暂时不使用）

可折叠的内容面板，用于组织大量信息。

**使用方法：**

```mdx
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>🌱 Minor GC（Young GC）</AccordionTrigger>
    <AccordionContent>
      只回收新生代。因为新生代对象存活率低，使用复制算法效率高。
      发生频率高，但停顿时间短（通常在几十毫秒内）。
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-2">
    <AccordionTrigger>🌳 Major GC（Old GC）</AccordionTrigger>
    <AccordionContent>
      只回收老年代。通常与 Full GC 等价，因为回收老年代时往往也需要回收其他区域。
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-3">
    <AccordionTrigger>🌍 Full GC</AccordionTrigger>
    <AccordionContent>
      回收整个堆（新生代 + 老年代 + 方法区）。触发条件：老年代空间不足、方法区空间不足等。
      停顿时间长，应尽量避免。
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `"single" \| "multiple"` | - | 展开模式，单选或多选 |
| `collapsible` | boolean | - | 是否可折叠 |
| `className` | string | - | 可选，自定义样式类 |

**使用场景：**
- FAQ 问答
- 分类信息展示
- 详细说明折叠
- 节省页面空间

---

### 标签页 (Tabs)

用于在多个相关内容之间切换。

**使用方法：**

```mdx
<Tabs defaultValue="mark-sweep" className="w-full">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="mark-sweep">标记-清除</TabsTrigger>
    <TabsTrigger value="copy">复制算法</TabsTrigger>
    <TabsTrigger value="mark-compact">标记-整理</TabsTrigger>
    <TabsTrigger value="generational">分代收集</TabsTrigger>
  </TabsList>
  
  <TabsContent value="mark-sweep" className="space-y-4">
    ### 标记-清除算法
    
    这是最基础的垃圾回收算法...
  </TabsContent>
  
  <TabsContent value="copy" className="space-y-4">
    ### 复制算法
    
    将内存分为大小相等的两块...
  </TabsContent>
  
  <TabsContent value="mark-compact" className="space-y-4">
    ### 标记-整理算法
    
    结合了标记-清除和复制算法的优点...
  </TabsContent>
  
  <TabsContent value="generational" className="space-y-4">
    ### 分代收集算法
    
    基于弱分代假说...
  </TabsContent>
</Tabs>
```

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `defaultValue` | string | - | 默认选中的标签 |
| `className` | string | - | 可选，自定义样式类 |

**使用场景：**
- 多方案对比
- 不同视角展示
- 分类内容切换
- 代码语言切换

---

## 组件组合使用示例

### 示例 1：技术文章结构

```mdx
# JVM 垃圾回收机制

<Callout type="info">
  本文将深入讲解 JVM 的垃圾回收机制，适合有一定 Java 基础的读者。
</Callout>

## 什么是 GC

垃圾回收（Garbage Collection）<Sidenote>GC 是 Garbage Collection 的缩写</Sidenote>是一种自动内存管理机制。

### GC 算法对比

<Tabs defaultValue="g1">
  <TabsList>
    <TabsTrigger value="g1">G1 收集器</TabsTrigger>
    <TabsTrigger value="zgc">ZGC 收集器</TabsTrigger>
  </TabsList>
  
  <TabsContent value="g1">
    G1 是 JDK 9 之后的默认垃圾收集器...
  </TabsContent>
  
  <TabsContent value="zgc">
    ZGC 是 JDK 11 引入的低延迟垃圾收集器...
  </TabsContent>
</Tabs>

<QuizBar questions={gcQuestions} />
```

### 示例 2：读书笔记页面

```mdx
# 读书笔记

<BookCard
  href="https://example.com/book"
  coverImage="/imgs/book.png"
  title="书名"
  author="作者"
  rating={4.5}
  summary="书籍简介..."
  tags={["心理学", "必读"]}
/>

## 核心观点

<Dialogue>
  <SpeechBubble speaker="读者" avatar="/avatar.png" side="left">
    这本书给我最大的启发是什么？
  </SpeechBubble>
  <SpeechBubble speaker="作者" avatar="/avatar.png" side="right">
    行为上瘾的背后往往是未疗愈的创伤...
  </SpeechBubble>
</Dialogue>

<Callout type="warning">
  注意：心流和上瘾的区别在于，心流带来的是充实感，而上瘾带来的是空虚感。
</Callout>
```

---

## 最佳实践

1. **不要过度使用组件**：保持内容简洁，只在需要强调或交互时使用组件
2. **注意组件嵌套**：某些组件可以嵌套使用，但要避免过深的嵌套
3. **移动端适配**：所有组件都支持响应式，但在设计时要考虑移动端体验
4. **图片优化**：使用适当大小的图片，避免影响页面加载速度
5. **术语一致性**：使用 DictTooltip 时确保术语已在 glossary 中定义

---

## 文件位置

- **MDX 组件配置**：`components/mdx-components.tsx`
- **组件目录**：`components/`
- **术语词典**：`content/dict/glossary.ts`
- **MDX 编译 API**：`app/api/mdx/compile/route.ts`
