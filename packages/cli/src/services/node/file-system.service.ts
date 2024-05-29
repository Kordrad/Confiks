import * as fs from 'node:fs';
import { Dirent } from 'node:fs';

export class FileSystemService {
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
    fs.writeFileSync(fileName, content);
  }

  appendFileSync(fileName: string, content: string): void {
    fs.appendFileSync(fileName, content);
  }

  queryFileName(fileName: string): string | undefined {
    const filesList = fs.readdirSync('./');
    return filesList.find(fileList => fileList.includes(fileName));
  }

  hasDirectory(directory: string, source = './'): boolean {
    return this.readdirSync(source).some(
      dirent => dirent.isDirectory() && dirent.name === directory
    );
  }

  readdirSync(source: string): Dirent[] {
    return fs.readdirSync(source, { withFileTypes: true });
  }
}

export const fileSystem = new FileSystemService();
