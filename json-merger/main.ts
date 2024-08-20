import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';

(async () => {
  const inputDir = 'input';

  const inputFiles = await glob(`${inputDir}/**/*.json`);
  console.log(inputFiles);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergedContent: Record<string, any> = {};

  for (const file of inputFiles) {
    const relativeFilePath = path.relative(inputDir, file).replace('.json', '');
    const content = await fs.readFile(file, 'utf-8');

    console.log(`Processing ${file}`);

    // Ensure the nested structure exists and inject data
    const pathParts = relativeFilePath.split(path.sep);
    let currentLevel = mergedContent;
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (i === pathParts.length - 1) {
        currentLevel[part] = JSON.parse(content);
      } else {
        currentLevel[part] = currentLevel[part] ?? {};
        currentLevel = currentLevel[part];
      }
    }
  }

  fs.writeFile(`${__dirname}/output/data.json`, JSON.stringify(mergedContent));
})();
