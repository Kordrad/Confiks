# Confik

## Run Locally

Clone the project

```shell
git clone https://github.com/Kordrad/Confik
cd .\Confik
npm i
```

Create watch build

```shell
npm run cli:watch
```

Create new empty project

```shell
cd ..
mkdir test-project
npm init
git init
```

#### Manual start

```shell
node ..\Confik\dist\packages\cli\src
```

#### Via NPM

Open path of Confik project

and install globally

```shell
npm i -g .
```

run in test-project

```shell
confik
# or
npx confik
```
