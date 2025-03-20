export interface HeaderContentProps {
  title: string;
  desc: string;
  flexDirection?: "row" | "column";
  align: "left" | "center";
}

export interface CardServicesProps {
  title: string;
  image: string;
  linkTo: string;
  variant: "dark" | "light";
}