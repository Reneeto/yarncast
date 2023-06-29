import React, { useEffect } from "react";
import { render } from "react-dom";
import PQueue from "p-queue";

function App() {
  const queue = new PQueue({ concurrency: 1 });

  useEffect(() => {
    const myPromises = [
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            resolve();
            console.log("First(slow)");
          }, 5000)
        ),
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            resolve();
            console.log("Second(fast)");
          }, 100)
        ),
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            resolve();
            console.log("Third(slower)");
          }, 10000)
        )
    ];

    queue.addAll(myPromises);
  }, [queue]);

  return (
    <div>
      <h1>Promise queue with concurrency control</h1>
    </div>
  );
}

render(<App />, document.getElementById("root"));
//https://stackoverflow.com/questions/59559168/react-js-how-to-call-axios-sequentially/59560061#59560061
