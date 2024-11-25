import { ActionIcon, Container, Group, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import ButtonLogin from "@/src/components/ButtonLogin";

export function Header(props: {
  weekdays: string[];
  toggleSaturday: () => void;
  modalSettingOpen: () => void;
}) {
  return (
    <header>
      <Container
        size="max"
        style={{
          height: "56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Group gap={5}>
          <Text size="lg" fw={700}>
            ICU Catalogue
          </Text>
        </Group>
        <Group gap={5}>
          <ActionIcon
            color="gray"
            variant="default"
            size="xl"
            aria-label="Settings"
            onClick={props.modalSettingOpen}
          >
            <IconSettings />
          </ActionIcon>
          <ButtonLogin />
        </Group>
      </Container>
    </header>
  );
}
