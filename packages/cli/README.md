# Confiks

Confiks is a library designed to assist in the installation and configuration of frontend projects. Utilize this Command
Line Interface (CLI) to swiftly install essential dependencies.

[![VERSION](https://img.shields.io/npm/v/confiks)][confiksNpm]
[![LICENSE](https://img.shields.io/npm/l/confiks)](LICENSE)
[![REPO](https://img.shields.io/badge/repo-GITHUB-blue)][confiksRepo]

## Usage

![usage example][confiksDemo]

```shell
npx confiks
```

### Why?

Confiks was developed out of the necessity to streamline and optimize the often-tedious process of setting up and configuring various tools within a new project. The main aim is to save time and simplify the initial project setup by automating numerous configuration tasks, enabling developers to focus more on coding and less on configuration complexities.

## Features

#### Supports packages

- [commit-lint][commit-lint]: Enforces commit message conventions.
  - [config-conventional][config-conventional]: Shareable commit-lint config.
- [eslint][eslint]: A pluggable linting utility for JavaScript and JSX.
  - [eslint-plugin-prettier][eslint-plugin-prettier]: Integrates Prettier with ESLint.
  - [eslint-plugin-simple-import-sort][eslint-plugin-simple-import-sort]: Enforces a consistent import order.
  - [eslint-plugin-unicorn][eslint-plugin-unicorn]: Adds various ESLint rules for unicorn projects.
  - [eslint-plugin-unused-imports][eslint-plugin-unused-imports]: Detects and removes unused imports.
- [husky][husky]: Enables Git hooks.
- [lint-stagged][lint-stagged]: Lints only the files that are staged in Git.
- [prettier][prettier]: A code formatter.
- [pretty-quick][pretty-quick]: Runs Prettier on your changed files.

[confiksNpm]: https://www.npmjs.com/package/confiks
[confiksRepo]: https://github.com/Kordrad/Confiks
[confiksDemo]: https://github.com/Kordrad/Confiks/blob/master/readme/demo.gif?raw=true
[commit-lint]: https://commitlint.js.org/
[config-conventional]: https://www.npmjs.com/package/@commitlint/config-conventional
[eslint]: https://eslint.org/
[eslint-plugin-prettier]: https://github.com/prettier/eslint-plugin-prettier
[eslint-plugin-simple-import-sort]: https://github.com/lydell/eslint-plugin-simple-import-sort
[eslint-plugin-unicorn]: https://github.com/sindresorhus/eslint-plugin-unicorn
[eslint-plugin-unused-imports]: https://github.com/sweepline/eslint-plugin-unused-imports
[husky]: https://typicode.github.io/husky/
[lint-stagged]: https://github.com/lint-staged/lint-staged
[prettier]: https://prettier.io/
[pretty-quick]: https://github.com/azz/pretty-quick
