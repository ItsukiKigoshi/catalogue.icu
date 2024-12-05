"use client";
import { AppShell, em } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import Timetable from "@/src/components/templates/Timetable";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { Course, Term } from "@/src/types/Types";
import Header from "@/src/components/organisms/Header";

export default function Page() {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(false);

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  // This "weekdays" handler can be refactored by using useToggle hook
  const [weekdays, setWeekdays] = useLocalStorage<string[]>("weekdays", [
    "M",
    "TU",
    "W",
    "TH",
    "F",
  ]);
  const toggleSaturday = () => {
    const updatedWeekdays =
      weekdays.length === 5
        ? ["M", "TU", "W", "TH", "F", "SA"]
        : ["M", "TU", "W", "TH", "F"];
    setWeekdays(updatedWeekdays);
  };

  const terms: { group: string; items: Term[] }[] = [
    {
      group: "All",
      items: [{ label: "All", ay: "All", season: "All", value: "All" }],
    },
    {
      group: "2023",
      items: [
        { label: "2023All", ay: "2023", season: "All", value: "2023All" },
        { label: "2023S", ay: "2023", season: "Spring", value: "2023Spring" },
        { label: "2023A", ay: "2023", season: "Autumn", value: "2023Autumn" },
        { label: "2023W", ay: "2023", season: "Winter", value: "2023Winter" },
      ],
    },
    {
      group: "2024",
      items: [
        { label: "2024All", ay: "2024", season: "All", value: "2024All" },
        { label: "2024S", ay: "2024", season: "Spring", value: "2024Spring" },
        { label: "2024A", ay: "2024", season: "Autumn", value: "2024Autumn" },
        { label: "2024W", ay: "2024", season: "Winter", value: "2024Winter" },
      ],
    },
    {
      group: "2025",
      items: [
        { label: "2025All", ay: "2025", season: "All", value: "2025All" },
        { label: "2025S", ay: "2025", season: "Spring", value: "2025Spring" },
        { label: "2025A", ay: "2025", season: "Autumn", value: "2025Autumn" },
        { label: "2025W", ay: "2025", season: "Winter", value: "2025Winter" },
      ],
    },
    {
      group: "2026",
      items: [
        { label: "2026All", ay: "2026", season: "All", value: "2026All" },
        { label: "2026S", ay: "2026", season: "Spring", value: "2026Spring" },
        { label: "2026A", ay: "2026", season: "Autumn", value: "2026Autumn" },
        { label: "2026W", ay: "2026", season: "Winter", value: "2026Winter" },
      ],
    },
  ];
  const [selectedTermValue, setSelectedTermValue] = useState("2024Autumn");
  const selectedTerm: Term | undefined = terms
    .map((term) => term.items)
    .flat()
    .find((term) => term.value === selectedTermValue);

  const [language, setLanguage] = useLocalStorage<string>("language", "E");

  const [
    modalSettingOpened,
    { open: modalSettingOpen, close: modalSettingClose },
  ] = useDisclosure(false);

  // Get the list of courses from the local storage
  const [courses, setCourses] = useLocalStorage<Course[]>("courses", [
    {
      regno: 99997,
      season: "Spring",
      ay: 2024,
      no: "CS101",
      lang: "E",
      e: "Example Spring Course",
      j: "科目例",
      schedule: ["3/M", "3/W", "3/F"],
      instructor: "John Doe",
      unit: 3,
      room: "H-000",
      color: "#e64980",
      isEnrolled: true,
      note: "",
      modified: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
    },
    {
      regno: 99998,
      season: "Autumn",
      ay: 2024,
      no: "CS101",
      lang: "E",
      e: "Example Autumn Course",
      j: "科目例",
      schedule: ["3/M", "3/W", "3/F"],
      instructor: "John Doe",
      unit: 3,
      room: "H-000",
      color: "#fd7e14",
      isEnrolled: true,
      note: "",
      modified: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
    },
    {
      regno: 99999,
      season: "Winter",
      ay: 2024,
      no: "CS101",
      lang: "E",
      e: "Example Winter Course",
      j: "科目例",
      schedule: ["3/M", "3/W", "3/F"],
      instructor: "John Doe",
      unit: 3,
      room: "H-000",
      color: "#40c057",
      isEnrolled: true,
      note: "",
      modified: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
    },
  ]);

  const timetable: { [key: string]: Course[] } = {};
  const coursesInSelectedTerm = courses.filter(
    (course) =>
      (selectedTerm?.season === "All" ||
        course.season === selectedTerm?.season) &&
      (selectedTerm?.ay === "All" || course.ay.toString() === selectedTerm?.ay),
  );

  const enrolledCoursesInSelectedTerm = coursesInSelectedTerm.filter(
    (course) => course.isEnrolled,
  );

  enrolledCoursesInSelectedTerm.forEach((course) => {
    course.schedule?.forEach((entry) => {
      const [time, day] = entry.split("/");
      if (!timetable[`${time}/${day}`]) {
        timetable[`${time}/${day}`] = [];
      }
      timetable[`${time}/${day}`].push(course);
    });
  });

  // Toggle the isEnrolled property of a certain course
  const toggleIsEnrolled = (regno: number) => {
    setCourses(
      courses.map((course: Course) => {
        if (course.regno === regno) {
          return { ...course, isEnrolled: !course.isEnrolled };
        } else {
          return course;
        }
      }),
    );
  };

  // Add a course to the list "courses"
  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const addCourseAndMoveToTheTerm = (course: Course) => {
    addCourse(course);
    notifications.show({
      title: `Success!`,
      message: `${course.no} (${course.ay} ${course.season}) has been added!`,
      autoClose: 5000,
    });
    setSelectedTermValue(`${course.ay}${course.season}`);
  };

  // Update a certain course in the list "courses"
  // If the course is not in the list, add it
  const updateCourse = (course: Course) => {
    const courseIndex = courses.findIndex(
      (c: Course) => c.regno === course.regno,
    );
    if (courseIndex !== -1) {
      setCourses(
        courses.map((c: Course, index: number) =>
          index === courseIndex ? course : c,
        ),
      );
    } else {
      addCourse(course);
    }
  };

  // Delete a certain course from the list "courses"
  const deleteCourse = (regno: number) => {
    setCourses(courses.filter((course: Course) => course.regno !== regno));
  };

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
      </AppShell.Main>
    </AppShell>
  );
}
