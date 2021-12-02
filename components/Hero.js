import Head from "next/head";
import Image from "next/image";

const Hero = () => {
  return (
    <section>
      <Head>
        <title>Log in | Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-[calc(100vh-72px)]">
        <Image
          src="/images/hero-background.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center max-w-screen-sm mx-auto p-8 -mt-16">
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            objectFit="contain"
          />
          <div className="py-5">
            <button className="bg-blue-600 uppercase text-xl tracking-wide py-4 px-6 w-full rounded hover:bg-[#0486ee]">
              Get the Disney Bundle
            </button>
            <p className="text-xs text-center mt-2.5">
              Stream now. <span className="underline">Terms Apply</span>
            </p>
          </div>
          <Image
            src="/images/cta-logo-two.png"
            width="600"
            height="70"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
