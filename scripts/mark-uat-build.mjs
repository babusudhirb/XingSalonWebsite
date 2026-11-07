// UAT is publicly reachable for review, but must never compete with the live
// website in search. Add this to every generated and legacy HTML page after
// the normal build, without changing the production build output.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist';
const marker = '<meta name="robots" content="noindex, nofollow" data-uat-robots />';

function htmlFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const file = join(directory, entry);
    if (statSync(file).isDirectory()) return htmlFiles(file);
    return file.endsWith('.html') ? [file] : [];
  });
}

for (const file of htmlFiles(root)) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('data-uat-robots')) continue;
  writeFileSync(file, html.replace(/<head>/i, `<head>\n    ${marker}`));
}

console.log('Marked UAT HTML as noindex, nofollow.');
