import { commitLint, husky, lintStaged } from '../packages';
import { PackagesEnum } from '../type/enums';
import { BasePackageInterface } from '../type/interfaces';

function flatPackagesArray(array: BasePackageInterface[]) {
  const result: BasePackageInterface[] = [];
  for (const item of array) {
    result.push(item);
    if (item.extensions?.length)
      result.push(...flatPackagesArray(item.extensions));
  }
  return result;
}

export const BASE: BasePackageInterface[] = [husky, commitLint, lintStaged];
export const HAS_EXTENSIONS: BasePackageInterface[] = BASE.filter(
  ({ extensions }) => extensions?.length
);
export const HAS_PREPARATION: BasePackageInterface[] = BASE.filter(
  package_ => typeof package_.prepare == 'function'
);

export const PACKAGES = new Map<PackagesEnum, BasePackageInterface>(
  flatPackagesArray(BASE).map(package_ => [package_.value, package_])
);
