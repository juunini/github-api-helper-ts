<div align="center">

# github-api-helper

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![BunJS](https://img.shields.io/badge/Bun-beige?style=for-the-badge&logo=bun&logoColor=black)
![Parcel](https://img.shields.io/badge/Parcel-deac79?style=for-the-badge&logoColor=black&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMzguMDAwMDAwcHQiIGhlaWdodD0iMzAuMDAwMDAwcHQiIHZpZXdCb3g9IjAgMCAzOC4wMDAwMDAgMzAuMDAwMDAwIgogcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+Cgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwzMC4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiCmZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSI+CjxwYXRoIGQ9Ik0xNzYgMjI1IGMtMyAtOSAtMTIgLTEyIC0yMyAtOSAtMTAgMyAxIC02IDI1IC0yMSBsNDQgLTI3IDI0IDIzIGMyNwoyNSAyMiAzMiAtMzMgNDIgLTIyIDQgLTMzIDIgLTM3IC04eiIvPgo8cGF0aCBkPSJNMTA4IDIwMyBjNyAtMyAxOCAtMTcgMjMgLTMxIDggLTIwIDEyIC0yMyAyMiAtMTMgOSAxMCA3IDE3IC0xMiAzMgotMTMgMTAgLTI4IDE5IC0zNSAxOCAtNiAwIC02IC0zIDIgLTZ6Ii8+CjxwYXRoIGQ9Ik0yODYgMTMxIGMtMyAtNSAwIC0xMSA3IC0xNCA4IC0zIDE0IDEgMTQgOSAwIDE2IC0xMyAxOSAtMjEgNXoiLz4KPHBhdGggZD0iTTE2MCA4NCBjMCAtMTQgNCAtMjMgMTAgLTE5IDYgMyAxMCAyIDEwIC00IDAgLTYgNyAtOCAxNSAtNSA4IDQgMTUKMTUgMTUgMjUgMCAyMSAtMTYgMjYgLTIzIDcgLTMgLTggLTYgLTYgLTYgNSAtMSAyNyAtMjEgMjAgLTIxIC05eiIvPgo8L2c+Cjwvc3ZnPg==)

![Version](https://img.shields.io/npm/v/github-api-helper)
[![codecov](https://codecov.io/gh/juunini/github-api-helper-ts/branch/main/graph/badge.svg?token=ZZE5D2GG05)](https://codecov.io/gh/juunini/github-api-helper-ts)
[![ESLint](https://github.com/juunini/github-api-helper-ts/actions/workflows/eslint.yaml/badge.svg)](https://github.com/juunini/github-api-helper-ts/actions/workflows/eslint.yaml)

</div>

## Install

```bash
# npm
npm install github-api-helper

# yarn
yarn add github-api-helper

# pnpm
pnpm add github-api-helper

# bun
bun add github-api-helper
```

## Usage

### OAuth

```ts
import { OAuth } from 'github-api-helper'

const oauth = OAuth('client_id', 'client_secret')

oauth.access_token('code').then((response) => console.log({
  access_token: response.access_token,
  refresh_token: response.refresh_token,
}))
oauth.refresh_token('refresh_token').then((response) => console.log({
  access_token: response.access_token,
  refresh_token: response.refresh_token,
}))
```
