import { fileSystem } from '../../services/node';
import { DependencyTypeEnum, PackagesEnumKeys } from '../../type/enums';
import { BasePackage } from '../base.package';
import { CONFIG, IGNORE } from './prettier.constant';

/**
 * @see https://www.npmjs.com/package/prettier
 * */
class PrettierPackage extends BasePackage {
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;
  readonly name: string = 'prettier';
  readonly package: PackagesEnumKeys = 'prettier';

  prepare(): void {
    fileSystem.writeFile('.prettierrc', CONFIG);
    fileSystem.writeFile('.prettierignore', IGNORE);
  }
}

export const prettier = new PrettierPackage();
