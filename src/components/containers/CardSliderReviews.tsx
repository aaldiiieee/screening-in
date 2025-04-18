import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardSliderReviewsProps = {
  cards: { title: string; content: string }[];
  speed?: number;
};

const CardSliderReviews: React.FC<CardSliderReviewsProps> = ({
  cards,
  speed = 50,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const scroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Pindahkan scroll secara horizontal
    slider.scrollLeft += 1;

    // Reset scroll jika mencapai akhir
    if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
      slider.scrollLeft = 0;
    }

    animationFrameRef.current = requestAnimationFrame(scroll);
  };

  const startScroll = () => {
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(scroll);
    }
  };

  const stopScroll = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  useEffect(() => {
    startScroll();
    return () => stopScroll();
  }, [speed]);

  return (
    <div className="relative w-full h-64 mt-5">
      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div
        ref={sliderRef}
        className="relative overflow-hidden w-full h-full whitespace-nowrap flex"
        onMouseEnter={stopScroll}
        onMouseLeave={startScroll}
      >
        {cards.map((card, index) => (
          <div key={index} className="md:w-1/3 w-full flex-shrink-0 px-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{card.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSliderReviews;
