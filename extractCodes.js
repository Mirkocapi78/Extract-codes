#!/usr/bin/env node
// extractCodes.js – legge prime 6 cifre di ogni file in una cartella
// e stampa la lista di codici unici ordinati.

const fs   = require('fs');
const path = require('path');

const folder = process.argv[2];
if (!folder) {
  console.error("Uso: extractCodes.exe <cartella>");
  process.exit(1);
}

if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
  console.error(`Errore: '${folder}' non è una cartella valida`);
  process.exit(1);
}

const files = fs.readdirSync(folder);
const codes = new Set();

for (const f of files) {
  const p = path.join(folder, f);
  if (fs.statSync(p).isFile()) {
    const buf = Buffer.alloc(6);
    const fd  = fs.openSync(p, 'r');
    const n   = fs.readSync(fd, buf, 0, 6, 0);
    fs.closeSync(fd);
    const code = buf.toString('utf8', 0, n).trim();
    if (code) codes.add(code);
  }
}

for (const c of Array.from(codes).sort()) {
  console.log(c);
}
