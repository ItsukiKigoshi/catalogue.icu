import { Container, Group, Text } from "@mantine/core";

export default function Header() {
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
      </Container>
    </header>
  );
}
