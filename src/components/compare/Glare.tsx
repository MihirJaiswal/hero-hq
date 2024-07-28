import { GlareCard } from "../ui/glare-card";
import Image from 'next/image';

export function GlareCardDemo() {
  return (
    <GlareCard className="flex flex-col items-center justify-center">
      <Image src="/add1.png" alt="Add Hero" className="w-24 filter brightness-95" width={96} height={96} loading="lazy" />
      <p className="text-white font-bold text-xl mt-4">Add Hero</p>
    </GlareCard>
  );
}
