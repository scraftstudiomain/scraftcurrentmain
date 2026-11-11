import {execFileSync} from 'node:child_process';
import {readFileSync, lstatSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const textMarkers = [
  ['73706c69744c616e65', 'known obfuscated loader'],
  ['36393132383437', 'known loader decoder seed'],
  ['36313832303339', 'known loader decoder seed'],
  ['33303535313737', 'known loader decoder seed'],
  ['737061776e4e6f6465536372697074', 'known remote-code loader'],
  ['307831656566303834396564613135643837663634653531633733633834343263663363386263656633', 'known loader controller'],
  ['2f30782f636c73', 'known remote payload path'],
  ['2f30782f6c73', 'known remote payload path'],
  ['782d7061796c6f61642d623634', 'known remote payload header'],
].map(([hex, reason]) => [Buffer.from(hex, 'hex').toString('utf8'), reason]);

export function checkFile(name, bytes) {
  const problems = [];
  const text = bytes.toString('utf8');
  const decoded = text.replace(/\\u([0-9a-f]{4})|\\x([0-9a-f]{2})/gi, (_, u, x) => String.fromCharCode(parseInt(u || x, 16)));
  const normalized = decoded.toLowerCase();
  for (const [marker, reason] of textMarkers) if (normalized.includes(marker.toLowerCase())) problems.push(reason);
  if (/\bnode\s+(?:\.\/)?init\s*&&/.test(decoded)) problems.push('unexpected startup initializer');
  if (/\.(?:ttf|otf|woff|woff2)$/i.test(name)) {
    const signature = bytes.subarray(0, 4).toString('hex');
    if (!['00010000', '4f54544f', '74746366', '774f4646', '774f4632'].includes(signature)) problems.push('font file has no valid font header');
  }
  if (/\.(?:lkf)$/i.test(name)) problems.push('unexpected executable disguised as a font');
  if ((name.startsWith('.vscode/') || name.endsWith('.code-workspace')) && /\bnode\b/i.test(decoded) && /public[\\/]fonts[\\/]/i.test(decoded)) problems.push('editor task executes a font file');
  return [...new Set(problems)];
}

export function scanEntries(entries) {
  const findings = [];
  for (const [name, bytes] of entries) for (const reason of checkFile(name, bytes)) findings.push({path: name, reason});
  return findings;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const names = execFileSync('git', ['ls-files', '-z'], {encoding: 'utf8'}).split('\0').filter(Boolean);
  const findings = [];
  for (const name of names) {
    const stat = lstatSync(name);
    if (!stat.isFile() || stat.isSymbolicLink()) continue;
    for (const reason of checkFile(name, readFileSync(name))) findings.push({path: name, reason});
  }
  if (findings.length) {
    for (const {path: name, reason} of findings) console.error(`${name}: ${reason}`);
    console.error('Repository safety check failed. Review these files before running or deploying the project.');
    process.exitCode = 1;
  } else console.log(`Repository safety check passed (${names.length} tracked paths).`);
}
