# DPub

Activity Pub Framework for Deno and Hono


## Example

```ts
const { dpubRoute } = dpub({
  software: {
    name: "expub",
    version: "1.0.0",
  },
  instance: {
    hostName: "example.com",
    name: "Example ActivityPub instance"
  },
})

const app = new Hono()

app.route("/", dpubRoute)

Deno.serve({
  port: Number(Deno.env.get("PORT")) ?? 8000,
}, app.fetch)
```
