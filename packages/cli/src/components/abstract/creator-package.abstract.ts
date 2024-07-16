import type { CreatorPackageInterface } from '../../type/interfaces/package.interface.js';
import type { Package } from '../../type/types/packages.type.js';

export abstract class CreatorPackageAbstract
  implements CreatorPackageInterface
{
  abstract readonly package: Package;
  abstract readonly title: string;
}
