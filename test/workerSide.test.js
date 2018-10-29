const getEventObject = require("../src/getEventObject").default;
const { init, subscriptions } = require("../src/workerSide").default;

console.warn = jest.fn();

let selfLikeObject = {
  postMessage: jest.fn(),
  onmessage: null,
  on: undefined,
  emit: undefined
};

const messageData = [1, 2, 3];

const events = {
  event_1: jest.fn(),
  event_2: jest.fn()
};

test("Initializing callbacks and functions", () => {
  init(selfLikeObject);
  expect(selfLikeObject.onmessage).not.toEqual(null);
  expect(selfLikeObject.on).toBeDefined();
  expect(selfLikeObject.emit).toBeDefined();
});

test("Adding subscription when calling 'on'", () => {
  Object.keys(events).map(event => {
    selfLikeObject.on(event, events[event]);
  });
  expect(subscriptions.size).toEqual(Object.keys(events).length);
});

test("Calling callbacks when recieved an event", () => {
  Object.keys(events).map(event => {
    selfLikeObject.onmessage({
      data: getEventObject(event, messageData)
    });
    expect(events[event]).toBeCalledWith(messageData);
  });
});

test("Calling postMessage when calling emit", () => {
  Object.keys(events).map(event => {
    selfLikeObject.emit(event, messageData);
    expect(selfLikeObject.postMessage).toBeCalledWith(
      getEventObject(event, messageData)
    );
  });
});

test("Outputing warning when gets unhandled event", () => {
  selfLikeObject.onmessage({
    data: getEventObject("WeDontHandleThisType", messageData)
  });
  expect(console.warn).toHaveBeenCalled();
});

test("Calling callback for default name when worker sends an unhandled event", () => {
  const handle = jest.fn();
  selfLikeObject.on("_", handle);
  selfLikeObject.onmessage({
    data: getEventObject("WeDontHandleThisType", messageData)
  });
  expect(handle).toBeCalledWith(messageData);
});
