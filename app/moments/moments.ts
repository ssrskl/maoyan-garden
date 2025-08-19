export interface Moment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  timestamp: Date;
  location?: string;
  likes: number;
  liked: boolean;
}

export const initialMoments: Moment[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "猫颜",
      avatar: "/avatar.png"
    },
    content: "夜爬火炉山+猫猫，猫猫果然是那种你看着有一只在那里，然后去摸一摸，待会儿就会冒出很多只的动物₍˄·͈༝·͈˄*₎◞ ̑̑",
    images: [
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/huolushan1.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/huolushan2.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/huolushan3.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/huolushan4.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/huolushan5.jpg?x-oss-process=image/quality,q_80",
    ],
    timestamp: new Date(2025, 5, 1), // 1小时前
    location: "广州火炉山",
    likes: 24,
    liked: false,
  },
  {
    id: "2",
    user: {
      id: "u1",
      name: "猫颜",
      avatar: "/avatar.png"
    },
    content: "第三段实习喽 ！！字节的饭还是相当不戳的！！！",
    images: [
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship1.png?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship2.png?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship3.png?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship4.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship5.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship6.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship7.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship8.jpg?x-oss-process=image/quality,q_80",
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/internship9.jpg?x-oss-process=image/quality,q_80",
    ],
    timestamp: new Date(2025, 8, 6), // 1小时前
    location: "上海新江湾",
    likes: 99,
    liked: false,
  },
  {
    id: "3",
    user: {
      id: "u1",
      name: "猫颜",
      avatar: "/avatar.png"
    },
    content: "你怎么知道我单抽一发出气象感应了呢！！！🥰",
    images: [
      "https://maoyanimagehost.oss-cn-guangzhou.aliyuncs.com/moments/qixiangganying.jpg?x-oss-process=image/quality,q_80",
    ],
    timestamp: new Date(2025, 8, 6), // 1小时前
    location: "静安区魔方公寓",
    likes: 520,
    liked: false,
  },
]