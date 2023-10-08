import { childProcess } from '../services/node/child-process.service.js';

const commands = {
  modifiedFiles: 'git ls-files -m',
  othersExcludedFiles: 'git ls-files -o --exclude-standard',
};

/**
 * Show files with an unstaged modification (note that an unstaged deletion also counts as an unstaged modification)
 * @see https://git-scm.com/docs/git-ls-files#Documentation/git-ls-files.txt--m
 */

export const getModifiedFiles = () =>
  childProcess.execSync(commands.modifiedFiles).trim();

/**
 * Show other (i.e. untracked) files in the output excluded by .gitignore
 * @see https://git-scm.com/docs/git-ls-files#Documentation/git-ls-files.txt--o
 * @see https://git-scm.com/docs/git-ls-files#Documentation/git-ls-files.txt---exclude-standard
 */
export const getUntrackedFiles = () =>
  childProcess.execSync(commands.othersExcludedFiles).trim();
