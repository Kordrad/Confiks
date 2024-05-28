# `Confiks` Cli

`Confiks` is a CLI library designed to assist in the installation and configuration of frontend projects. This Command
Line Interface (CLI) aids in swiftly installing essential dependencies.

[![VERSION](https://img.shields.io/npm/v/confiks)][confiksNpm]
[![LICENSE](https://img.shields.io/npm/l/confiks)](LICENSE)
[![REPO](https://img.shields.io/badge/repo-GITHUB-blue)][confiksRepo]

## Usage

![usage example][confiksDemo]

###### npm
```shell
npx confiks@latest -y
```

###### pnpm
```shell
pnpm dlx confiks@latest
```

### Why?

`Confiks` was developed to automate and optimize the process of setting up and configuring various tools for the
projects. The ultimate goal is to save time on initial project setup and allow developers to focus on coding rather than
dealing with configuration complexities.

## Features

### Packages Support

###### Formatters

- [biomejs latest][biomejs]: A toolchain for web projects, aimed to provide functionalities to maintain them. Biome offers formatter and linter, usable via CLI and LSP.
- [prettier v3][prettier]: A code formatter.
  - [prettier-plugin-organize-attributes v1][prettier-plugin-organize-attributes]: Organize your HTML attributes automatically with Prettier

###### Automation

- [husky v9][husky]: Enables Git hooks.
- [lint-stagged v15][lint-stagged]: Lints only the files that are staged in Git.

###### Linters

- [commit-lint v19][commit-lint]: Enforces commit message conventions.
  - [config-conventional v19][config-conventional]: Shareable commit-lint config.
- [eslint v8][eslint]: A pluggable linting utility for JavaScript and JSX.
  - [eslint-plugin-prettier v5][eslint-plugin-prettier]: Integrates Prettier with ESLint.
  - [eslint-plugin-simple-import-sort v12][eslint-plugin-simple-import-sort]: Enforces a consistent import order.
  - [eslint-plugin-unicorn v51][eslint-plugin-unicorn]: Adds various ESLint rules for unicorn projects.
  - [eslint-plugin-unused-imports v3][eslint-plugin-unused-imports]: Detects and removes unused imports.
- [stylelint latest][stylelint]: A mighty CSS linter.
  - [stylelint-config-standard-scss v13][stylelint-config-standard-scss]: The standard shareable SCSS config for Stylelint.

### Package Managers Support

- NPM
- PNPM

[//]: # 'Aliases:'
[confiksNpm]: https://www.npmjs.com/package/confiks
[confiksRepo]: https://github.com/Kordrad/Confiks
[confiksDemo]: https://github.com/Kordrad/Confiks/blob/master/readme/demo.gif?raw=true
[biomejs]: https://biomejs.dev/
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
[prettier-plugin-organize-attributes]: https://github.com/NiklasPor/prettier-plugin-organize-attributes
[stylelint]: https://stylelint.io/
[stylelint-config-standard-scss]: https://www.npmjs.com/package/stylelint-config-standard-scss
