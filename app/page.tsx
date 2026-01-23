import Link from 'next/link';
import AuthForm from '@/components/AuthForm/AuthForm';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main>
      <section className="py-5 md:py-8 bg-(--black)">
        <div className="container px-5 py-5 md:px-8">
          <div className="flex flex-col xxl:flex-row gap-2.5 xxl:gap-4 overflow-hidden">
            {/* Left side */}
            <div
              className={cn(
                'bg-(--dark-grey) rounded-[30px]',
                'max-md:min-w-full max-[1439px]:min-w-176 xxl:min-w-150',
                'min-h-103 xxl:min-h-184',
                'py-5 md:py-10 px-5 md:px-16',
                'flex flex-col justify-start items-start gap-4 md:gap-6 xxl:gap-10'
              )}
            >
              {/* Mobile */}
              <Link href="/">
                <svg className="mb-6 block md:hidden" width="42" height="17">
                  <use
                    href="/icons.svg#icon-logo_mob"
                    fill="#F9F9F9"
                    stroke="#141414"
                  />
                </svg>
              </Link>

              {/* Tablet+ */}
              <Link href="/">
                <svg
                  className="max-[1439px]:mb-32 xxl:mb-17 hidden md:block"
                  width="182"
                  height="17"
                >
                  <use
                    href={'/icons.svg#icon-logo'}
                    fill="#F9F9F9"
                    stroke="#141414"
                  />
                </svg>
              </Link>
              <h1
                className={cn(
                  'max-w-111',
                  'font-bold text-[32px] md:text-[64px] leading-[115%] tracking-[-0.03em] text-foreground',
                  'max-md:mb-1 max-[1439px]:mb-4 xxl:mb-4'
                )}
              >
                Expand your mind, reading{' '}
                <span className="text-(--grey1)">a book</span>
              </h1>
              <AuthForm type="register"></AuthForm>
            </div>

            {/* Right side */}
            <div
              className={cn(
                'block max-md:block max-[1439px]:hidden xxl:block',
                'bg-(--dark-grey) rounded-[30px]',
                'min-w-full xxl:min-w-150',
                'min-h-88 xxl:min-h-184',
                'pt-5 px-10 xxl:pt-25 xxl:px-25'
              )}
            >
              {/* padding-container */}
              <div className="relative h-full">
                {/* image-container without padding */}
                <div className="absolute inset-0">
                  <picture>
                    {/* Desktop */}
                    <source
                      srcSet="
                            /img/iphone@1x.webp 1x,
                            /img/iphone@2x.webp 2x"
                      media="(min-width: 1440px)"
                    />

                    {/* Mobile */}
                    <source
                      srcSet="
                          /img/iphone-m@1x.webp 1x,
                          /img/iphone-m@2x.webp 2x"
                      media="(max-width: 767px)"
                    />

                    <img
                      src="/img/iphone@1x.webp"
                      alt="Expand your mind, reading"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
