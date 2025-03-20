import { CardServicesProps } from "@/types/container";
import clsx from "clsx";
import ArrowIcon from "@/assets/svg/ArrowIcon";
import { Link } from "react-router";

const CardServices = ({ image, linkTo, title, variant }: CardServicesProps) => {
  return (
    <div
      className={clsx(
        "relative lg:p-[50px] p-4 md:rounded-3xl rounded-xl font-[Outfit] shadow-section border-2 border-black group cursor-pointer h-[181px] lg:h-[300px]",
        variant === "dark" ? "bg-black text-white" : "bg-white"
      )}
    >
      <div className="flex justify-between">
        <div className="md:max-w-[300px]">
          <h3 className="lg:text-3xl text-xl font-medium">{title}</h3>
        </div>
        <img src={image} alt={title} loading="lazy" className="max-w-32" />
      </div>
      <div className="absolute md:bottom-10 bottom-3">
        <Link to={linkTo} className="flex items-center gap-2 lg:text-xl text-lg group-hover:underline">
          {variant === "dark" ? <ArrowIcon fill="white" /> : <ArrowIcon fill="black" />}
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default CardServices;
