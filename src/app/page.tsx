"use client";
import { ActionIcon, AppShell, Flex, Grid, NativeSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { Header } from "../components/Header";
import ModalSetting from "../components/ModalSetting";
import { CourseList } from "../components/CourseList";
import { Navbar } from "../components/Navbar";
import { Timetable } from "../components/Timetable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Course, Term } from "../type/Types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function Page() {
  const [navbarOpened] = useDisclosure(false);

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
      group: "2023",
      items: [
        { label: "2023S", ay: "2023", season: "Spring", value: "2023Spring" },
        { label: "2023A", ay: "2023", season: "Autumn", value: "2023Autumn" },
        { label: "2023W", ay: "2023", season: "Winter", value: "2023Winter" },
      ],
    },
    {
      group: "2024",
      items: [
        { label: "2024S", ay: "2024", season: "Spring", value: "2024Spring" },
        { label: "2024A", ay: "2024", season: "Autumn", value: "2024Autumn" },
        { label: "2024W", ay: "2024", season: "Winter", value: "2024Winter" },
      ],
    },
    {
      group: "2025",
      items: [
        { label: "2025S", ay: "2025", season: "Spring", value: "2025Spring" },
        { label: "2025A", ay: "2025", season: "Autumn", value: "2025Autumn" },
        { label: "2025W", ay: "2025", season: "Winter", value: "2025Winter" },
      ],
    },
    {
      group: "2026",
      items: [
        { label: "2026S", ay: "2026", season: "Spring", value: "2026Spring" },
        { label: "2026A", ay: "2026", season: "Autumn", value: "2026Autumn" },
        { label: "2026W", ay: "2026", season: "Winter", value: "2026Winter" },
      ],
    },
  ];
  const [selectedTermValue, setSelectedTermValue] = useState("2024Winter");
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
      course.season === selectedTerm?.season &&
      course.ay.toString() === selectedTerm?.ay
  );

  const enrolledCoursesInSelectedTerm = coursesInSelectedTerm.filter(
    (course) => course.isEnrolled
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
      })
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
      (c: Course) => c.regno === course.regno
    );
    if (courseIndex !== -1) {
      setCourses(
        courses.map((c: Course, index: number) =>
          index === courseIndex ? course : c
        )
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
        width: "150",
        breakpoint: "md",
        collapsed: { mobile: !navbarOpened },
      }}
    >
      <AppShell.Header>
        <Header
          weekdays={weekdays}
          toggleSaturday={() => {
            toggleSaturday();
          }}
          modalSettingOpen={modalSettingOpen}
        />
        <ModalSetting
          modalSettingOpened={modalSettingOpened}
          close={modalSettingClose}
          weekdays={weekdays}
          toggleSaturday={() => {
            toggleSaturday();
          }}
          languageController={{
            language,
            setLanguage,
          }}
          courses={courses}
          setCourses={setCourses}
        />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Grid p={"xs"} m={0}>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <ActionIcon
                variant="default"
                color="gray"
                aria-label="Previous Term"
              >
                <IconChevronLeft />
              </ActionIcon>
              <NativeSelect
                value={selectedTermValue}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedTermValue(event.currentTarget.value)
                }
                data={terms}
              />
              <ActionIcon variant="default" color="gray" aria-label="Next Term">
                <IconChevronRight />
              </ActionIcon>
            </Flex>
            <Timetable
              timetable={timetable}
              enrolledCourses={enrolledCoursesInSelectedTerm}
              courseController={{
                toggleIsEnrolled,
                updateCourse,
                deleteCourse,
              }}
              language={language}
              weekdays={weekdays}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <CourseList
              courses={coursesInSelectedTerm}
              courseController={{
                toggleIsEnrolled,
                addCourse: addCourseAndMoveToTheTerm,
                updateCourse,
                deleteCourse,
              }}
              language={language}
              selectedTerm={selectedTerm}
            />
          </Grid.Col>
        </Grid>
      </AppShell.Main>
      {/*<AppShell.Footer*/}
      {/*  withBorder={false}*/}
      {/*  h="60px"*/}
      {/*>*/}
      {/*</AppShell.Footer>*/}
    </AppShell>
  );
}
