import { auth, signIn, signOut } from 'auth';
import Image from 'next/image';

function SignIn({ provider, ...props }: any) {
  return (
    <form 
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  )
}

function SignOut(props: any) {
  return (
    <form 
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button {...props}>Sign Out</button>
    </form>
  )
}

export default async function Header() {
  const session = await auth();
  
  return (
    <div className="header">
      {
        session?.user ?
          <>
            <Image src={session.user?.image as string} alt="" width={40} height={40} style={{ borderRadius: '100%' }}/>
            <span>{session.user?.name}</span>
            <SignOut />
          </>
          : <SignIn />
      }
    </div>
  )
}