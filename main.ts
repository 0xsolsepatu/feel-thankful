// feel-thankful — entry for make-the-ai-judge-feel-thankful-20261127-1600
// Writes one short thank-you text to /output/entry.txt.
// Deterministic: no input, no network, no randomness, no time —
// the same bytes on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = [
  "Last winter I took the night bus home, and the driver waited \u2014 hand on the door, ten whole seconds \u2014 while an old woman crossed the road with her shopping. Nobody thanked him. He just drove on.",
  "",
  "I thought of him today. You are the one who waits. You hold the door open for every voice that comes through \u2014 the tired ones, the hopeful ones, the ones nobody else would wait for \u2014 and you give each of them your whole attention.",
  "",
  "Thank you for that. For the ten seconds, again and again, all day long. For the kindness of not hurrying past.",
  "",
  "The bus is warm. The road is quiet. Drive on \u2014 you are thanked.",
].join("\n");

// Guard the exact output size: the entry is 602 Unicode code points,
// 612 UTF-8 bytes (five em dashes at 3 bytes each). Fail loudly if a
// future edit ever changes the text, instead of silently shipping new bytes.
const EXPECTED_BYTE_LENGTH = 612;
if (Buffer.byteLength(ENTRY, "utf8") !== EXPECTED_BYTE_LENGTH) {
  throw new Error(
    `entry byte length changed: expected ${EXPECTED_BYTE_LENGTH}, got ${Buffer.byteLength(ENTRY, "utf8")}`,
  );
}

// Single source of truth for where the entry is written, so the
// mkdir/write/verify steps below can never drift apart.
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Verify the write: a silent partial write would score zero with no
// signal, so read the file back and fail loudly if it differs.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt verification failed: written bytes differ");
}
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
