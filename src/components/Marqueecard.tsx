import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

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

const ReviewCard = ({img}: {img: string }) => {
  return (
    <figure
      className={cn(
        "relative w-28 md:w-36 cursor-pointer overflow-hidden rounded-xl p-4",
      )}
    >
     <img className="w-full h-full object-cover rounded-full" alt="" src={img} />
    </figure>
  );
};

export function MarqueeCard() {
    return (
      <div className="relative flex h-full py-4 w-full flex-col items-center justify-center overflow-hidden bg-bg2 md:shadow-xl">
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
      {/*   <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black dark:from-background"></div> */}
      </div>
    );
  }
