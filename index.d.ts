import * as React from 'react';

export type Layer = unknown;
export type LayerTransitionConfig = { keyframes: Keyframe[], timing: KeyframeAnimationOptions, mask?: CSSStyleDeclaration };
export type EventListenerHook = (listener: () => any, deps?: readonly any[]) => void;

export const Stack: React.FunctionComponent<{
	    layersState?: [Layer[], React.Dispatch<React.SetStateAction<Layer[]>>];
	        style?: React.CSSProperties,
		    className?: string,
		        children?: React.ReactChild | ((stack: React.ReactChild) => React.ReactChild);
}>;

export const createLayer: (children: React.ReactChild, config?: LayerTransitionConfig) => Layer;

export const usePushLayer: () => (children: React.ReactChild, config: LayerTransitionConfig) => void;
export const usePopLayer: () => (config?: LayerTransitionConfig) => void;

export const useWillFocusListener:  EventListenerHook;
export const useDidFocusListener: EventListenerHook;
export const useWillBlurListener: EventListenerHook;
export const useDidBlurListener: EventListenerHook;

export default Stack;
