import { Course } from "@/src/type/Types";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Modal,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { IconDownload, IconMoon, IconSun } from "@tabler/icons-react";
import { CSVLink } from "react-csv";

export default function ModalSetting(props: {
  modalSettingOpened: boolean;
  close: () => void;
  weekdays: string[];
  toggleSaturday: () => void;
  courses: Course[];
}) {
  const { setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme(useColorScheme(), {
    getInitialValueInEffect: true,
  });
  return (
    <Modal
      opened={props.modalSettingOpened}
      onClose={props.close}
      title="Settings"
      centered
    >
      <Group justify="space-between" wrap="nowrap" gap="xl">
        <Text>Saturday</Text>
        <Checkbox
          checked={props.weekdays.length === 6}
          onChange={() => {
            props.toggleSaturday();
          }}
        />
      </Group>
      {/* <Group
        justify="space-between"
        wrap="nowrap"
        gap="xl"
      >
        <Text>ELA / JLP Core</Text>
        <Input data-autofocus placeholder='Enter Section (e.g."5A")' />
      </Group>
      <Group
        justify="space-between"
        wrap="nowrap"
        gap="xl"
      >
        <Text>ELA / JLP AS</Text>
        <Input placeholder='Enter Section (e.g."5AS1")' />
      </Group> */}
      <Group justify="space-between" wrap="nowrap" gap="xl">
        <Text>Download CSV</Text>
        <CSVLink
          data={props.courses}
          filename={`courses-${new Date().toISOString().slice(0, 10)}.csv`}
        >
          <ActionIcon>
            <IconDownload />
          </ActionIcon>
        </CSVLink>
      </Group>
      <Group justify="space-between" wrap="nowrap" gap="xl">
        <Text>Color</Text>
        <Group>
          <Button
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="sm"
            aria-label="Toggle color scheme"
          >
            {computedColorScheme === "dark" ? (
              <IconSun stroke={1.5} />
            ) : (
              <IconMoon stroke={1.5} />
            )}
          </Button>
          <Button
            onClick={() => setColorScheme("auto")}
            variant="default"
            size="sm"
          >
            System
          </Button>
        </Group>
      </Group>
    </Modal>
  );
}
