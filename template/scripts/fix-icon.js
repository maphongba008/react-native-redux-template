const fs = require('fs');
const { execSync } = require('child_process');
execSync(
  'cp -f icomoon/fonts/icomoon.ttf android/app/src/main/assets/fonts/ && cp -f icomoon/fonts/icomoon.ttf src/assets/fonts/ && cp -f icomoon/selection.json src/components/',
);
const pathToJson = 'src/components/selection.json';

const content = fs.readFileSync(pathToJson, 'utf8');
const data = JSON.parse(content);

const names = data.icons.map((icon) => icon.properties.name);

console.log(names);

const contentToWrite = `export type IconNames = ${names.map((name) => "'" + name + "'").join(' | \n ')}`;

const destination = 'src/components/IconNames.tsx';

fs.writeFileSync(destination, contentToWrite, 'utf8');
execSync(`npx prettier --write ${destination}`);
