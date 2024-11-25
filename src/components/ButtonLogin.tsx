import React from "react";
import { Button } from "@mantine/core";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { auth } from "@/src/auth";

export default async function ButtonLogin() {
  const session = await auth();
  if (!session?.user) return null;
  return (
    <>
      {session ? (
        <>
          <Image
            src={session.user?.image ?? ""}
            alt={session.user?.name ?? ""}
          />
          <Button
            onClick={async () => {
              "use server";
              await signOut();
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          onClick={async () => {
            "use server";
            await signIn("google");
          }}
        >
          Login
        </Button>
      )}
    </>
  );
}
