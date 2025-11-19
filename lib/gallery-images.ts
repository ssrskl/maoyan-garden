export interface GalleryImage {
  id: string;
  src: string;      // 绝对地址或 /gallery/xxx.jpg
  width: number;
  height: number;
  alt: string;
  tags?: string[];
  blurDataURL?: string; // 可选，占位图
  description?: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'g-001', src: '/gallery/yinghua.jpg', width: 1280, height: 853, alt: '京都的樱花', tags: ['旅行','樱花'], blurDataURL: '/gallery/yinghua.jpg', description: '洛城春色到门来，十里花光映人衣' },
  { id: 'g-002', src: '/gallery/shanghai-1.jpg', width: 1600, height: 1067, alt: '上海的夜色', tags: ['城市','夜景'], description: '灯火万家城四畔，星河一道水中央' },
  { id: 'g-003', src: '/moments/huolushan1.jpg', width: 1600, height: 1067, alt: '火炉山林径', tags: ['自然','徒步'], description: '小径入深林，风过叶声疏' },
  { id: 'g-004', src: '/moments/huolushan2.jpg', width: 1600, height: 1067, alt: '山间光影', tags: ['自然','光影'], description: '云影天光共流转，松间清气自来' },
  { id: 'g-005', src: '/moments/huolushan3.jpg', width: 1600, height: 1067, alt: '岭南树影', tags: ['自然','植物'], description: '树影横斜水清浅，草色入帘青' },
  { id: 'g-006', src: '/moments/huolushan4.jpg', width: 1600, height: 1067, alt: '林海深处', tags: ['自然'], description: '行到深处无他语，唯闻山雨落松梢' },
  { id: 'g-007', src: '/moments/huolushan5.jpg', width: 1600, height: 1067, alt: '暮色中的山路', tags: ['自然','黄昏'], description: '残阳如血天将暮，归路微灯照人行' },
  { id: 'g-008', src: '/imgs/zhishenshinei.jpg', width: 1280, height: 853, alt: '纸深室内', tags: ['人文','空间'], description: '一室书香留墨气，半窗清影入茶汤' },
];