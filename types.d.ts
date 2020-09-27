import * as React from 'react';

export type Layer = unknown;
export type LayerTransitionConfig = { keyframes: Keyframe[], timing: KeyframeAnimationOptions, mask?: CSSStyleDeclaration };
export type EventListenerHook = (listener: () => any, deps?: readonly any[]) => void;

export type Stack = React.FunctionComponent<{
    layersState?: [Layer[], React.SetStateAction<Layer[]>];
    style?: React.CSSProperties,
    className?: string,
    children?: React.ReactChildren | ((stack: React.ReactChildren) => React.ReactChildren);
}>;

export type createLayer = (children: React.ReactChildren) => Layer;

export type usePushLayer = () => (children: React.ReactChildren, config: LayerTransitionConfig) => void;
export type usePopLayer = () => (config?: LayerTransitionConfig) => void;

export type useWillFocusListener = EventListenerHook;
export type useDidFocusListener = EventListenerHook;
export type useWillBlurListener = EventListenerHook;
export type useDidBlurListener = EventListenerHook;

export default Stack;
