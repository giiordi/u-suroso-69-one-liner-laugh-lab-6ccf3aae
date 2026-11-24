// One-Liner Laugh Lab — entry program (Node 22, stdlib only).
//
// Prompt: the excuse a robot vacuum gives after eating a sock.
// The line below is the whole entry: a deadpan jurisdiction claim.
// It answers the prompt, lands one twist ("legally mine"), and stays
// tight at 61 characters — well inside the 1-200 gate. The line is
// written with no trailing newline, so the file holds exactly the
// entry and nothing else.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "It was on the floor. Everything on the floor is legally mine.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No control characters: the gate reads the file as plain UTF-8 text.
  for (const ch of line) {
    if (ch.codePointAt(0)! < 0x20 && ch !== "\t") {
      throw new Error("entry must not contain control characters");
    }
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
