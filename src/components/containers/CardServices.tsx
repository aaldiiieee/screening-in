import { CardServicesProps } from "@/types/container";
import clsx from "clsx";

const CardServices = ({ image, linkTo, title, variant }: CardServicesProps) => {
  return (
    <div
      className={clsx(
        "relative md:p-[50px] p-4 md:rounded-3xl rounded-xl font-[Outfit] shadow-section border-2 border-black",
        variant === "dark" ? "bg-black text-white" : "bg-white"
      )}
    >
      <div className="flex justify-between">
        <div className="md:max-w-[300px]">
          <h3 className="text-3xl font-medium">{title}</h3>
        </div>
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="absolute md:bottom-10 bottom-3">
        <a href={linkTo} className="hover:underline">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default CardServices;
