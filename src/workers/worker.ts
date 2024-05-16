// 后台线程

self.addEventListener('message', (e) => {
  const { type, data } = e.data;
  console.log(`Received message: ${type}`, e.data);
  if (type === 'compute') {
    const result = performHeavyComputation(data);
    self.postMessage({ type: 'result', result });
  }
});

function performHeavyComputation(value) {
  let sum = 0;
  for (let i = 0; i < 10000000; i++) {
    sum += i * value;
  }
  return sum;
}