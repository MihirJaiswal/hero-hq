"use client";

import Image from "next/image";
import { Tabsmob } from "../ui/tabsmob";

export function TabMob() {
  const tabs = [
    {
      title: "Batman",
      value: "batman",
      content: (
        <div className="w-full overflow-hidden flex justify-center items-center relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-900 to-red-800 border">
          <Image
            src="/hero/batman.jpg"
            alt=""
            width="1000"
            height="1000"
            className="object-cover h-48 w-auto"
          />
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Spiderman",
      value: "Spiderman",
      content: (
        <div className="w-full overflow-hidden relative flex items-center justify-center h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-700 to-red-700">
          <Image
            src="/hero/spidermanvsvenom.jpg"
            alt=""
            width="1000"
            height="1000"
            className="object-cover  h-48 w-auto"
          />
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Flash",
      value: "Flash",
      content: (
        <div className="w-full overflow-hidden flex items-center justify-center relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-yellow-600">
          <Image
            src="/hero/flash.jpg"
            alt=""
            width="1000"
            height="1000"
            className="object-cover  h-48 w-auto"
          />
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Joker",
      value: "Joker",
      content: (
        <div className="w-full overflow-hidden flex items-center justify-center relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-violet-900">
          <Image
            src="/hero/joker.jpg"
            alt=""
            width="1000"
            height="1000"
            className="object-cover  h-48 w-auto"
          />
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Thor",
      value: "thor",
      content: (
        <div className="w-full overflow-hidden relative flex items-center justify-center h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-violet-900">
          <Image
            src="/hero/thor.jpg"
            alt=""
            width="1000"
            height="1000"
            className="object-cover  h-48 w-auto"
          />
          <DummyContent />
        </div>
      ),
    },
  ];
  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-20 mb-32">
      <Tabsmob tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <></>
  );
};
