import Image from "next/image";

interface ArticleTagProps {
    icon: React.ReactNode | string;
    tagName: string;
  }
  
  export const ArticleTag = ({ icon, tagName }: ArticleTagProps) => {
    return (
      <div className="flex items-center space-x-2 text-lg border border-border rounded-md py-1 px-2 hover:bg-accent cursor-pointer">
        {typeof icon === "string" ? (
          <div className="relative h-6 w-6 overflow-hidden rounded-lg">
            <Image src={icon} alt={tagName} fill sizes="24px" className="object-cover" />
          </div>
        ) : (
          icon
        )}
        <p className="text-sm">{tagName}</p>
      </div>
    );
  };
