declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: ('square' | 'circle' | 'star')[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  function confetti(options?: Options): Promise<null>;

  export default confetti;
}
