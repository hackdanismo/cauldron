# Cauldron

## Run Test Content
As this is a `TypeScript` project, the easiest way is with `tsx`:

```shell
$ npm install --save-dev tsx typescript
```

Then run:

```shell
$ npx tsx src/test-content.ts
```

## Small HTTP API
Adding a small HTTP API in front of our CMS code. This turns the CMS core into something a frontend can call. `Fastify` is a web framework for Node.js. It gives you the tools to create an HTTP server and define API routes without writing all the low-level networking code yourself.

```shell
$ npm install fastify
```

Run the server.ts:

```shell
$ npx tsx src/server.ts
```

At that point the project has its first real CMS API, running: `http://localhost:3000/`.

```
{"message":"Route GET:/ not found","error":"Not Found","statusCode":404}
```

This means Fastify is running correctly, but the `/` has no route defined.