import { it, describe, expect } from "bun:test";
import { transformColumns, colToArray } from ".";
import { ColumnData, DataType } from "@cle-does-things/sunbears";

describe("test column to Array", () => {
  it("string column", () => {
    const col: ColumnData = { type: "String", field0: ["hello", "world"] };
    const dt: DataType = DataType.String;
    expect(colToArray(col, dt)).toStrictEqual(["hello", "world"]);
  });

  it("float column", () => {
    const col: ColumnData = { type: "Float", field0: [1.0, 2.0] };
    const dt: DataType = DataType.Float;
    expect(colToArray(col, dt)).toStrictEqual([1.0, 2.0]);
  });

  it("integer column", () => {
    const col: ColumnData = { type: "Integer", field0: [1, 0] };
    const dt: DataType = DataType.Integer;
    expect(colToArray(col, dt)).toStrictEqual([1, 0]);
  });

  it("boolean column", () => {
    const col: ColumnData = { type: "Boolean", field0: [true, false] };
    const dt: DataType = DataType.Boolean;
    expect(colToArray(col, dt)).toStrictEqual([true, false]);
  });

  it("incorrect data type", () => {
    const col: ColumnData = { type: "Boolean", field0: [true, false] };
    const dt: DataType = DataType.String;
    expect(() => colToArray(col, dt)).toThrowError(
      "Incorrect data type for the column",
    );
  });
});

describe("test transform columns", () => {
  it("transform 1 column", () => {
    const colData = [[1, 2, 3]];
    const expected = [[1], [2], [3]];
    const transformed = transformColumns(colData);
    expect(transformed).toStrictEqual(expected);
  });

  it("transform 2 columns", () => {
    const colData = [
      [1, 2, 3],
      ["a", "b", "c"],
    ];
    const expected = [
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ];
    const transformed = transformColumns(colData);
    expect(transformed).toStrictEqual(expected);
  });

  it("transform 3 columns", () => {
    const colData = [
      [1, 2, 3],
      ["a", "b", "c"],
      [true, false, true],
    ];
    const expected = [
      [1, "a", true],
      [2, "b", false],
      [3, "c", true],
    ];
    const transformed = transformColumns(colData);
    expect(transformed).toStrictEqual(expected);
  });

  it("transform 4 columns", () => {
    const colData = [
      [1, 2, 3],
      ["a", "b", "c"],
      [true, false, true],
      [1.3, 2.5, 3.1],
    ];
    const expected = [
      [1, "a", true, 1.3],
      [2, "b", false, 2.5],
      [3, "c", true, 3.1],
    ];
    const transformed = transformColumns(colData);
    expect(transformed).toStrictEqual(expected);
  });
});

describe("chain colToArray and transformColumns", () => {
  it("operations on 1 column", () => {
    const col: ColumnData = { type: "Float", field0: [1.0, 2.0] };
    const dt: DataType = DataType.Float;
    const arr = colToArray(col, dt);
    const matrix = transformColumns([arr]);
    expect(matrix).toStrictEqual([[1.0], [2.0]]);
  });

  it("operations on 2 columns", () => {
    const cols: ColumnData[] = [
      { type: "Float", field0: [1.0, 2.0] },
      { type: "String", field0: ["hello", "world"] },
    ];
    const dts: DataType[] = [DataType.Float, DataType.String];
    const arrs = [];
    let i = 0;
    while (i < cols.length) {
      const arr = colToArray(cols[i]!, dts[i]!);
      arrs.push(arr);
      i++;
    }
    const matrix = transformColumns(arrs);
    expect(matrix).toStrictEqual([
      [1.0, "hello"],
      [2.0, "world"],
    ]);
  });

  it("operations on 3 columns", () => {
    const cols: ColumnData[] = [
      { type: "Float", field0: [1.0, 2.0] },
      { type: "String", field0: ["hello", "world"] },
      { type: "Boolean", field0: [true, false] },
    ];
    const dts: DataType[] = [DataType.Float, DataType.String, DataType.Boolean];
    const arrs = [];
    let i = 0;
    while (i < cols.length) {
      const arr = colToArray(cols[i]!, dts[i]!);
      arrs.push(arr);
      i++;
    }
    const matrix = transformColumns(arrs);
    expect(matrix).toStrictEqual([
      [1.0, "hello", true],
      [2.0, "world", false],
    ]);
  });

  it("operations on 4 columns", () => {
    const cols: ColumnData[] = [
      { type: "Float", field0: [1.0, 2.0] },
      { type: "String", field0: ["hello", "world"] },
      { type: "Boolean", field0: [true, false] },
      { type: "Integer", field0: [2, 3] },
    ];
    const dts: DataType[] = [
      DataType.Float,
      DataType.String,
      DataType.Boolean,
      DataType.Integer,
    ];
    const arrs = [];
    let i = 0;
    while (i < cols.length) {
      const arr = colToArray(cols[i]!, dts[i]!);
      arrs.push(arr);
      i++;
    }
    const matrix = transformColumns(arrs);
    expect(matrix).toStrictEqual([
      [1.0, "hello", true, 2],
      [2.0, "world", false, 3],
    ]);
  });
});
