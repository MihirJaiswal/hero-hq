import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";

const reviews = [
  { img: "/icons/antman.png" },
  { img: "/icons/avengers.png" },
  { img: "/icons/blackpanther.png" },
  { img: "/icons/blackwidow.png" },
  { img: "/icons/captainamerica.png" },
  { img: "/icons/daredevil.png" },
  { img: "/icons/greenlantern.png" },
  { img: "/icons/hulk.png" },
  { img: "/icons/hydra.png" },
  { img: "/icons/ironman.png" },
  { img: "/icons/hawkeye.png" },
  { img: "/icons/loki.png" },
  { img: "/icons/robin.png" },
  { img: "/icons/scarletwitch.png" },
  { img: "/icons/thepunisher.png" },
  { img: "/icons/shield.png" },
  { img: "/icons/superman1.png" },
  { img: "/icons/flash.png" },
  { img: "/icons/batman.png" },
  { img: "/icons/spiderman.png" },
  { img: "/icons/drstrange.png" },
  { img: "/icons/deadpool.png" },
  { img: "/icons/thefantasticfour.png" },
  { img: "/icons/justiceleague.png" },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative w-28 md:w-36 cursor-pointer overflow-hidden rounded-xl p-4",
      )}
    >
      <Image 
      src={img}
      alt="" 
      width={150}
      height={150}
      quality={100}
      loading="lazy"
      className="w-full h-full object-cover rounded-full filter brightness-95" 
      />
    </figure>
  );
};

export function MarqueeCard() {
  return (
    <div className="relative h-[60vh] flex py-1 w-full flex-col items-center justify-center overflow-hidden md:shadow-xl bg-bg7">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[109vh] overflow-hidden">
        <div className="absolute inset-x-0 -bottom-96 h-full bg-[#08090D] opacity-80 rounded-t-full"></div>
      </div>
      
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} img={review.img} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} img={review.img} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#08090d] dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#08090d] dark:from-background"></div>
    </div>
  );
}
