import React from "react";
import { Grid } from "@mantine/core";

function TimetableColumn() {
  return (
    <Grid.Col span={12 / 7}>
      <p>TimetableColumn</p>
    </Grid.Col>
  );
}

export default function Timetable() {
  return (
    <div>
      <Grid>
        <TimetableColumn />
      </Grid>
    </div>
  );
}
