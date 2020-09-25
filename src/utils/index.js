export * from './hooks';

export const nextFrame = () => {
  return new Promise(resolve => requestAnimationFrame(resolve));
};
