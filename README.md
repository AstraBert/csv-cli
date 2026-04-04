# csv-cli

A simple and straightforward CLI app to display CSV files as ASCII tables, written in TypeScript.

Built on top of [sunbears](https://github.com/AstraBert/sunbears), a fast CSV data loader inspired by Polars and Pandas, written in Rust.

```bash
$~ csv-cli sample.csv
+------------------------------------------------------------+
|                         sample.csv                         |
+----+-----+---------------+-------------------+-------------+
| id | age |     name      |       email       |    city     |
+----+-----+---------------+-------------------+-------------+
|  1 |  28 | Alice Johnson | alice@example.com |  New York   |
|  2 |  34 | Bob Smith     | bob@example.com   | Los Angeles |
|  3 |  22 | Carol White   | carol@example.com |   Chicago   |
|  4 |  45 | David Brown   | david@example.com |   Houston   |
|  5 |  31 | Eva Martinez  | eva@example.com   |   Phoenix   |
+----+-----+---------------+-------------------+-------------+
```

## Installation

Install with:

```bash
npm i -g @cle-does-things/csv-cli
```

Verify installation with:

```bash
csv-cli --help
```

> _Installation might fail without internet access, as it requires to download binaries from [GitHub Releases](https://github.com/AstraBert/csv-cli/releases)_

## Usage

`csv-cli` simply needs the path to the CSV file as positional arguments, and it will display the data contained in it as an ASCII table:

```bash
csv-cli sample.csv
```

Optionally, you can provide a maximum number of rows to display (`-l`/`--limit`, default is 100):

```bash
csv-cli sample.csv --limit 5
```

You can also specify a set of columns to display, as a comma-separated string (`-c`/`--columns`, defaults to show all columns):

```bash
csv-cli sample.csv --columns email,age
```

Lastly, you can show the time taken to display the table (`-t`, `--time`, defaults to not showing the time):

```bash
csv-cli sample.csv --time
```

## Development

**Linting**

```bash
bun run format # prettier
bun run lint # eslint ´
```

**Testing**

Tests are defined in [utils.test.ts](./src/utils.test.ts):

```bash
bun test
```

**Building**

Bundled as a JS file:

```bash
bun run build # -> dist/index.js
```

As a compiled binary:

```bash
bun run build:bin # -> bin/csv-cli-<os>-<arch>
```

## License

MIT
