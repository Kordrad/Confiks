# [Confiks](packages/cli)

A repository for the "confiks" package, allowing you to run the Command Line Interface (CLI) for easy and quick
configuration of frontend projects with the required dependencies.

For detailed information about the CLI, please refer to the documentation [here][confiks].

What will you find here?

The following section contains technical documentation only.

## How to Run Locally

1. Clone the project

```bash
git clone https://github.com/Kordrad/Confiks
cd .\Confiks
npm i
```

2. Create build

```bash
npm run cli:build
```

or watch build

```bash
npm run cli:build:watch
```

### Run demo

> Remember! Build is required!

```bash
npm run cli:start
```

### Link Package

1. Open the path of the Confiks project
2. Link project via command `npm run link`
3. In another project, add an existing link to the project using: `npm link confiks`
4. Now you are able to run. Available commands you can find [here](/packages/cli#usage)

## Commit Message Format

In the project, we use commit-lint with [Conventional Commits][conventionalCommit] based
on [Angular convention][angularConvention]

[conventionalCommit]: https://www.conventionalcommits.org/
[angularConvention]: https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit
