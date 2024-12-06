import React, { useEffect, useState } from "react";
import supabase from "@/src/utils/supabase";
import { Database } from "@/src/types/supabase";
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { IconExternalLink } from "@tabler/icons-react";
import { seasonToNumber } from "@/src/utils/helpers"; // TODO - Set the number of courses shown in a page (e.g. 10 for now) programmable (like change to 10, 20, 50).

// TODO - Set the number of courses shown in a page (e.g. 10 for now) programmable (like change to 10, 20, 50).

export default function Search() {
  const [courses, setCourses] =
    useState<Database["public"]["Tables"]["courses"]["Row"][]>();
  const [totalCourses, setTotalCourses] = useState<number>(0);

  const [activePage, setPage] = useState(1);
  const CourseCards = courses?.map((course) => (
    <Card key={course.rgno} shadow="sm" padding="lg" radius="md" withBorder>
      <Stack h="100%" gap="sm">
        <Text size="xs" c="dimmed">
          {course.ay} {course.season} |{" "}
          {/*TODO - Fix Type Errors Here (by defining types of "schedule"?)*/}
          {course.schedule?.map((item, index) => (
            <React.Fragment key={index}>
              {item.flag ? "*" : ""}
              {item.time}/{item.day}
              {index !== course.schedule?.length - 1 ? "," : ""}
            </React.Fragment>
          ))}{" "}
          ({course.unit})
        </Text>
        <Group>
          <Text size="sm" lh={1}>
            {course.course_no} {course.title_e}
          </Text>
          {course.lang ? <Badge>{course.lang}</Badge> : null}
          <ActionIcon
            data-autofocus
            component="a"
            href={`https://campus.icu.ac.jp/public/ehandbook/PreviewSyllabus.aspx?regno=${
              course.rgno
            }&year=${course.ay}&term=${seasonToNumber(course.season)}`}
            target="_blank"
          >
            <IconExternalLink />
          </ActionIcon>
        </Group>
        <Text size="xs" c="dimmed">
          {course.instructor}
        </Text>
      </Stack>
    </Card>
  ));

  useEffect(() => {
    (async () => {
      try {
        const { count, error } = await supabase
          .from("courses")
          .select("*", { count: "exact", head: true });
        if (error) {
          console.error("Error fetching total courses:", error);
        } else {
          setTotalCourses(count || 0);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data: courses, error } = await supabase
          .from("courses")
          .select("*")
          .range((activePage - 1) * 10, activePage * 10 - 1);
        if (error) {
          console.error("Error fetching courses:", error);
        } else {
          setCourses(courses);
          console.log(courses);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    })();
  }, [activePage]);

  useHotkeys([
    [
      "ArrowLeft",
      () => {
        if (activePage > 1) {
          setPage(activePage - 1);
        }
      },
    ],
    [
      "ArrowRight",
      () => {
        const totalPages = Math.ceil(totalCourses / 10);
        if (activePage < totalPages) {
          setPage(activePage + 1);
        }
      },
    ],
  ]);

  return (
    <Stack>
      <SimpleGrid cols={2}>{CourseCards}</SimpleGrid>
      <Pagination
        total={Math.ceil(totalCourses / 10)}
        value={activePage}
        onChange={setPage}
      />{" "}
    </Stack>
  );
}
