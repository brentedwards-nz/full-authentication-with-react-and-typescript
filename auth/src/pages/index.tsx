import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Image from 'next/image';
import Head from 'next/head'
import { DefaultSession } from "next-auth";

const Home = () => {
  const { data: session, status } = useSession();

  console.log("----- Session Begin -----")
  console.log(session)
  console.log("-----  Session End  -----\n")

  var userAvatar;
  var logoutButton;
  var loginButton;
  var titleText
  var statusText
  if(session)
  {
    userAvatar = <Image
      src={session?.user?.image || ""}
      width="100"
      height="100"
      alt={`${session?.user?.name} image`}
      className="w-32 h-32 rounded-full"
    />;

    logoutButton=
      <button 
        className="bg-blue-500
        hover:bg-blue-700
        text-md 
        uppercase
        font-bold
        px-8
        py-2
        rounded-md
        sm:mr-2
        md-1
        ease-linear
        transition-all
        duration-150
        "
        onClick={() => signOut()}
      >
        Sign Out
        </button>;
    titleText="Authentication - " + session?.user?.name;
    statusText=<span>You logged in using&nbsp;<span className="capitalize">{session?.user?.provider}</span></span>
  }
  else
  {
    loginButton=<button 
      className="bg-blue-500
      hover:bg-blue-700
      text-md 
      uppercase
      font-bold
      px-8
      py-2
      rounded-md
      sm:mr-2
      md-1
      ease-linear
      transition-all
      duration-150
      "
      onClick={() => signIn()}>Sign In</button>;
    titleText="Authentication"
  }
  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="mx-auto">
          <div className="border border-white relative flex flex-col w-full rounded-lg">
            <div className="flex flex-wrap justify-center items-center">
            <div className="text-center mt-4">
                <h2 className="text-4x1 font-semibold mb-2 capitalize">
                  {status}
                </h2>
              </div>
              
              <div className="w-full flex justify-center">
                {userAvatar}
              </div>
              <div className="text-center mt-2">
                <h3 className="text-4x1 font-semibold mb-2">
                  {session?.user?.name}
                </h3>
                <div className="text-sm mb-2 font-bold">
                  {session?.user?.email}
                </div>
                <div className="mb-2 mt-10">
                  {session ? statusText : ""}
                </div>
                <div className="w-full text-center">
                  <div className="py-6 px-3">
                    {logoutButton}
                    {loginButton}
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}