# Redux scaffolding code generator

## Prepare
- Nodejs
- Yarn

## Init

```bash
$ git clone git@github.com:cuppar/reduxgen.git
$ cd reduxgen
$ chmod +x src/index.js
$ yarn && yarn link
```

## Usage

```bash
$ reduxgen getList
$ reduxgen -a postList
```

ps: -a(--action) means this ajax is a user action, it don't expect the response body, just expect a response code.