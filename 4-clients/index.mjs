import "websocket-polyfill";
import NDK, { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { generateSecretKey, getPublicKey } from "nostr-tools/pure";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils"; // already an installed dependency

// 1. Generate key pair
let sk = generateSecretKey();
let pk = getPublicKey(sk);

let skHex = bytesToHex(sk);
console.log("secret", skHex);
console.log("public", pk);

// 2. Initial relays
const ndk = new NDK({
  explicitRelayUrls: ["ws://localhost"],
});
await ndk.connect();


// 3. Fetch events
const events = await ndk.fetchEvents({
  kinds: [1],
});
console.log(
  "events",
  await Promise.all([...events].map((e) => e.toNostrEvent()))
);

// 4. Initial signer
const signer = new NDKPrivateKeySigner(skHex);

// 5. Publish event
const ev = new NDKEvent(ndk);
ev.content = "CONTENT 1234";
ev.kind = 1;
await ev.sign(signer);
await ev.publish();
