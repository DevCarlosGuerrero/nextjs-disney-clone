import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import Image from "next/image";

const signin = ({ providers }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Image
        src="/images/logo.svg"
        width={150}
        height={150}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      <h2 className="mb-2.5">Log in using a provider</h2>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button
              className="bg-blue-600 text-l tracking-wide py-2 px-3 rounded hover:bg-[#0486ee]"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context),
    },
  };
}
