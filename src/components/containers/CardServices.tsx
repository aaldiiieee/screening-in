import { CardServicesProps } from "@/types/container";
import clsx from "clsx";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { Link } from "react-router";

const CardServices = ({ image, linkTo, title, variant }: CardServicesProps) => {
  return (
    <div
      className={clsx(
        "relative md:p-[50px] p-4 md:rounded-3xl rounded-xl font-[Outfit] shadow-section border-2 border-black group cursor-pointer",
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
        <Link to={linkTo} className="flex items-center gap-2 text-xl group-hover:underline">
          {variant === "dark" ? <ArrowIcon fill="white" /> : <ArrowIcon fill="black" />}
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default CardServices;
