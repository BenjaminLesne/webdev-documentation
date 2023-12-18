import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@site/src/components/ui/table";

import React from "react";

type Shortcut = {
  action: string;
  description: string;
};

type Props = {
  shortcuts: Shortcut[];
};

const vscodeShortcuts = [
  {
    action: "CTRL + K + Z",
    description: "toggle zen mode",
  },
  {
    action: "SHIFT + ALT + K",
    description: "clear the terminal",
  },
  {
    action: "CTRL + SHIFT + H",
    description: "search the current word and focus the replace field",
  },
  {
    action: "CTRL + SHIFT + ALT + ARROW (top/down)",
    description: "copy and paste the current line",
  },

  {
    action: "CTRL + K CTRL + J",
    description: "unfold all folded code blocks",
  },
  {
    action: "CTRL + K CTRL + L",
    description: "toggle fold current code block",
  },
  {
    action: "CTRL + SHIFT + K",
    description: "delete current line",
  },
  {
    action: "CTRL + SHIFT + G",
    description: "show source control",
  },
  {
    action: "CTRL + SHIFT + E",
    description: "show explorer",
  },
  {
    action: "CTRL + SHIFT + L",
    description: "select all occurences",
  },
  {
    action: "CTRL + SHIFT + ²",
    description: "open a new terminal",
  },
  {
    action: "CTRL + ²",
    description: "toggle the terminal window",
  },
  {
    action: "CTRL + ALT + F (I'm not sure, I used this on macos)",
    description: "follow the other user while live sharing",
  },
  {
    action: "CTRL + K + S",
    description: "save without formatting",
  },
];

export const ShortcutsTable = ({ shortcuts = vscodeShortcuts }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Shortcut</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shortcuts.map((shortcut) => (
          <TableRow>
            <TableCell>{shortcut.action}</TableCell>
            <TableCell>{shortcut.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
