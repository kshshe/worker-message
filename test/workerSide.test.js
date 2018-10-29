const getEventObject = require("../src/getEventObject").default;
const { init, subscriptions } = require("../src/workerSide").default;

let self = {
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
  init(self);
  expect(self.onmessage).not.toEqual(null);
  expect(self.on).toBeDefined();
  expect(self.emit).toBeDefined();
});

test("Adding subscription when calling 'on'", () => {
  Object.keys(events).map(event => {
    self.on(event, events[event]);
  });
  expect(subscriptions.size).toEqual(2);
});

test("Calling callbacks when recieved an event", () => {
  Object.keys(events).map(event => {
    self.onmessage({
      data: getEventObject(event, messageData)
    });
    expect(events[event]).toBeCalledWith(messageData);
  });
});

test("Calling postMessage when calling emit", () => {
  Object.keys(events).map(event => {
    self.emit(event, messageData);
    expect(self.postMessage).toBeCalledWith(getEventObject(event, messageData));
  });
});
