// my-worker.js
self.addEventListener('message', (e) => {
    const { data } = e;
    if (data.type === 'compute') {
      const result = performHeavyComputation(data.value);
      self.postMessage({ type: 'result', value: result });
    }
  });
  
  function performHeavyComputation(value) {
    // 这里是你的计算逻辑，例如：
    let sum = 0;
    for (let i = 0; i < 100000000; i++) {
      sum += i * value;
    }
    return sum;
  }