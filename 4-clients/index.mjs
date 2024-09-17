import "websocket-polyfill";
import NDK, { NDKEvent, NDKPrivateKeySigner } from "@nostr-dev-kit/ndk";
import { generateSecretKey, getPublicKey } from "nostr-tools/pure";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils"; // already an installed dependency

let sk = generateSecretKey(); // `sk` is a Uint8Array
let pk = getPublicKey(sk); // `pk` is a hex string
console.log("secret", sk);
console.log("public", pk);

let skHex = bytesToHex(sk);
console.log("secret", skHex);
console.log("public", pk);

const ndk = new NDK({
  explicitRelayUrls: ["ws://localhost"],
});
await ndk.connect();

// Will return only the first event
const events = await ndk.fetchEvents({
  kinds: [1],
});
console.log(
  "events",
  await Promise.all([...events].map((e) => e.toNostrEvent()))
);

const signer = new NDKPrivateKeySigner(skHex);

const ev = new NDKEvent(ndk);
ev.content = "12345125123421412";
ev.kind = 1;
await ev.sign(signer);
await ev.publish();
