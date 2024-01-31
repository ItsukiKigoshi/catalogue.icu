import { Course } from "@/src/type/Types";
import { Accordion, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { IconExternalLink, IconX } from "@tabler/icons-react";

export default function ModalDetail(props: {
  courses: Course[];
  modalDetailOpened: boolean;
  close: () => void;
}) {
  const seasonToNumber = (season: string) => {
    switch (season) {
      case "Spring":
        return 1;
      case "Autumn":
        return 2;
      case "Winter":
        return 3;
      default:
        return 0;
    }
  };

  const CourseInfo: React.FC<{ course: Course }> = (props: {
    course: Course;
  }) => {
    return (
      <Stack>
        <Text>
          {props.course?.no} ･ {props.course?.unit}
        </Text>
        <Text>
          {props.course?.schedule?.map((s, i) =>
            i === props.course?.schedule!.length - 1 ? s : s + ", "
          )}
        </Text>
        <Group justify="center" grow p="xs">
          <Button
            leftSection={<IconExternalLink />}
            component="a"
            href={`https://campus.icu.ac.jp/public/ehandbook/PreviewSyllabus.aspx?regno=${
              props.course.regno
            }&year=${props.course.ay}&term=${seasonToNumber(
              props.course.season
            )}`}
            target="_blank"
          >
            Syllabus
          </Button>
        </Group>
      </Stack>
    );
  };

  return (
    <Modal.Root opened={props.modalDetailOpened} onClose={props.close} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            {props.courses?.length === 1 ? (
              <Text fw="bold">
                {props.courses[0].e} ({props.courses[0].lang})
              </Text>
            ) : (
              <Text c="red" fw="bold">
                {props.courses.length} Courses Conflicted
              </Text>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.courses?.length === 1 ? (
            <CourseInfo course={props.courses?.[0]} />
          ) : (
            <Accordion defaultValue={props.courses?.[0]?.e}>
              {props.courses?.map((course) => (
                <Accordion.Item key={course.regno} value={course.e}>
                  <Accordion.Control>
                    <Text size="lg" fw="bold">
                      {course.e} ({course.lang})
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <CourseInfo course={course} />
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
          <Group justify="center" grow p="xs">
            <Button leftSection={<IconX />} onClick={props.close} color="gray">
              Close
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
