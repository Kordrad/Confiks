import { type PackagesEnumKeys } from '../../type/enums/packages.enum.js';
import { childProcess } from '../node/child-process.service.js';

export class NpmService {
  init(packageName: PackagesEnumKeys) {
    childProcess.execSync(`npm init ${packageName}`);
  }
}
