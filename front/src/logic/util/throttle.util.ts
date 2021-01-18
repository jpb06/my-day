interface Queue {
  thisContext: any;
  args: IArguments;
  resolve: (value?: unknown) => void;
}

export function throttle(
  fn: Function,
  limit: number,
  interval: number,
  size = Math.pow(2, 32) - 1
) {
  const queue: Array<Queue> = [];
  let count = 0;

  function timeout() {
    count--;
    if (queue.length) shift();
  }

  function shift() {
    count++;
    const data = queue.shift();
    if (data) {
      data.resolve(fn.apply(data.thisContext, data.args));
      setTimeout(timeout, interval);
    }
  }

  return function limiter() {
    const args = arguments;

    return new Promise(function (this: any, resolve, reject) {
      if (queue.length === size) return reject(new Error("Queue is full"));

      queue.push({ thisContext: this, args, resolve });
      if (count < limit) shift();
    });
  };
}
