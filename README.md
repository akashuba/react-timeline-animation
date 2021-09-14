# react-scroll-animation component.

### Could be used for timeline filling or any animations related to scrolling and crossing the middle of the screen.

## Example with create-react-app.

Important to add a unique id to the observed element. Component using react "render prop" pattern.

```javascript
import React, { useEffect, useRef, useState } from "react";
import TimelineObserver from "react-timeline-animation";
import "./styles.css";

export default function App() {
  const [message, setMessage] = useState("");

  const onCallback = () => {
    setMessage("awesome");
  };

  return (
    <div className="App">
      <h1>react-scroll-animation component</h1>
      <div className="stub1"> scroll to start </div>
      <TimelineObserver
        initialColor="#e5e5e5"
        fillColor="#53b374"
        handleObserve={(setObserver) => (
          <Timeline
            callback={onCallback}
            className="timeline"
            setObserver={setObserver}
          />
        )}
      />
      <div className="stub2">{message}</div>
    </div>
  );
}

const Timeline = ({ setObserver, callback }) => {
  const timeline = useRef(null);

  const someCallback = () => {
    callback();
  };

  useEffect(() => {
    if (timeline.current) {
      setObserver(timeline.current, someCallback);
    }
  }, []);

  return <div id="timeline100500" ref={timeline} className="timeline" />;
};
```

### Codesandbox example [here](https://codesandbox.io/s/brave-kepler-fdbzv?file=/src/App.js:0-1097)

## Options

#### `initialColor`: not required. Initial color of observable element.

#### `fillColor`: not required. Color to fill element.

#### `handleObserve`: not required. "render prop" to handle observable element.

```typescript
interface TimelineObserverProps {
  handleObserve?: (
    observer: (target: Element, callbackFn?: () => void) => void
  ) => JSX.Element;
  initialColor?: string;
  fillColor?: string;
}
```
