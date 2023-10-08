# [Confiks](https://github.com/Kordrad/Confiks/tree/master/packages/cli)

## Run Locally

Clone the project

```shell
git clone https://github.com/Kordrad/Confiks
cd .\Confiks
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
node ..\Confiks\dist\packages\cli\src
```

#### Via NPM

Open path of Confiks project

and install globally

```shell
npm i -g .
```

run in test-project

```shell
confiks
# or
npx confiks
```
