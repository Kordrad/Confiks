import { PACKAGES } from '../constants';
import { fileSystem } from '../services/node';
import { PackagesEnum } from '../type/enums';
import { BasePackageInterface } from '../type/interfaces';

export function packageIsInstalled(packageName: string): boolean {
  const packageJson = JSON.parse(fileSystem.readFileSync('./package.json'));
  return !!packageJson.devDependencies?.[packageName];
}

export function getPackageByKey(
  key: PackagesEnum
): BasePackageInterface | undefined {
  if (!PACKAGES.has(key)) {
    return undefined;
  }

  return <BasePackageInterface>PACKAGES.get(key);
}
