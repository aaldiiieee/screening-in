import CardContactUs from "@/assets/images/contact-us.png";
import { Button } from "@/components/ui/button";

const CardLetsConnect = () => {
  return (
    <div className="flex lg:justify-between lg:flex-row flex-col justify-center lg:py-[82px] lg:px-[70px] p-8 lg:text-left text-center gap-8 bg-[#1D1D1D] rounded-lg shadow-md">
      <div className="space-y-10">
        <h2 className="text-2xl font-bold text-[#AEF16A]">
          Let's Connect & Elevate Your Career!
        </h2>
        <p className="mt-2 text-lg text-white">
          Have questions or need assistance? Contact us today to learn how
          Screening-in can help you refine your CV, optimize your job
          applications, and boost your career prospects.
        </p>
        <Button variant="destructive" size="lg" className="font-[Space Mono] font-[400]">
          Get your CV Better
        </Button>
      </div>
      <img src={CardContactUs} alt="Contact Us" />
    </div>
  );
};

export default CardLetsConnect;
