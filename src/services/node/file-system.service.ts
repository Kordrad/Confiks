import * as fs from 'node:fs';

class FileSystemService {
  readFileSync(
    directory: fs.PathOrFileDescriptor,
    options?: fs.ReadSyncOptions
  ): string {
    return fs.readFileSync(directory, {
      encoding: 'utf8',
      ...options,
    });
  }

  writeFile(fileName: string, content: string): void {
    fs.writeFile(fileName, content, () => {});
  }
}

export const fileSystem = new FileSystemService();
