import React from "react";
import { Avatar, Button, Group } from "@mantine/core";
import { auth, signIn, signOut } from "@/src/auth";

export default async function ButtonLogin() {
  const session = await auth();
  return (
    <div>
      {session ? (
        <Group>
          <Avatar
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
        </Group>
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
    </div>
  );
}
