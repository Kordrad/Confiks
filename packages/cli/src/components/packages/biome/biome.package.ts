import { PackageManagerService } from '../../../services/package-manager/package-manager.service.js';
import type { DependencyType } from '../../../type/types/dependency-type.type.js';
import type { VersionRange } from '../../../type/types/package-version.type.js';
import type { Package } from '../../../type/types/packages.type.js';
import { BasePackage } from '../base.package.js';

export class BiomePackage extends BasePackage {
  readonly dependencyType: DependencyType = 'devDependency';
  readonly description: string =
    'is a performant toolchain for web projects, it aims to provide developer tools to maintain the health of said projects.';
  readonly package: Package = '@biomejs/biome';
  readonly title = 'Biome';
  readonly version: VersionRange = 'latest';

  /**
   * @see https://biomejs.dev/guides/getting-started/#configuration
   */

  configure() {
    new PackageManagerService().exec('biome init');
  }
}
