import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { LinkCard } from "./linkcard";
import { QuizBar } from "./quiz-bar";
import React from "react";
import SplitLayout from "./split-layout";
// import Zoom from 'react-medium-image-zoom'

import "react-medium-image-zoom/dist/styles.css";
import { BookCard } from "./book-card";
import { Sidenote } from "./sidenote";
import { Dialogue, SpeechBubble } from "./dialogue";
import Link from "next/link";
import { PhotoView } from "react-photo-view";
import { AlgorithmVisualizer } from "./algorithm-visualizer";
import { DictTooltip } from "./dict-tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";


const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  LinkCard,
  QuizBar,
  Sidenote,
  Dialogue,
  SpeechBubble,
  SplitLayout,
  DictTooltip,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return (
      <PhotoView src={props.src}>
        <img {...props} />  
      </PhotoView>
    );
  },
  BookCard,
  Link,
  AlgorithmVisualizer,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
};

interface MdxProps {
  code: string;
}
// 防止组件重新渲染，post-content.tsx 文件中，有一个 useEffect 负责监听滚动事件，目的是为了控制“返回顶部”按钮的显示和隐藏。
// 这个滚动事件的监听函数会调用 setShowBackToTop 来更新组件的状态。这个更新在您滚动时会频繁发生。
// 每当 PostContent 组件的状态（showBackToTop）发生改变，React 就会重新渲染 PostContent 组件以及它的所有子组件，以确保界面和最新的状态同步。
export const MDXContent = React.memo(function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
      <Component components={components} />
  );
});
