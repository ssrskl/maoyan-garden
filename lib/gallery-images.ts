export interface GalleryImage {
  id: string;
  src: string;      // 绝对地址或 /gallery/xxx.jpg
  width: number;
  height: number;
  alt: string;
  tags?: string[];
  blurDataURL?: string; // 可选，占位图
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/gallery/yinghua.jpg',
    width: 1280,
    height: 853,
    alt: '京都的樱花',
    tags: ['旅行', '樱花'],
    blurDataURL: '/gallery/yinghua.jpg',
  },
    {
    id: '1',
    src: '/gallery/yinghua.jpg',
    width: 1280,
    height: 853,
    alt: '京都的樱花',
    tags: ['旅行', '樱花'],
    blurDataURL: '/gallery/yinghua.jpg',
  },
    {
    id: '1',
    src: '/gallery/yinghua.jpg',
    width: 1280,
    height: 853,
    alt: '京都的樱花',
    tags: ['旅行', '樱花'],
    blurDataURL: '/gallery/yinghua.jpg',
  },
    {
    id: '1',
    src: '/gallery/yinghua.jpg',
    width: 1280,
    height: 853,
    alt: '京都的樱花',
    tags: ['旅行', '樱花'],
    blurDataURL: '/gallery/yinghua.jpg',
  },
    {
    id: '1',
    src: '/gallery/yinghua.jpg',
    width: 1280,
    height: 853,
    alt: '京都的樱花',
    tags: ['旅行', '樱花'],
    blurDataURL: '/gallery/yinghua.jpg',
  }
];