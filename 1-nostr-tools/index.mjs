import "websocket-polyfill";
import { Relay } from "nostr-tools/relay";
const relay = await Relay.connect("wss://relay.damus.io");
console.log(`connected to ${relay.url}`);

// let's query for an event that exists
const sub = relay.subscribe(
  [
    {
      kinds: [1],
      limit: 1,
      "#t": ["siamstr"],
    },
  ],
  {
    onevent(event) {
      console.log("we got the event we wanted:", event);
    },
    oneose() {
      sub.close();
    },
  }
);
