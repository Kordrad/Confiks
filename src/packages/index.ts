import { PackagesEnum } from '../type/enums';
import { BasePackageInterface } from '../type/interfaces';
import { commitLint } from './commit-lint.package';
import { husky } from './husky.package';
import { jest } from './jest.package';
import { lintStaged } from './lint-staged.package';
import { prettier } from './prettier.package';
import { prettyQuick } from './pretty-quick.package';

function flatPackagesArray(
  array: BasePackageInterface[]
): BasePackageInterface[] {
  const result: BasePackageInterface[] = [];
  for (const item of array) {
    result.push(item);
    if (item.extensions?.length)
      result.push(...flatPackagesArray(item.extensions));
  }
  return result;
}

export * from './commit-lint.package';
export * from './husky.package';
export * from './jest.package';
export * from './lint-staged.package';
export * from './prettier.package';
export * from './pretty-quick.package';

export const BASE: BasePackageInterface[] = [
  husky,
  prettier,
  commitLint,
  prettyQuick,
  lintStaged,
  jest,
];
export const HAS_EXTENSIONS: BasePackageInterface[] = BASE.filter(
  ({ extensions }) => extensions?.length
);
export const HAS_PREPARATION: BasePackageInterface[] = flatPackagesArray(
  BASE
).filter(package_ => typeof package_.prepare == 'function');

export const PACKAGES = new Map<PackagesEnum, BasePackageInterface>(
  flatPackagesArray(BASE).map(package_ => [package_.value, package_])
);
