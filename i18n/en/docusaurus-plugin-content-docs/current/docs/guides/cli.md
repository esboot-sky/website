---
sidebar_position: 1
---

# CLI

To see the available commands, run:

```sh
esboot help
```

You will see output similar to:

```sh
Usage: esboot [options] [command]

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  dev                       Start to develop project
  build                     Build project
  prepare                   Prepare esboot project
  lint                      Lint project files using ESLint and Stylelint
  preview                   Preview the distribution content
  mock:bridge [options]     Start bridge mock
  exec_git_hooks [options]  Execute git hooks
  help [command]            display help for command
```

To inspect a specific command, run for example:

```sh
esboot help preview
```

## dev

Starts the local development server.

```sh
esboot dev
```

## build

Builds the project for production.

```sh
esboot build
```

By default, build output is written to `dist` unless configured otherwise.

## preview

Runs a static web server locally to preview built output.

```sh
esboot preview
```

### Options

| Option | Description | Default |
| --- | --- | --- |
| `-p, --port <port>` | Server port | `8900` |
| `-d, --directory <dir>` | Directory to preview | `dist` |
| `-h, --help` | Show help | - |

## lint

Runs ESLint and Stylelint checks.

```sh
esboot lint
```

Before running `lint`, make sure `esboot prepare` has already generated the required config files.

## prepare

Initializes the project by generating config files for ESLint, Stylelint, Prettier, Commitlint, TypeScript, and Husky hooks.

```sh
esboot prepare
```

## docs

Generate and serve project documentation based on the `docs` directory.

### docs dev

```sh
esboot docs dev
```

### docs build

```sh
esboot docs build
```

### docs preview

```sh
esboot docs preview
```

You can override the port with `--port`.

## Mock Series

### mock:bridge

Starts the mock service used with [bridge-mock](http://asset.web.dz/ld/bridge-mock/#/).

```sh
esboot mock:bridge
```
