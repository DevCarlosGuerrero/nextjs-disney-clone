import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";

// Components
import Image from "next/image";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

// External Imports
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player/lazy";
import { useRouter } from "next/router";

const Movie = ({ result }) => {
  const [session] = useSession();
  const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [showPlayer, setShowPlayer] = useState(false);
  const index = result.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{result.title || result.original_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              layout="fill"
              objectFit="cover"
            />
            <div className="bg-gradient-to-r from-black absolute inset-0 h-full w-full z-50" />
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {result.title || result.original_name}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button className="flex items-center justify-center py-1.5 px-12 rounded text-xs md:text-base bg-[#f9f9f9] text-black hover:bg-[#c6c6c6]">
                <img
                  src="/images/play-icon-black.svg"
                  alt="play button"
                  className="h-3 sm:h-6"
                />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>
              <button
                className="flex items-center justify-center py-1.5 px-12 rounded text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] hover:bg-[#c6c6c6] hover:text-black"
                onClick={() => setShowPlayer(true)}
              >
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>
              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <PlusIcon className="h-6" />
              </div>
              <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <img src="/images/group-icon.svg" alt="group" />
              </div>
            </div>

            <p className="text-xs md:text-sm">
              {result.release_date || result.first_air_date} ???{" "}
              {Math.floor(result.runtime / 60)}h {result.runtime % 60}m ???{" "}
              {result.genres.map((genre) => genre.name + " ")}{" "}
            </p>
            <p className="text-sm md:text-lg max-w-4xl">{result.overview}</p>
          </div>

          {/* Background Overlay */}
          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50" />
          )}

          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0f0f0f]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  return {
    props: {
      session,
      result: request,
    },
  };
}
