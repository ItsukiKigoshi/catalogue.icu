import React from "react";
import { Grid, Stack } from "@mantine/core";

function TimetableColumn(props: { span: Record<string, any> }) {
  return (
    <Grid.Col span={props.span}>
      <Stack>
        <p>Hello</p>
      </Stack>
    </Grid.Col>
  );
}

export default TimetableColumn;
