import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import HeroImage from "@/assets/images/hero-image.png";

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <section className="md:pt-20 pt-2 flex flex-wrap-reverse gap-7 md:justify-between justify-center items-center">
        <div className="max-w-[504px] md:text-left text-center">
          <h1 className="text-5xl/snug font-bold">
            Build Your Winning Curriculum Vitae Today
          </h1>
          <p className="mt-4 font-[400] text-xl font-[Outfit]">
            Easily analyze your CV to see what works and what doesn't, get a
            personalized score along with detailed suggestions for improvement,
            and create a professional resume!
          </p>

          <div className="mt-4">
            <Button variant="dark" size="lg" onClick={() => navigate("/analyze-resume")}>
              Analyze a Resume
            </Button>
          </div>
        </div>

        <img src={HeroImage} alt="Hero Image" loading="lazy" className="md:max-w-full max-w-[70%]" />
      </section>
    </MainLayout>
  );
};

export default LandingPage;
