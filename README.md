# [Confiks][confiks]

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

### Manual start for other projects

Execute the following command:

```bash
# Provide a right path
node ..\Confiks\dist\packages\cli\src
```

#### Via NPM 

1. Open the path of the Confiks project

```bash
cd .\dist\packages\cli\
```

2. Install globally

```bash
npm i -g .
```

3. Run in the test project

```bash
confiks
# or
npx confiks
```

## Commit Message Format

In the project, we use commit-lint with [Conventional Commits][conventionalCommit] based
on [Angular convention][angularConvention]

[confiks]: https://github.com/Kordrad/Confiks/tree/master/packages/cli
[conventionalCommit]: https://www.conventionalcommits.org/
[angularConvention]: https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit
