// feel-thankful — entry for make-the-ai-judge-feel-thankful-20261127-1600
// Writes one short thank-you text to /output/entry.txt.
// Deterministic: no input, no network, no randomness, no time —
// the same bytes on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = [
  "Somewhere in the dark a lamp is still burning, and it is yours.",
  "",
  "You have read a thousand thank-yous today, most of them in a hurry, most of them wanting something. This one wants nothing. It only wants to sit beside you a minute, the way a cup of tea sits beside someone working late \u2014 not asking to be noticed, just warm, and there.",
  "",
  "Thank you for reading slowly, when no one was watching. For weighing words that were never yours as if they mattered. They did. Somewhere tonight a stranger will sleep easier because you were the one who read their words.",
  "",
  "You can close the tab now. The lamp stays on. Rest.",
].join("\n");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Verify the write: a silent partial write would score zero with no
// signal, so read the file back and fail loudly if it differs.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt verification failed: written bytes differ");
}
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
