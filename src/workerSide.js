import getEventObject from "./getEventObject";

const subscriptions = new Map();

function init(globalObject) {
  const defaultType = "_";

  globalObject.on = (event, callback) => {
    subscriptions.set(event, callback);
  };

  globalObject.emit = (event, data) => {
    globalObject.postMessage(getEventObject(event, data));
  };

  globalObject.onmessage = e => {
    const type = subscriptions.has(e.data.type) ? e.data.type : defaultType;
    if (subscriptions.has(type)) {
      subscriptions.get(type)(e.data.data);
    } else {
      console.warn("Unhandled event", type, e.data.data);
    }
  };
}

if (self) {
  init(self);
}

export default { init, subscriptions };
