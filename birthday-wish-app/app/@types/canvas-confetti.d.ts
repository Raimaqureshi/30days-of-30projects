declare module 'canvas-confetti' {
    interface ConfettiOptions {
      particleCount?: number;
      angle?: number;
      spread?: number;
      origin?: { x: number; y: number };
      colors?: string[];
      shapes?: string[];
      scalar?: number;
      drift?: number;
      ticks?: number;
      duration?: number;
      delay?: number;
    }
  
    function confetti(options?: ConfettiOptions): void;
  
    export default confetti;
  }
  