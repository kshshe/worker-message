const WorkerSub = require("../src/WorkerSub").default;
const getEventObject = require("../src/getEventObject").default;

console.warn = jest.fn();

const workerLikeObject = {
  onmessage: null,
  postMessage: jest.fn()
};

const messageData = [1, 2, 3];

const events = {
  event_1: jest.fn(),
  event_2: jest.fn()
};

let WSub = null;

test("Subscribes to worker messages", () => {
  WSub = new WorkerSub(workerLikeObject);
  expect(workerLikeObject.onmessage).not.toEqual(null);
});

test("Can subscribe to some event types", () => {
  Object.keys(events).map(event => {
    WSub.on(event, events[event]);
  });
  expect(WSub.subscriptions.size).toEqual(Object.keys(events).length);
});

test("Sends message to worker when call emit", () => {
  Object.keys(events).map(event => {
    WSub.emit(event, messageData);
    expect(workerLikeObject.postMessage).toBeCalledWith(
      getEventObject(event, messageData)
    );
  });
});

test("Calling callbacks when worker sends an event", () => {
  Object.keys(events).map(event => {
    workerLikeObject.onmessage({
      data: getEventObject(event, messageData)
    });
    expect(events[event]).toBeCalledWith(messageData);
  });
});

test("Outputing warning when gets unhandled event", () => {
  workerLikeObject.onmessage({
    data: getEventObject("WeDontHandleThisType", messageData)
  });
  expect(console.warn).toHaveBeenCalled();
});

test("Calling callback for default name when worker sends an unhandled event", () => {
  const handle = jest.fn();
  WSub.on("_", handle);
  workerLikeObject.onmessage({
    data: getEventObject("WeDontHandleThisType", messageData)
  });
  expect(handle).toBeCalledWith(messageData);
});
