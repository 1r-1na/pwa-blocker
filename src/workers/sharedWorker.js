import { giveMePi } from "../modules/madhava-leibniz.js";

const ports = new Set();

function boradcastMessage(message) {
  for (const port of ports) {
    try {
      port.postMessage(message);
    } catch (err) {
      ports.delete(port);
    }
  }
}

function handleMessage(event) {
  boradcastMessage({ finished: false });
  const guess = giveMePi(event.data);
  boradcastMessage({ finished: true, data: guess });
}

function handeError(errorEvent) {
  console.debug(`Error in worker: ${errorEvent.message}`);
}

onconnect = (connectEvent) => {
  const port = connectEvent.ports[0];
  port.onmessage = handleMessage;
  port.onerror = handeError;
  ports.add(port);
};
