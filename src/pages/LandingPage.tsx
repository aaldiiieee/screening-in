import { useNavigate } from "react-router";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";

import HeaderContent from "@/components/containers/HeaderContent";
import CardServices from "@/components/containers/CardServices";
import CardSliderReviews from "@/components/containers/CardSliderReviews";
import CardLetsConnect from "@/components/containers/CardLetsConnect";

import HeroImage from "@/assets/images/hero-image.png";
import NotesImage from "@/assets/images/notes.png";
import CoderImage from "@/assets/images/coder.png";
import NewsLetterImage from "@/assets/images/newsletter.png";
import ChatbotImage from "@/assets/images/chatbot.png";
import WorkImage from "@/assets/images/work.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Card 1", content: "Content for card 1." },
    { title: "Card 2", content: "Content for card 2." },
    { title: "Card 3", content: "Content for card 3." },
    { title: "Card 4", content: "Content for card 4." },
    { title: "Card 5", content: "Content for card 5." },
  ];
  

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
            <Button
              variant="dark"
              size="lg"
              onClick={() => navigate("/analyze-resume")}
            >
              Analyze a Resume
            </Button>
          </div>
        </div>

        <img
          src={HeroImage}
          alt="Hero Image"
          loading="lazy"
          className="md:max-w-full max-w-[70%]"
        />
      </section>

      <section className="mt-28 flex md:flex-row-reverse flex-col md:gap-[92px] gap-4 md:justify-between justify-center items-center">
        <HeaderContent
          title="Who we are & Why we Exist"
          desc="
            At Screening-in, we believe that a great CV is the key to unlocking your dream career. However, many job seekers—from fresh graduates to professionals—still struggle to create an effective CV that meets recruiters’ standards.
            We are here to help you understand what makes your resume attractive to recruiters. Using automated analysis technology, we provide scores, personalized feedback, and improvement recommendations to make your resume more competitive."
          flexDirection="column"
          align="left"
        />

        <img
          src={WorkImage}
          alt="Hero Image"
          loading="lazy"
          className="md:max-w-full max-w-[70%]"
        />
      </section>

      <section className="mt-28">
        <HeaderContent
          title="Services"
          desc="At Screening-in, we help job seekers create outstanding resumes that stand out in today's competitive job market. Our services include:"
          flexDirection="row"
          align="center"
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-10">
          <CardServices
            image={NotesImage}
            title="Reinforce Resume with One-Click"
            variant="light"
            linkTo="#"
          />
          <CardServices
            image={CoderImage}
            title="Fit your Resume to your Dream Job"
            linkTo="#"
            variant="dark"
          />
          <CardServices
            image={NewsLetterImage}
            title="Online Job Application Simulation"
            linkTo="#"
            variant="dark"
          />
          <CardServices
            image={ChatbotImage}
            title="AI-Powered Cover Letter Generator"
            linkTo="#"
            variant="light"
          />
        </div>
      </section>

      <section className="mt-28">
        <HeaderContent
          title="Reviews"
          desc="See how Screening.in helps job seekers land their dream interviews and jobs."
          flexDirection="column"
          align="center"
        />

        <CardSliderReviews cards={cards} speed={30} />
      </section>

      <section className="mt-28">
        <CardLetsConnect />
      </section>
    </MainLayout>
  );
};

export default LandingPage;
