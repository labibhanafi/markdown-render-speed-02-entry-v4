// Entry point the make.fun harness runs (node /bot/main.ts on Node 22).
// It reads every case from /input/cases.json — a JSON array of
// { id, markdown } objects — renders each markdown string on its own with
// the parse() function from ./parse.js, and writes the resulting HTML
// strings, in the same order, as a JSON array to /output/html.json.
// When run outside the grading container, the environment variables
// MAKEFUN_INPUT_DIR and MAKEFUN_OUTPUT_DIR can point at local stand-ins
// for /input and /output, which is how the practice set is graded locally.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(inputDir, 'cases.json'), 'utf8');
const cases = JSON.parse(raw) as { id: string; markdown: string }[];

const rendered: string[] = new Array(cases.length);
for (let i = 0; i < cases.length; i++) {
  rendered[i] = parse(cases[i].markdown);
}

writeFileSync(join(outputDir, 'html.json'), JSON.stringify(rendered));
