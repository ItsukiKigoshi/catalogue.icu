import ModalConfirm from "@/src/components/ModalConfirm";
import { Course } from "@/src/type/Types";
import {
  ActionIcon,
  Card,
  Divider,
  Flex,
  Grid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";

export default function CourseCard(props: {
  course: Course;
  open: () => void;
  toggleIsEnrolled: (regno: number) => void;
  deleteCourse: (regno: number) => void;
  language: string;
}) {
  const [modalConfirmOpened, { open, close }] = useDisclosure(false);

  return (
    <Card p={0} m={0} withBorder>
      <Grid justify="flex-end">
        <Grid.Col span={10}>
          <UnstyledButton
            onClick={() => {
              props.open();
            }}
            key={props.course.regno}
            p="md"
          >
            <Flex gap="xs">
              <Divider
                color={props.course.color}
                size="xl"
                w="2px"
                orientation="vertical"
              />
              <Stack gap="sm">
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {props.course.no} ･ {props.course.unit}
                </Text>
                <Text size="sm" lineClamp={1}>
                  {props.language === "E" ? props.course.e : props.course.j} (
                  {props.course.lang})
                </Text>
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {props.course.schedule?.map((s, i) =>
                    i === props.course.schedule!.length - 1 ? s : s + ", "
                  )}
                </Text>
              </Stack>
            </Flex>
          </UnstyledButton>
        </Grid.Col>
        {/*<Grid.Col span={}>*/}
        {/*  <Divider orientation="vertical" my="md" mx={0} />*/}
        {/*</Grid.Col>*/}
        <Grid.Col span={2}>
          <Stack align="center" h="100%" p="md">
            <ActionIcon
              onClick={() => {
                props.toggleIsEnrolled(props.course.regno);
              }}
              color="gray"
            >
              {props.course.isEnrolled ? <IconEye /> : <IconEyeOff />}
            </ActionIcon>

            <ActionIcon onClick={open} color="red">
              <IconTrash />
            </ActionIcon>
          </Stack>
        </Grid.Col>
      </Grid>

      <ModalConfirm
        title={`Are you sure to delete "${
          props.language === "E" ? props.course.e : props.course.j
        }"?`}
        confirmLabel="Yes, Delete"
        onConfirm={() => {
          props.deleteCourse(props.course.regno);
        }}
        modalConfirmOpened={modalConfirmOpened}
        close={close}
      />
    </Card>
  );
}
