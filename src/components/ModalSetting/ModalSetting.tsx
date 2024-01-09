import {
    Button,
    Group,
    Input,
    Modal,
    NativeSelect,
    Text,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./ModalSetting.module.css";

export default function ModalSetting(props: {
    modalOpened: boolean;
    close: () => void;
}) {
  const { setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme(useColorScheme(), {
    getInitialValueInEffect: true,
  });
  return (
    <Modal
      opened={props.modalOpened}
      onClose={props.close}
      title="Settings"
      centered
    >
      <Group
        justify="space-between"
        className={classes.item}
        wrap="nowrap"
        gap="xl"
      >
        <Text>Term</Text>
        <NativeSelect
          data={["Not Specified", "Spring 2023", "Autumn 2023", "Winter 2023"]}
        />
      </Group>
      <Group
        justify="space-between"
        className={classes.item}
        wrap="nowrap"
        gap="xl"
      >
        <Text>ELA / JLP Core</Text>
        <Input data-autofocus placeholder='Enter Section (e.g."5A")' />
      </Group>
      <Group
        justify="space-between"
        className={classes.item}
        wrap="nowrap"
        gap="xl"
      >
        <Text>ELA / JLP AS</Text>
        <Input placeholder='Enter Section (e.g."5AS1")' />
      </Group>
      <Group
        justify="space-between"
        className={classes.item}
        wrap="nowrap"
        gap="xl"
      >
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
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
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
