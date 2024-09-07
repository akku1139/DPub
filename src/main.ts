import { InitOptions } from "./types.ts"
import { Hono } from "hono"
import { jsxRenderer } from "hono/jsx-renderer"

const dpub = (config: InitOptions) => {
  const app = new Hono()

  app.get("/.well-known/nodeinfo", (c) => {
    return c.json({
      links: [
        {
          rel: "http://nodeinfo.diaspora.software/ns/schema/2.1",
          href: `https://${config.instance.hostName}/nodeinfo/2.1`,
        },
        // {
        //   rel: "http://nodeinfo.diaspora.software/ns/schema/2.0",
        //   href: `https://${config.instance.hostName}/nodeinfo/2.0`
        // },
      ],
    })
  })

  app.get("/nodeinfo/2.1", async (c) => {
    return c.json({
      openRegistrations: false,
      protocols: [
        "activitypub",
        ...(config.software.additionalProtocols ?? []),
      ],
      software: {
        name: config.software.name,
        version: config.software.version,
      },
      usage: {
        users: {
          total: 1,
        },
      },
      services: config.software.services,
      metadata: {},
      version: "2.1",
    })
  })

  app.get("/.well-known/host-meta", (c) => {
    return c.text(`<?xml version="1.0"?>
      <XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
        <Link rel="lrdd" type="application/xrd+xml" template="https://example.com/.well-known/webfinger?resource={uri}" />
      </XRD>`, 200, {
        "Content-Type": "application/xrd+xml",
      },
    )
  })
}

export default dpub
