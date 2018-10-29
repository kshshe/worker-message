import getEventObject from "./getEventObject";

class WorkerSub {
  constructor(worker) {
    this.worker = worker;
    this.worker.onmessage = this.messageRecievedHandler.bind(this);
    this.defaultType = "_";
    this.subscriptions = new Map();
  }

  messageRecievedHandler(e) {
    const message = e.data;
    const type = this.subscriptions.has(message.type)
      ? message.type
      : this.defaultType;
    if (this.subscriptions.has(type)) {
      this.subscriptions.get(type)(message.data);
    }
  }

  on(type, callback) {
    this.subscriptions.set(type, callback);
  }

  emit(type, data) {
    this.worker.postMessage(getEventObject(type, data));
  }
}

export default WorkerSub;
