importScripts("../lib/worker.worker-message.min.js");

self.on("some_event_to_worker", data => {
  self.emit("some_event", data);
});
