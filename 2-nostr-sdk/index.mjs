import "websocket-polyfill";
import NDK from "@nostr-dev-kit/ndk";

const ndk = new NDK({
  explicitRelayUrls: ["wss://relay.damus.io"],
});
await ndk.connect();

// Will return only the first event
const events = await ndk.fetchEvents({
  kinds: [1],
  limit: 1,
  "#t": ["siamstr"],
});
console.log(
  "events",
  await Promise.all([...events].map((e) => e.toNostrEvent()))
);
