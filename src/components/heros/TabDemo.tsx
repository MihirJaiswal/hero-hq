"use client";
import Image from "next/image";
import { Tabs } from "../ui/tabs";

export function TabsDemo() {
  const tabs = [
    {
      title: "Batman",
      value: "batman",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-900 to-red-800 border border-gray-500">
          <Image
            src="/hero/batman.jpg"
            alt=""
            width="1000"
            height="1000"
            loading="lazy"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Spiderman",
      value: "Spiderman",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-gray-700 to-red-700 border border-gray-500">
          <Image
            src="/hero/spidermanvsvenom.jpg"
            alt=""
            width="1000"
            height="1000"
            loading="lazy"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Flash",
      value: "Flash",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-yellow-600 border border-gray-500">
          <Image
            src="/hero/flash.jpg"
            alt=""
            width="1000"
            height="1000"
            loading="lazy"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Joker",
      value: "Joker",
      content: (
        <div className="w-full overflow-hidden flex items-center justify-center relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-violet-900  border border-gray-500">
          <Image
            src="/hero/joker.jpg"
            alt=""
            width="1000"
            height="1000"
            loading="lazy"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
    {
      title: "Thor",
      value: "thor",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-violet-900 border border-gray-500">
          <Image
            src="/hero/thor.jpg"
            alt=""
            width="1000"
            height="1000"
            loading="lazy"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col px-20 mx-auto w-full  items-start justify-start pt-16 mb-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

