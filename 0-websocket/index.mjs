import { WebSocket } from "ws";
const relayUrl = "wss://relay.damus.io";
const connection = new WebSocket(relayUrl);

connection.onopen = () => {
  connection.send(JSON.stringify(["REQ", "1234", { kinds: [1], limit: 1 }]));
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
  console.log(e.data);
};
