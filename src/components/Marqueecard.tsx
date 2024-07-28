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
      className="w-full h-full object-cover rounded-full filter brightness-75" 
      />
    </figure>
  );
};

export function MarqueeCard() {
  return (
    <div className="relative flex h-full py-12 w-full flex-col items-center justify-center overflow-hidden md:shadow-xl bg-bg2">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[109vh] overflow-hidden">
        <div className="absolute inset-x-0 -bottom-96 h-full bg-bg4 opacity-80 rounded-t-full"></div>
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
    </div>
  );
}
