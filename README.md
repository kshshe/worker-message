# WorkerMessage

Tool for posting/getting messages to/from webworkers with types.

[![NPM](https://nodei.co/npm/worker-message.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/worker-message/)

# Installing

```shell
npm i worker-message
```

or

```html
<script src="/.../.../client.worker-message.min.js"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/worker-message/lib/client.worker-message.min.js"></script>
```

# Usage

Main side:

```js
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
```

Worker side:

```js
importScripts(
  "node_modules/worker-message/lib/worker.worker-message.min.js"
);
// or 
importScripts(
  "https://cdn.jsdelivr.net/npm/worker-message/lib/worker.worker-message.min.js"
);

self.on("some_event_to_worker", data => {
  console.log(data);

  self.emit("some_event", data);
});
```
