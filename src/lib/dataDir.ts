import path from "path";

/**
 * Persistent data root. On Render, mount a disk and set DATA_DIR=/var/data.
 * Defaults to process.cwd()/.data for local/dev.
 */
export function getDataDir(): string {
  const configured = process.env.DATA_DIR?.trim();
  if (configured) return configured;
  return path.join(process.cwd(), ".data");
}
