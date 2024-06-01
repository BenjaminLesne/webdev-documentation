import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@site/src/components/ui/table";

import React from "react";

type TimeDifferenceRatioArgs = { actualTime: number; estimatedTime: number };
function timeDifferenceRatio({
  actualTime,
  estimatedTime,
}: TimeDifferenceRatioArgs) {
  if (actualTime == null || actualTime === 0) return undefined;
  return (actualTime - estimatedTime) / actualTime;
}

type RatioToPercentage = {
  ratio: number;
};
function ratioToPercentage({ ratio }: RatioToPercentage) {
  if (typeof ratio !== "number") return "undefined";
  return (ratio * 100).toFixed(2);
}

const timesRaw = [
  {
    feature: "EUBS setup project (Dockerfile, docker compose, gitlab, etc.)",
    estimation: 4,
    actual: undefined,
    isFirstTime: true,
    unexpectedHappened: true,
    comment:
      "1- Realized half way I did not plan typesafety and a linter backend side. 2- I setup the project before talking to the deployment departement of the client.",
  },
];

const times = timesRaw.map((time) => ({
  ...time,
  differenceRatio: timeDifferenceRatio({
    actualTime: time.actual,
    estimatedTime: time.estimation,
  }),
}));

const totalEstimation = times.reduce((acc, time) => acc + time.estimation, 0);
const totalActual = times.reduce((acc, time) => acc + time.actual, 0);
const totalDifferenceRatio = timeDifferenceRatio({
  actualTime: totalActual,
  estimatedTime: totalEstimation,
});

export const TimeEstimationsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          <TableHead>Estimated time (days)</TableHead>
          <TableHead>Actual time (days)</TableHead>
          <TableHead>Time difference (%)</TableHead>
          <TableHead>Is first time</TableHead>
          <TableHead>Unexpected things happened</TableHead>
          <TableHead>Comment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {times.map((time) => (
          <TableRow>
            <TableCell>{time.feature}</TableCell>
            <TableCell>{time.estimation}</TableCell>
            <TableCell>{time.actual}</TableCell>
            <TableCell>
              {ratioToPercentage({ ratio: time.differenceRatio })}
            </TableCell>
            <TableCell>{time.isFirstTime ? "✅" : "❌"}</TableCell>
            <TableCell>{time.unexpectedHappened ? "✅" : "❌"}</TableCell>
            <TableCell>
              <p>{time.comment}</p>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>
            <strong>Total</strong>
          </TableCell>
          <TableCell>{totalEstimation}</TableCell>
          <TableCell>{totalActual}</TableCell>
          <TableCell>
            <strong>
              {ratioToPercentage({ ratio: totalDifferenceRatio })}
            </strong>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
