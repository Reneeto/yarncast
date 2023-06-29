import React, { useEffect } from "react";
import { render } from "react-dom";
import PQueue from "p-queue";

function App() {
  const queue = new PQueue({ concurrency: 1 });

  useEffect(() => {
    const myPromises = [
      () =>
        new Promise(resolve =>
          console.log('first function')
        ),
      () =>
        new Promise(resolve =>
          console.log('second function')
        ),
      () =>
        new Promise(resolve =>
          console.log('third function')
        )
    ];

    queue.addAll(myPromises);
  }, [queue]);

  function returnCalls () {
    () =>
        new Promise(resolve =>
          console.log('first function')
        ),
      () =>
        new Promise(resolve =>
          console.log('second function')
        ),
      () =>
        new Promise(resolve =>
          console.log('third function')
        )
  }

  return (
    <div>
      <h1>Promise queue with concurrency control</h1>
      <button onClick={returnCalls}></button>
    </div>
  );
}

render(<App />, document.getElementById("root"));
//https://stackoverflow.com/questions/59559168/react-js-how-to-call-axios-sequentially/59560061#59560061
