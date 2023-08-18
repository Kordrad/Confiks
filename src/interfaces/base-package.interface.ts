import { PackagesEnum, PackagesEnumKeys } from '../enums';

export interface BasePackageInterface {
  readonly package: PackagesEnumKeys;
  readonly value: PackagesEnum;
  readonly name: string;
  disabled: boolean | string;
  install: () => void;
  afterInstall?: () => void;
  readonly extensions?: BasePackageInterface[];
}
