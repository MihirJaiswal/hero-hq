export default function ClientSection() {
    return (
      <section
        id="clients"
        className="text-center mx-auto px-6 md:px-8 bg-bg1 h-64"
      >
        <div className="py-14">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <h2 className="text-center text-sm font-semibold text-gray-400 mb-4">
              INCLUDES DATA OF SUPERHEROES OF DIFFERENT FRANCHISE
            </h2>
            <div className="mt-6">
              <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-white">
                <li>
                  <img
                    src='/marvel.png'
                    className="h-auto w-24 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
                <li>
                  <img
                    src='/DC.png'
                    className="h-auto w-24 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
                <li>
                  <img
                    src='/disney.png'
                    className="h-auto w-24 bg-white p-2 dark:brightness-0 dark:invert"
                  />
                </li>
  
                <li>
                  <img
                    src='/bandai.svg'
                    className="h-auto w-24 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
                <li>
                  <img
                    src='/warnerbros.svg'
                    className="h-auto w-24 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }