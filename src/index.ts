#!/usr/bin/env node

import {
  asBooleanArray,
  asFloatArray,
  asIntArray,
  asStringArray,
  DataType,
  readCsv,
  type ColumnData,
} from "@cle-does-things/sunbears";
import { AlignmentEnum, AsciiTable3 } from "ascii-table3";

export function colToArray(
  col: ColumnData,
  dt: DataType,
): string[] | number[] | boolean[] {
  let arr;
  switch (dt) {
    case DataType.String:
      arr = asStringArray(col)!;
      break;
    case DataType.Float:
      arr = asFloatArray(col)!;
      break;
    case DataType.Integer:
      arr = asIntArray(col)!;
      break;
    default:
      arr = asBooleanArray(col)!;
      break;
  }
  if (arr) {
    return arr;
  }
  throw new Error("Incorrect data type for the column");
}

export function transformColumns(cols: (string[] | boolean[] | number[])[]) {
  let i = 0;
  const matrix = [];
  while (i < cols[0]!.length) {
    const row = [];
    for (const c of cols) {
      row.push(c[i]);
    }
    matrix.push(row);
    i++;
  }
  return matrix;
}

function main(): void {
  const firstArg = process.argv.at(2);
  if (firstArg && (firstArg === "--help" || firstArg === "-h")) {
    console.log(
      "Read a CSV file and output it as a ASCII table to terminal.\n\nArguments:\n  PATH: the path to the CSV file to read\n\nOptions:\n  --help/-h: Print the help message.",
    );
    return;
  }
  if (!firstArg) {
    console.error("You should provide a CSV file path");
    return;
  }
  const df = readCsv(firstArg);
  const cols = Object.keys(df.columns);
  const colData = Object.values(df.columns);
  const transformCols = [];
  let i = 0;
  while (i < colData.length) {
    const dt = df.colDtype(cols[i]!)!;
    const arr = colToArray(colData[i]!, dt);
    transformCols.push(arr);
    i++;
  }
  const rowMatrix = transformColumns(transformCols);
  const table = new AsciiTable3(firstArg)
    .setHeading(...cols)
    .setAlign(cols.length, AlignmentEnum.CENTER)
    .addRowMatrix(rowMatrix);
  console.log(table.toString());
}

main();
