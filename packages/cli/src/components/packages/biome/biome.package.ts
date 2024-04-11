import { childProcess } from '../../../services/node/child-process.service.js';
import { huskyService } from '../../../services/packages/husky/husky.service.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import type { VersionRange } from '../../../type/types/package-version.type.js';
import type { Package } from '../../../type/types/packages.type.js';
import { BasePackage } from '../base.package.js';
import { CLI_CHECK, CLI_FORMAT, CLI_LINT } from './biome.constants.js';

export class BiomePackage extends BasePackage {
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description: string =
    'is a performant toolchain for web projects, it aims to provide developer tools to maintain the health of said projects.';
  readonly package: Package = '@biomejs/biome';
  readonly title = 'Biome';
  readonly version: VersionRange = 'latest';

  configure() {
    childProcess.execSync('npx @biomejs/biome init');
    this.#prepareHusky();
  }

  #prepareHusky(): void {
    huskyService.addHook('pre-commit', CLI_FORMAT);
    huskyService.addHook('pre-commit', CLI_LINT);
    huskyService.addHook('pre-commit', CLI_CHECK);
  }
}
