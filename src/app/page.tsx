"use client";
import Search from "@/src/components/templates/Search";
import Timetable from "@/src/components/templates/Timetable";
import React from "react";
import Header from "@/src/components/organisms/Header";

export default function Page() {
  const weekdays = ["M", "TU", "W", "TH", "F", "SA"];

  return (
    <div>
      <Header />
      <Timetable />
      <Search />
    </div>
  );
}
