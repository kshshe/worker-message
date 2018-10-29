import WorkerSub from "worker-message";

const worker = new Worker("worker.js");
const WSub = new WorkerSub(worker);

WSub.on("some_event", data => {
  console.log(data);
});

WSub.on("some_other_event", data => {
  console.log(data);
});

WSub.emit("some_event_to_worker", data);
