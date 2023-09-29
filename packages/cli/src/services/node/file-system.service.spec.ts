import * as fs from 'node:fs';

import { fileSystem } from './file-system.service';

describe('FileSystemService', () => {
  const fixture = fileSystem;

  test('instance is created', () => {
    expect(fixture).toBeDefined();
  });

  test('queryFileName should return matched value or undefined', () => {
    jest
      .spyOn(fs, 'readdirSync')
      .mockReturnValue(['abc', 'eslintrc', 'eslintrc.json', 'test'] as never[]);

    for (const [argument, expected] of [
      ['es', 'eslintrc'],
      ['lintrc.', 'eslintrc.json'],
      ['lintrc', 'eslintrc'],
      ['eslintrc.json', 'eslintrc.json'],
      ['wrongFileName', undefined],
    ]) {
      expect(fixture.queryFileName(argument)).toEqual(expected);
    }
  });
});
