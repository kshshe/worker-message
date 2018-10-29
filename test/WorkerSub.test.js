const WorkerSub = require("../src/WorkerSub").default;
const getEventObject = require("../src/getEventObject").default;

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
  expect(WSub.subscriptions.size).toEqual(2);
});

test("Sends message to worker when call emit", () => {
  Object.keys(events).map(event => {
    WSub.emit(event, messageData);
    expect(workerLikeObject.postMessage).toBeCalledWith(
      getEventObject(event, messageData)
    );
  });
});
