#!/usr/bin/env node

// import { createWorkspace } from 'create-nx-workspace';

async function main() {
  const name = process.argv[2]; // TODO: use libraries like yargs or enquirer to set your workspace name
  if (!name) {
    throw new Error('Please provide a name for the workspace');
  }

  console.log(`Creating the workspace: ${name}`);

  // This assumes "confiks-workspace" and "confiks" are at the same version

  // const presetVersion = import('../package.json').version;

  // TODO: do not create workspace
  // TODO: update below to customize the workspace
  /*  const { directory } = await createWorkspace(
    `confiks-workspace@${presetVersion}`,
    {
      name,
      nxCloud: 'skip',
      packageManager: 'npm',
    }
  );*/

  // console.log(`Successfully created the workspace: ${directory}.`);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main().then();
