const worker = new Worker("worker.js");
const WSub = new WorkerSub(worker);

WSub.on("some_event", data => {
  console.log("Worker sent a message");
  console.log(data);
});

console.log("Sending a message to the worker");
WSub.emit("some_event_to_worker", { some_key: "some_value" });
