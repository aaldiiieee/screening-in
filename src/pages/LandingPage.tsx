import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import HeroImage from "@/assets/images/hero-image.png";

const LandingPage = () => {
  return (
    <MainLayout>
      <section className="pt-20 flex justify-between items-center">
        <div className="max-w-[504px]">
          <h1 className="text-5xl/snug font-bold">
            Build Your Winning Curriculum Vitae Today
          </h1>
          <p className="mt-4 font-[400] text-xl font-[Outfit]">
            Easily analyze your CV to see what works and what doesn't, get a
            personalized score along with detailed suggestions for improvement,
            and create a professional resume!
          </p>

          <div className="mt-4">
            <Button variant="dark" size="lg">
              Analyze a Resume
            </Button>
          </div>
        </div>

        <img src={HeroImage} alt="Hero Image" loading="lazy" />
      </section>
    </MainLayout>
  );
};

export default LandingPage;
