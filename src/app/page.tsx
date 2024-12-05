"use client";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Timetable from "@/src/components/templates/Timetable";
import Header from "@/src/components/organisms/Header";
import Search from "@/src/components/templates/Search";

export default function Page() {
  const [navbarOpened] = useDisclosure(false);

  const weekdays = ["M", "TU", "W", "TH", "F", "SA"];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: "400px",
        breakpoint: "sm",
        collapsed: { mobile: !navbarOpened },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar></AppShell.Navbar>
      <AppShell.Main>
        <Timetable />
        <Search />
      </AppShell.Main>
    </AppShell>
  );
}
