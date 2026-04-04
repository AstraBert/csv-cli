#!/usr/bin/env node

import { readCsv, type ColumnData } from "@cle-does-things/sunbears";
import { AlignmentEnum, AsciiTable3 } from "ascii-table3";
import { Command } from "commander";
import { colToArray, transformColumns } from "./utils";

function createTable(
  csvPath: string,
  limit: number,
  columns: string[] | undefined,
): void {
  const df = readCsv(csvPath);
  let cols: string[];
  let colData: ColumnData[];
  if (columns) {
    const entries = Object.entries(df.columns).filter((o) =>
      columns.includes(o[0]),
    );
    cols = entries.map((o) => o[0]);
    colData = entries.map((o) => o[1]);
  } else {
    cols = Object.keys(df.columns);
    colData = Object.values(df.columns);
  }
  const transformCols = [];
  let i = 0;
  while (i < colData.length) {
    const dt = df.colDtype(cols[i]!)!;
    const arr = colToArray(colData[i]!, dt);
    transformCols.push(arr);
    i++;
  }
  let rowMatrix = transformColumns(transformCols);
  if (rowMatrix.length > limit) {
    rowMatrix = rowMatrix.slice(0, limit);
  }
  const table = new AsciiTable3(csvPath)
    .setHeading(...cols)
    .setAlign(cols.length, AlignmentEnum.CENTER)
    .addRowMatrix(rowMatrix);
  console.log(table.toString());
}

const program = new Command("csv-cli");

program
  .description("Parse a CSV file and represent it as a ASCII table")
  .argument("<file>")
  .option(
    "-l, --limit <number>",
    "maximum number of rows to display, defaults to 100.",
    parseInt,
  )
  .option(
    "-c, --columns <columns>",
    "comma-separated list of columns to display. Displays all columns if not provided",
  )
  .option(
    "-t, --time",
    "display time taken to create the table. Defaults to false",
  )
  .action(
    (
      file: string,
      opts: { limit?: number; columns?: string; time?: boolean },
    ) => {
      let cols: string[] | undefined = undefined;
      if (opts.columns) {
        cols = opts.columns.split(",");
      }
      const start = Date.now();
      createTable(file, opts.limit ?? 100, cols);
      const taken = Date.now() - start;
      if (opts.time) {
        console.log(`Done in: ${taken / 1000} s`);
      }
    },
  );

program.parse();
