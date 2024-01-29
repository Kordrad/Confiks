import * as dependencies from '../../dist/packages/cli/src/components/packages/index.js';
import * as fs from 'node:fs';

let packageJson = JSON.parse(
  fs.readFileSync('./package.json', {
    encoding: 'utf8',
  }) ?? '{}'
);

Object.values(dependencies).forEach(Dependency => {
  const dep = new Dependency();
  const dependencyType = 'devDependencies';

  packageJson = {
    ...packageJson,
    [dependencyType]: {
      ...packageJson[dependencyType],
      [dep.package]: dep.version,
    },
  };
});

fs.writeFile(
  './package.json',
  JSON.stringify(packageJson, undefined, 2),
  () => {}
);
