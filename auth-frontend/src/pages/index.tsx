import { NextPageContext } from "next";
import { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react"
import { getSession } from "next-auth/react";

export default function Home(props: {session: Session}) {

  const ContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  const {data: session } = useSession();

  if(session){
    console.log(session);
  }
  
  const visible: boolean = session ? true: false;

  return (
    <>
      <div style={ContainerStyle}>
      <h1 className="text-red-400 text-2xl bg-yellow-300">
        Welcome {session? session.user?.name : "to the course"}
      </h1>
      </div>
      <div style={ContainerStyle}>
        <img 
          src={session?.user?.image ? session?.user?.image : ""} 
          className="rounded-full h-32"
          style={{ visibility: visible? "visible" : "hidden" }}/>
      </div>
      <div style={ContainerStyle}>
        <h2 style={{ visibility: visible? "visible" : "hidden" }}>Logged in using {session?.user.provider}</h2>
      </div>
      <div style={ContainerStyle}>
        <button onClick={() => signOut()} style={{ visibility: visible? "visible" : "hidden" }}>Sign out</button>
      </div>
      <div style={ContainerStyle}>
        <button onClick={() => signIn()}style={{ visibility: !visible ? "visible" : "hidden" }}>Sign in</button>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx:NextPageContext) {
  const session = await getSession(ctx);
  //console.log(session);
  return {
    props: {
      session,
    },
  }
}