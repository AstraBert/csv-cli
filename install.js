import { createWriteStream, chmodSync } from "fs";
import { pipeline } from "stream/promises";

const VERSION = "0.1.0";
const REPO = "AstraBert/csv-cli";

// Map Node's platform/arch to your compiled binary names
const PLATFORM_MAP = {
  "darwin-arm64": "csv-cli-darwin-arm64",
  "darwin-x64": "csv-cli-darwin-x64",
  "linux-x64": "csv-cli-linux-x64",
  "linux-arm64": "csv-cli-linux-arm64",
  "win32-x64": "csv-cli-windows-x64.exe",
};

const key = `${process.platform}-${process.arch}`;
const binaryName = PLATFORM_MAP[key];

if (!binaryName) {
  console.error(`Unsupported platform: ${key}`);
  process.exit(1);
}

const url = `https://github.com/${REPO}/releases/download/v${VERSION}/${binaryName}`;
const dest = process.platform === "win32" ? "bin/csv-cli.exe" : "bin/csv-cli";

// Download and save
const response = await fetch(url);
if (!response.ok) throw new Error(`Failed to download: ${response.statusText}`);

await pipeline(response.body, createWriteStream(dest));

// Make executable on unix
if (process.platform !== "win32") chmodSync(dest, 0o755);
