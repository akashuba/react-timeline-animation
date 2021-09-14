# react-scroll-animation component.  

### Could be used for timeline filling or any animations related to scrolling and crossing the middle of the screen.

## Example with create-react-app.

Important to add a unique id to the observed element. Component using react "render prop" pattern.

```javascript
import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

import TimelineObserver from "@aj/react-timeline-animation";

const Timeline = ({ setObserver }) => {
  const timeline = useRef(null);

  const someCallback = () => {
    console.log('someCallback');
  }

  useEffect(() => {
    if (timeline.current) {
      setObserver(timeline.current, someCallback);
    }
  }, []);

  return <div id="timeline100500" ref={timeline} className="timeline" />;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TimelineObserver
        initialColor="#e5e5e5"
        fillColor="#53b374"
        handleObserve={(setObserver) => (
          <Timeline className="timeline" setObserver={setObserver} />
        )}
      />
      <div className="stub" />
    </div>
  )
```