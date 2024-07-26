import { GlareCard } from "./ui/glare-card";

export function GlareCardDemo() {
  return (
    <GlareCard className="flex flex-col items-center justify-center">
      <img src="/add.png" alt="" className="w-24" />
      <p className="text-white font-bold text-xl mt-4">Add Hero</p>
    </GlareCard>
  );
}
