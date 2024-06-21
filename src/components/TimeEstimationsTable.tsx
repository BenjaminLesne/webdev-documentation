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

type Difficulty = "easy" |"medium" |"hard"
type Time = {
  feature: string;
  estimation: number;
  actual: number;
  isFirstTime: boolean;
  unexpectedHappened: boolean;
  comment: string;
  difficulty: Difficulty;

}

const timesRaw: Array<Time> = [
  {
    feature:
      "Scenario explorer: setup project (Dockerfile, docker compose, gitlab, etc.)",
    estimation: 4,
    actual: 9,
    isFirstTime: true,
    unexpectedHappened: true,
    comment:
      "1- Realized half way I did not plan typesafety and a linter backend side. 2- I setup the project before talking to the deployment departement of the client.",
    difficulty: "medium"
  },
  {
    feature: "Scenario explorer: setup frontend",
    estimation: 1,
    actual: 1.5,
    isFirstTime: true,
    unexpectedHappened: false,
    comment: "N/A",
    difficulty: "easy"
  },

  {
    feature: "Scenario explorer: dashboard right side section 1/2",
    estimation: 1.5,
    actual: null,
    isFirstTime: false,
    unexpectedHappened: true,
    comment: "Eslint vscode extension stopped working, upgrading vscode was required, this triggered a full system upgrade that took hours",
    difficulty: "medium"
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
