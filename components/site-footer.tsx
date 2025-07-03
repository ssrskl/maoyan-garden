import { siteConfig } from "@/config/site";
import { FaCircleCheck } from "react-icons/fa6";
import { SiSinaweibo, SiTencentqq, SiWechat, SiZhihu } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export function SiteFooter() {
  return (
    <footer className="flex pb-32 w-full pt-48 items-start justify-center space-y-4 ">
      <div className="flexjustify-between">
        <div className="flex flex-col space-y-4 justify-center items-center">
          <div className="flex justify-between items-center space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={"https://avatars.githubusercontent.com/u/18780761?v=4"} />
                <AvatarFallback>MY</AvatarFallback>
              </Avatar>
              <div className="text-lg font-bold">猫颜的个人博客</div>
            </div>
            <p className="text-zinc-700 text-sm">一花一世界，一叶一追寻</p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <div className="grid grid-cols-4 gap-2">
              <SiTencentqq className="border border-stone-300 w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer" />
              <SiWechat className="border border-stone-300 w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer" />
              <SiSinaweibo className="border border-stone-300 w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer" />
              <SiZhihu className="border border-stone-300 w-9 h-9 p-2 rounded-full hover:bg-stone-200 cursor-pointer" />
            </div>
            <div className="flex items-center space-x-2 rounded-lg hover:bg-zinc-200 hover:shadow-md px-2 py-1">
              <div className="relative flex w-4 h-4">
                <FaCircleCheck className="absolute text-green-400 animate-ping " />
                <FaCircleCheck className="text-green-400 " />
              </div>
              <p className="text-sm">服务器运行中</p>
            </div>
          </div>
          <p className="text-zinc-400">© 2023-2025 Maoyan, LLC</p>
        </div>
      </div>
    </footer>);
}
