import { HeaderContentProps } from "@/types/container";
import clsx from "clsx";

const HeaderContent = ({ title, desc, flexDirection, align = "center" }: HeaderContentProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 font-[Outfit] md:text-left text-center",
        flexDirection === "row" ? "md:flex-row flex-col md:text-left" : "flex-col",
        align === "left" ? "items-start" : "items-center"
      )}
    >
      <div className="bg-[#AEF169] rounded-[8px] p-2">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <div
        className={clsx(
          flexDirection === "row" ? "max-w-[799px]" : "max-w-full"
        )}
      >
        <p className="text-lg">{desc}</p>
      </div>
    </div>
  );
};

export default HeaderContent;
