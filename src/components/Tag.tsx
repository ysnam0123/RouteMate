import { twMerge } from "tailwind-merge";

type TagProps = {
  icon?: string;
  label: string;
  className?: string;
};

export default function Tag({ icon, label, className }: TagProps) {
  return (
    <div
      className={twMerge(
        "w-42 h-8 border border-[#949494] rounded-[19px] text-[#949494] mx-0.5 my-0.5 flex items-center gap-1 px-5 cursor-pointer hover:text-[#60B5FF] hover:border-[#60B5FF] transition-all duration-200",
        className
      )}
    >
      {icon && <img src={icon} className="w-5" alt="tag icon" />}
      <span className="flex items-center justify-center w-full text-[15px] ">
        {label}
      </span>
    </div>
  );
}
