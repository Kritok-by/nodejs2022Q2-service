# Home Library Service

> Let's try to create a Home Library Service! `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!
---

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Go to project root directory

```
cd nodejs2022Q2-service
```

## Change name file

```
.env.copy -> .env
```

## Running application

```
npm run docker:build
```
## Scan images

```
npm run docker:scan

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

---

## Used technologies:
- TypeScript
- nestjs
- swagger
- class-validator
- uuid
- dotenv
- jest
- eslint
- prettier
- node.js version: 16 LTS