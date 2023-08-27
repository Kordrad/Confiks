import { childProcess } from '../../services/node';
import { DependencyTypeEnum, PackagesEnumKeys } from '../../type/enums';
import { BasePackage } from '../base.package';

/**
 * @see https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/
 * */
class TsJestPackage extends BasePackage {
  readonly dependencyType: DependencyTypeEnum =
    DependencyTypeEnum.devDependency;
  readonly name: string = 'ts-jest';
  readonly package: PackagesEnumKeys = 'ts-jest';

  /**
   * @see https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file
   * */
  prepare(): void {
    childProcess.execSync('npx ts-jest config:init');
  }
}

export const tsJest = new TsJestPackage();
