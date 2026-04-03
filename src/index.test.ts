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
