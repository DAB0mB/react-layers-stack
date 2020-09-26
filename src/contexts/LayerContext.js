import React, { createContext, useContext, useMemo, useLayoutEffect } from 'react';

const LayerContext = createContext();

export const LayerProvider = ({ listeners, children }) => {
  const context = useMemo(() => ({ listeners }), []);

  return (
    <LayerContext.Provider value={context}>
      <Children context={context}>{children}</Children>
    </LayerContext.Provider>
  );
};

const Children = ({ children, context }) => {
  if (typeof children == 'function') {
    return children(context);
  }

  return children;
};

export const useWillFocusListener = (listener, input) => {
  const { listeners } = useContext(LayerContext);

  useLayoutEffect(() => {
    listeners.willFocus.push(listener);

    return () => {
      const index = listeners.willFocus.indexOf(listener);
      listeners.willFocus.splice(index, 1);
    };
  }, input);
};

export const useDidFocusListener = (listener, input) => {
  const { listeners } = useContext(LayerContext);

  useLayoutEffect(() => {
    listeners.didFocus.push(listener);

    return () => {
      const index = listeners.didFocus.indexOf(listener);
      listeners.didFocus.splice(index, 1);
    };
  }, input);
};

export const useWillBlurListener = (listener, input) => {
  const { listeners } = useContext(LayerContext);

  useLayoutEffect(() => {
    listeners.willBlur.push(listener);

    return () => {
      const index = listeners.willBlur.indexOf(listener);
      listeners.willBlur.splice(index, 1);
    };
  }, input);
};

export const useDidBlurListener = (listener, input) => {
  const { listeners } = useContext(LayerContext);

  useLayoutEffect(() => {
    listeners.didBlur.push(listener);

    return () => {
      const index = listeners.didBlur.indexOf(listener);
      listeners.didBlur.splice(index, 1);
    };
  }, input);
};
