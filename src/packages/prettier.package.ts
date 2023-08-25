import { fileSystem } from '../services/node';
import { DependencyTypeEnum, PackagesEnumKeys } from '../type/enums';
import { BasePackage } from './base.package';

class PrettierPackage extends BasePackage {
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;
  readonly name: string = 'prettier';
  readonly package: PackagesEnumKeys = 'prettier';

  prepare(): void {
    fileSystem.writeFile(
      '.prettierrc',
      `{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "bracketSameLine": true,
  "printWidth": 80
}`
    );

    fileSystem.writeFile(
      '.prettierignore',
      `# Add files here to ignore them from prettier formatting
/dist
/coverage
.angular
node_modules
`
    );
  }
}

export const prettier = new PrettierPackage();
