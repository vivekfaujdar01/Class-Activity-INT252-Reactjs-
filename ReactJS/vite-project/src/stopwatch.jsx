import React, { useState, useEffect } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      // run every 1000 milliseconds
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup when unmounting or when isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time (mm:ss:ms)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    // const milliseconds = Math.floor((time % 1000) / 100);
    return (
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
      //   milliseconds
    );
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>⏱ Stopwatch</h1>
      <h2>{formatTime(time)}</h2>

      <div style={{ marginTop: "20px" }}>
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            style={{
              margin: "5px",
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              borderRadius: "8px",
              border: "none",
            }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            style={{
              margin: "5px",
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "8px",
              border: "none",
            }}
          >
            Stop
          </button>
        )}

        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
          }}
          style={{
            margin: "5px",
            padding: "10px 20px",
            backgroundColor: "orange",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
