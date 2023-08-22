import { PackagesEnum } from '../enums';
import { BasePackageInterface } from '../interfaces';
import { commitLint, husky } from '../packages';

function flatPackagesArray(array: BasePackageInterface[]) {
  const result: BasePackageInterface[] = [];
  for (const item of array) {
    result.push(item);
    if (item.extensions?.length)
      result.push(...flatPackagesArray(item.extensions));
  }
  return result;
}

export const BASE: BasePackageInterface[] = [husky, commitLint];
export const HAS_EXTENSIONS: BasePackageInterface[] = BASE.filter(
  ({ extensions }) => extensions?.length
);

export const PACKAGES = new Map<PackagesEnum, BasePackageInterface>(
  flatPackagesArray(BASE).map(package_ => [package_.value, package_])
);
