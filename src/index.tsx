import React, { useEffect, useRef } from "react";

interface TimelineObserverProps {
  handleObserve?: (
    observer: (target: Element, callbackFn?: () => void) => void
  ) => JSX.Element;

  initialColor?: string;
  fillColor?: string;
  hasReverse?: boolean;
}

let halfScreenHeight;
if (typeof window !== "undefined") {
  halfScreenHeight = window?.innerHeight / 2;
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

interface ObservablesProps {
  observable: IntersectionObserverEntry;
  isPassed: boolean;
  callbackFn?: () => void;
}

function setObservable({ obs, observableList, callbacks }) {
  const obsId = obs?.target?.id;

  if (!observableList.has(obsId)) {
    observableList.set(obsId, {
      observable: obs,
      isPassed: false,
      callbackFn: callbacks[obsId] || null,
    });
  }
}

function removeObservable({ obs, observableList }) {
  const obsName = obs?.target?.id;

  if (observableList.has(obsName)) {
    observableList.set(obsName, {
      ...observableList.get(obsName),
      isPassed: true,
    });
  }
}

function colorize({ observableList, initialColor, fillColor, hasReverse }) {
  observableList.forEach((observable) => {
    if (!observable.isPassed) {
      const rect = observable.observable.target.getBoundingClientRect();
      const entry = observable?.observable;

      if (rect.bottom > halfScreenHeight && rect.top < halfScreenHeight) {
        if (initialColor && fillColor) {
          const depthPx = rect.bottom - halfScreenHeight;
          const depthPercent = (depthPx * 100) / rect.height;
          entry.target.style.background = `linear-gradient(to top, ${initialColor} ${depthPercent}%, ${fillColor} ${depthPercent}% 100%)`;
          entry.target.style.transform = "translateZ(0)";
        }
      }

      if (rect.bottom < halfScreenHeight) {
        if (initialColor && fillColor) {
          entry.target.style.background = fillColor;
          entry.target.style.transform = "unset";
        }

        if (observable?.callbackFn) {
          observable?.callbackFn();
        }

        if (!hasReverse) {
          removeObservable({
            obs: entry,
            observableList,
          });
        }
      }

      if (rect.top > halfScreenHeight && hasReverse) {
        entry.target.style.background = initialColor;
      }
    }
  });
}

const TimelineObserver = ({
  handleObserve,
  initialColor,
  fillColor,
  hasReverse,
}: TimelineObserverProps) => {
  const observablesStore = useRef(new Map<string, ObservablesProps>());
  const callbacks = useRef<{ [key: string]: () => void }>({});

  const callback = (entries) => {
    entries?.forEach((entry) => {
      if (entry.isIntersecting) {
        setObservable({
          obs: entry,
          observableList: observablesStore.current,
          callbacks: callbacks.current,
        });
      }
    });
  };
  const observer = useRef(new IntersectionObserver(callback, options));

  const animation = () => {
    window.requestAnimationFrame(() => {
      colorize({
        observableList: observablesStore.current,
        initialColor,
        fillColor,
        hasReverse,
      });
    });
  };

  useEffect(() => {
    document.addEventListener("scroll", animation);
    return () => {
      document.removeEventListener("scroll", animation);
    };
  }, []);

  const setObserver = (elem: HTMLElement, callbackFn?: () => void) => {
    const elemId = elem?.id;

    if (initialColor) {
      elem.style.background = initialColor;
    }

    observer.current.observe(elem);

    if (elemId && callbackFn) {
      callbacks.current[elemId] = callbackFn;
    }
  };

  return <div>{handleObserve ? handleObserve(setObserver) : null}</div>;
};

export default TimelineObserver;
