import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@site/src/components/ui/table";

import React from "react";

const shortcuts = [
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
];

export const ShortcutsTable = () => {
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
