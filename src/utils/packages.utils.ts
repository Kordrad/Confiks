import { PACKAGES } from '../packages';
import { PackagesEnum } from '../type/enums';
import { BasePackageInterface } from '../type/interfaces';

export function getPackageByKey(
  key: PackagesEnum
): BasePackageInterface | undefined {
  if (!PACKAGES.has(key)) {
    return undefined;
  }

  return <BasePackageInterface>PACKAGES.get(key);
}
