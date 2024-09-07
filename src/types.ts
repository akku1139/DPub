// https://github.com/akku1139/ActivityLove/blob/main/backend/lib/nodeinfo.py
// https://github.com/misskey-dev/misskey/blob/develop/packages/backend/src/server/NodeinfoServerService.ts
// https://github.com/mastodon/mastodon/blob/main/app/serializers/node_info/serializer.rb

export type InitOptions = {
  software: {
    name: string
    version: string
    repository?: string
    homepage?: string
    additionalProtocols?: Array<string>
    services?: {
      inbound?: Array<string>
      outbound?: Array<string>
    }
  }
  instance: {
    hostName: string
    name: string
    description?: string
  }
}
