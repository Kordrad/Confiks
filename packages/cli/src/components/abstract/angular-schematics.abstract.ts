import type { AngularSchematicInterface } from '../../type/interfaces/package.interface.js';
import type { Package } from '../../type/types/packages.type.js';

export abstract class AngularSchematicsAbstract
  implements AngularSchematicInterface
{
  abstract readonly title: string;
  abstract readonly package: Package;
}
