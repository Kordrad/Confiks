import type { FileSystemService as FileSystemServiceRoot } from '../file-system.service';

class FileSystemService implements FileSystemServiceRoot {
  appendFileSync = jest.fn();
  queryFileName = jest.fn();
  readFileSync = jest.fn();
  writeFile = jest.fn();
}

export const fileSystem = new FileSystemService();
