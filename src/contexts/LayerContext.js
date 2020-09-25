import React, { createContext, useContext, useMemo } from 'react';

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

export const useWillFocusListener = (listener) => {
  const { listeners } = useContext(LayerContext);

  useMemo(() => {
    listeners.willFocus.push(listener);
  }, []);
};

export const useDidFocusListener = (listener) => {
  const { listeners } = useContext(LayerContext);

  useMemo(() => {
    listeners.didFocus.push(listener);
  }, []);
};

export const useWillBlurListener = (listener) => {
  const { listeners } = useContext(LayerContext);

  useMemo(() => {
    listeners.willBlur.push(listener);
  }, []);
};

export const useDidBlurListener = (listener) => {
  const { listeners } = useContext(LayerContext);

  useMemo(() => {
    listeners.didBlur.push(listener);
  }, []);
};
