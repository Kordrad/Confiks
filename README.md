# Startly

Library to helps install and configure initial projects. Use this CLI to quickly install important dependencies

![VERSION](https://img.shields.io/npm/v/startly)
![LICENSE](https://img.shields.io/npm/l/startly)

## Usage

```bash
npx startly
```

## Features

#### Supports packages

- commit-lint
- husky
- jest
- lint-stagged
- prettier
- pretty-quick

## Requirements

**System**: Windows

**Package manager**: NPM

## Run Locally

Clone the project

```bash
git clone https://github.com/Kordrad/startly
```

Create new empty project

```bash
cd ..
mkdir test-project
npm init
git init
```

#### Manual start

```bash
npx ts-node ../startly/src/index.ts
```

#### Via NPM

Open path of Startly project and install globally

```bash
cd .\startly\
npm i -g .
```

run in test-project

```bash
startly
```
