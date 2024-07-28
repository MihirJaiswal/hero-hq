"use client";
import Particles from '../ui/particles';
import React, { forwardRef, useRef } from "react";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BorderBeam } from '../ui/border-beam';

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]", // Adjusted size and padding
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function MainSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex flex-col h-full w-full items-center justify-center px-2 md:px-10 overflow-hidden md:shadow-xl bg-bg2"
      ref={containerRef}
    >
      <div className='hidden md:block'>
        <Image src="/space/moon.png" alt="" className='w-44 fixed top-20 right-0' width={176} height={176} loading='lazy' />
        <Image src="/space/saturn.png" alt="" className='w-24 absolute top-24 right-44 opacity-30' width={96} height={96} loading='lazy' />
      </div>
      
      <div className='fixed inset-0 bg-bg6 bg-contain bg-repeat-x bg-center opacity-60 pointer-events-none'></div>
      <div className='fixed inset-0 bg-black bg-contain bg-repeat-x bg-center opacity-30 pointer-events-none'></div>
      <Particles className="absolute inset-0" quantity={180} ease={80} color='#ffffff' refresh />
      <div className='absolute h-screen inset-0 bg-bg5 bg-cover opacity-60 bg-center pointer-events-none flex items-center justify-center'></div>
      
      <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10 -mt-14">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Icons.ironman />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.batman />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Icons.captainamerica />
          </Circle>
          <Circle ref={div4Ref} className="size-24">
            <Icons.HQ />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.superman />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Icons.spiderman />
          </Circle>
          <Circle ref={div7Ref}>
            <Icons.flash />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
      <div className='flex items-center justify-center absolute bottom-12 border border-gray-600 p-2'>
        <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-2xl md:text-4xl uppercase">
          Compare the Heroes
        </h2>
        <BorderBeam />
      </div>
    </div>
  );
}

const Icons = {
  captainamerica: () => (
    <div className="shining-border">
      <Image src="/icons/shield.png" alt="icon" className="rounded-full" width={100} height={100} loading='lazy' />
    </div>
  ),
  HQ: () => (
    <div className="shining-border">
      <Image src="/logo.png" alt="icon" className="rounded-full" width={100} height={100} loading='lazy' />
    </div>
  ),
  ironman: () => (
    <div className="shining-border">
      <Image src="/icons/deadpool.png" alt="icon" className="rounded-full" width={100} height={100} loading='lazy' />
    </div>
  ),
  spiderman: () => (
    <div className="shining-border">
      <Image src="/icons/wonderwoman.png" alt="icon" className="rounded-full" width={100} height={100} loading='lazy' />
    </div>
  ),
  batman: () => (
    <div className="shining-border">
      <Image src="/icons/drstrange.png" alt="icon" className="rounded-full" width={100} height={100} loading='lazy' />
    </div>
  ),
  superman: () => (
    <div className="shining-border">
      <Image src="/icons/thefantasticfour.png" alt="icon" className="rounded-full" width={100} height={100} loading='lazy' />
    </div>
  ),
  flash: () => (
    <div className="shining-border">
      <Image src="/icons/robin.png" alt="icon" className="rounded-full" width={100} height={100} loading='lazy' />
    </div>
  ),
};
