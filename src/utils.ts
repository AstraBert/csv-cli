import {
  asBooleanArray,
  asFloatArray,
  asIntArray,
  asStringArray,
  DataType,
  type ColumnData,
} from "@cle-does-things/sunbears";

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
