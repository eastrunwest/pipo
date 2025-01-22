import { auth } from "@/auth";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/db";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    return <div className="">
      {
        <form action={async () => {
          'use server';
          await signIn('google');
        }}>
          <button
            className="border px-4 py-2 bg-ig-red text-white rounded-lg"
            type="submit">Login with google
          </button>
        </form>
      }
    </div>;
  }

  const profile = await prisma.profile
    .findFirst({ where: { email: session?.user?.email as string } });
  if (!profile) {
    return redirect('/settings');
  }
  return (
    <ProfilePageContent
      ourFollow={null}
      profile={profile}
      isOurProfile={true} />
  );
}