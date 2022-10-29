# React scroll animation component.

#### Could be used for timeline filling or any animations related to scrolling and crossing the middle of the screen. Just wrap the animated component with TimelineObserver.  

<div align="center">
<img src="https://github.com/akashuba/react-timeline-animation/blob/main/demo/scroll_3.gif" alt="drawing" width="500"/>
</div>

## Demo [codesandbox](https://codesandbox.io/s/brave-kepler-fdbzv?file=/src/App.js:0-1097) 🚀

## How to use it

### 1. Installation

```bash
npm install --save react-timeline-animation
```

or

```bash
yarn add react-timeline-animation
```
### 2. Quick start
Important to add a unique id to the observed element (id="timeline100500").
``` javascript
<div id="timeline100500" ref={timeline} className="timeline" />;
```

Component using react "render prop" pattern.

```javascript
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
/>;
```

```javascript
const Timeline = ({ setObserver, callback }) => {
  const timeline = useRef(null);

  // It Will be fired when the element crossed the middle of the screen. 
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

## Options (props) 🛠

#### `initialColor`: not required. Initial color of observable element.

#### `fillColor`: not required. Color to fill element.

#### `handleObserve`: required. "render prop" to handle observable element.
#### `hasReverse`: not required. Allow to scroll in both directions.

```typescript
interface TimelineObserverProps {
  handleObserve?: (
    observer: (target: Element, callbackFn?: () => void) => void
  ) => JSX.Element;
  initialColor?: string;
  fillColor?: string;
  hasReverse?: boolean;
}
```
