import { giveMePi } from "../modules/madhava-leibniz.js";

onmessage = (event) => {
  const guess = giveMePi(event.data);
  postMessage(guess);
};

onerror = (errorEvent) => {
  console.debug(`Error in worker: ${errorEvent.message}`);
};
