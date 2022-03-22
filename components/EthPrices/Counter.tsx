import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface CounterProps {
  from: number;
  to: number;
  currency: string;
  fixed?: number;
  duration?: number;
}

const Counter = ({ from, to, fixed, duration, currency }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration || 2,
      onUpdate(value) {
        if (ref && ref.current) {
          ref.current.textContent = value.toFixed(fixed || 2);
        }
      }
    });
    return () => controls.stop();
  }, [from, to, duration, fixed]);

  return (
    <>
      <span className="inline-block text-white mr-1" ref={ref} />
      <span className="inline-block text-indigo-300 font-semibold mr-2 pr-2 border-r-2 border-slate-600 last:border-0 last:mr-0 last:pr-0">{currency}</span>
    </>
  );
};

export default Counter;
