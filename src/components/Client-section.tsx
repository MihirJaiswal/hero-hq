import Image from "next/image";

export default function ClientSection() {
    return (
      <section
        id="clients"
        className="text-center mx-auto px-6 md:px-8 bg-bg2 h-full md:h-64"
      >
        <div className="py-14">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <h2 className="text-center text-sm font-semibold text-gray-400 mb-4">
              INCLUDES DATA OF SUPERHEROES OF DIFFERENT FRANCHISE
            </h2>
            <div className="mt-6">
              <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-white">
                <li>
                  <Image
                    src='/marvel.png'
                    alt="marvel"
                    height={100}
                    width={100}
                    loading="lazy"
                    className="h-auto md:w-24 w-16 md:px-2"
                  />
                </li>
                <li>
                <Image
                    src='/DC.png'
                    alt="marvel"
                    height={100}
                    width={100}
                    loading="lazy"
                    className="h-auto md:w-24 w-16 md:px-2"
                  />
                </li>
                <li>
                <Image
                    src='/disney.png'
                    alt="DC"
                    height={100}
                    width={100}
                    loading="lazy"
                    className="h-auto md:w-24 w-16 md:p-4 p-2 bg-white"
                  />
                </li>
  
                <li>
                <Image
                    src='/bandai.svg'
                    alt="Bandai Namco"
                    height={100}
                    width={100}
                    loading="lazy"
                    className="h-auto w-24 px-2 hidden md:block"
                  />
                </li>
                <li>
                <Image
                    src='/warnerbros.svg'
                    alt="warnerbros"
                    height={100}
                    width={100}
                    loading="lazy"
                    className="h-auto w-24 px-2 hidden md:block"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }