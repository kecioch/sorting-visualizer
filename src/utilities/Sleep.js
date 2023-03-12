const sleep = (ms, signal) => {
  const promise = new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("SIGNAL ABORT"));
    });
  });
  return promise;
};

export default sleep;
