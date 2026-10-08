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

With the server running on port `3000`, we can sent a `POST` request from the terminal using `cURL`:

```shell
curl -i -X POST http://localhost:3000/entries \
  -H "Content-Type: application/json" \
  -d '{
    "id": "123",
    "contentTypeId": "article",
    "data": {
      "title": "My first article",
      "body": "Hello from my CMS.",
      "published": false
    },
    "createdAt": "2026-10-08T08:00:00.000Z",
    "updatedAt": "2026-10-08T08:00:00.000Z"
  }'
```

If request is successful, the `HTTP status` and `headers` response should show something like:

```shell
HTTP/1.1 201 Created
content-type: application/json; charset=utf-8
content-length: 198
Date: Thu, 08 Oct 2026 08:39:06 GMT
Connection: keep-alive
Keep-Alive: timeout=72
```